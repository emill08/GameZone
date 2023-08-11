const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const { User, Cart, Game } = require('./models/index')
const cors = require('cors')
const { hashPassword, comparePassword, signToken, verifyToken } = require('./helpers/jwt')
const midtransClient = require('midtrans-client');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client("1013683952007-nkg3t009klr6nq97o5bukahjvq9s1g3l.apps.googleusercontent.com");

app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body
        if (!username) {
            throw { name: "Username is required" }
        }
        if (!password) {
            throw { name: "Password is required" }
        }
        const alreadyRegister = await User.findOne({ where: { username } })
        if (alreadyRegister) {
            throw { name: "Username must be unique" }
        }
        const data = await User.create({ username, password })
        res.status(200).json({
            "id": data.id,
            "username": data.username
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
})


app.post('/google-login', async (req, res, next) => {
    try {
      const googleToken = req.headers.google_token;
      
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: "1013683952007-nkg3t009klr6nq97o5bukahjvq9s1g3l.apps.googleusercontent.com"
      });
      const payload = ticket.getPayload();
      
    //   console.log(payload, 'ini payload')
      const username = payload.email;
      const [user, created] = await User.findOrCreate({
        where: { username },
        defaults: { username, password: 'randomizepassword' },
        hooks: false
      });
    //   console.log(user, '<<<new user')
      res.status(created ? 201 : 200).json({ access_token: signToken({ id: user.id }), username: username });
    } catch (err) {
      next(err);
    }
  })


app.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        if (!username) {
            throw { name: "Username is required" }
        }
        if (!password) {
            throw { name: "Password is required" }
        }
        const foundUser = await User.findOne({ where: { username } })
        if (!foundUser) {
            throw { name: "Invalid username/password" }
        }
        const correctPassword = comparePassword(password, foundUser.password)
        if (!correctPassword) {
            throw { name: "Invalid username/password" }
        }
        const payload = {
            id: foundUser.id,
            username: foundUser.username
        }
        const access_token = signToken(payload)
        res.status(200).json({
            access_token
        })
    } catch (err) {
        next(err)
    }
})

app.get('/games', async (req, res, next) => {
    try {
        var config = {
            method: 'get',
          maxBodyLength: Infinity,
            url: 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=50&AAA&sortBy=metacritic',
            headers: { }
          };
          const response = await axios(config)   
          res.status(200).json(response.data)       
    } catch (error) {
        console.log(error)
        next(error)
    }
})



app.use(async (req, res, next) => {
    try {
        const { access_token } = req.headers
        console.log(access_token)
        if (!access_token) {
            throw { name: "Invalid token" }
        }
        const payload = verifyToken(access_token)
        const thisUser = await User.findByPk(+payload.id)
        if (!thisUser) {
            throw { name: "Invalid token" }
        }
        req.user = {
            id: thisUser.id,
            username: thisUser.username
        }
        next()
    } catch (err) {
        next(err)
    }
})

app.get('/sell', async (req, res, next) => {
    try {
        const games = await Game.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })
        res.status(200).json(games)
    } catch (err) {
        next(err)
    }
})

app.post('/cart/:gameId', async (req, res, next) => {
    try {
        const id = req.params.gameId
        // console.log(id)
        const findGame = await Game.findByPk(id)
        if (!findGame) {
            throw { name: 'Game not found' }
        }
        const data = await Cart.create({UserId: req.user.id, GameId: id})
        res.status(201).json({
            "id": data.id,
            "UserId": data.UserId,
            "GameId": data.GameId,
        })
    } catch (err) {
        next(err)
    }
})

app.get('/cart', async (req, res, next) => {
    try {
        const favList = await Cart.findAll({ where: { UserId: req.user.id }, include: [{ model: Game, attributes: { exclude: ['createdAt', 'updatedAt'] } }], attributes: { exclude: ['createdAt', 'updatedAt'] } })
        res.status(200).json(favList)
    } catch (err) {
        next(err)
    }
})

app.delete('/cart/:id', async (req, res, next) => {
    try {
        const id = +req.params.id;
        console.log(id, 'ini id')
        const cartFound = await Cart.findByPk(id);
        console.log(cartFound)
        if (!cartFound) {
          throw { name: 'Game not found' }
        }
  
        await Cart.destroy({ where: { id } });
  
        res
          .status(200)
          .json({ message: `Success removing game from cart` });
      } catch (err) {
        next(err)
      }
})

app.post('/midtrans', async (req, res, next) => {
    try {
        console.log('masuk')
        const findUser = await User.findByPk(req.user.id)
        const findCart = await Cart.findAll({
            where: { UserId: req.user.id },
            include: [{
                model: Game,
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }],
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        let totalGrossAmount = 0;
        findCart.forEach((cartItem) => {
            totalGrossAmount += parseFloat(cartItem.Game.normalPrice);
        });
        // console.log(totalGrossAmount, 'iniiiiiii')
        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : 'SB-Mid-server-un5IxM9tQQxT74NdRYceFY7o'
        });

        let parameter = {
            "transaction_details": {
                "order_id": "ORDER_ID_" + Math.floor(1000000 + Math.random() * 9000000),
                "gross_amount": Math.ceil(totalGrossAmount * 15000)
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "username": findUser.username,
            }
        };

    const midtransToken = await snap.createTransaction(parameter)
    // console.log(midtransToken)
    res.status(201).json(midtransToken)
    } catch (error) {
        next(error)
    }
})

app.delete('/deleteCart', async (req, res, next) => {
    try {
        const UserId = req.user.id;  
        await Cart.destroy({ where: { 'UserId': UserId } });
      } catch (err) {
        next(err)
      }
})

app.use((err, req, res, next) => {
    console.log(err)
    let code = 500
    let msg = "Internal server error"

    if (err.name == "Password is required" || err.name == "Username must be unique" || err.name == 'Username is required') {
        code = 400
        msg = err.name
    }
    if (err.name == "Invalid username/password") {
        code = 401
        msg = err.name
    }
    if (err.name == "Invalid token") {
        code = 401
        msg = err.name
    }
    if (err.name == "JsonWebTokenError") {
        code = 401
        msg = 'Invalid token'
    }
    if (err.name == "Game not found") {
        code = 404
        msg = err.name
    }
    res.status(code).json({
        message: msg
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })