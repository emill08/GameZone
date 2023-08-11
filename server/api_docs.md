## API Documentation

### Register User

- **URL:** `/register`
- **Method:** POST
- **Description:** Registers a new user.
- **Request Body:**
  - `username` (string): The username of the user.
  - `password` (string): The password of the user.
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
        "id": "id",
        "username": "username"
    }
    ```
- **Error Response:**
  - **Code:** 400
  - **Content:**
    ```json
    {
        "message": "Username is required"
    }
    ```
    or
    ```json
    {
        "message": "Password is required"
    }
    ```
  - **Code:** 401
  - **Content:**
    ```json
    {
        "message": "Username must be unique"
    }
    ```

### Google Login

- **URL:** `/google-login`
- **Method:** POST
- **Description:** Logs in a user using Google authentication.
- **Request Headers:**
  - `google_token` (string): The Google token obtained after successful authentication.
- **Success Response:**
  - **Code:** 201 or 200
  - **Content:**
    ```json
    {
        "access_token": "generated_access_token",
        "username": "username(gmail)"
    }
    ```
- **Error Response:**
  - **Code:** 401
  - **Content:**
    ```json
    {
        "message": "Invalid token"
    }
    ```

### Login User

- **URL:** `/login`
- **Method:** POST
- **Description:** Logs in a user.
- **Request Body:**
  - `username` (string): The username of the user.
  - `password` (string): The password of the user.
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
        "access_token": "generated_access_token"
    }
    ```
- **Error Response:**
  - **Code:** 400
  - **Content:**
    ```json
    {
        "message": "Username is required"
    }
    ```
    or
    ```json
    {
        "message": "Password is required"
    }
    ```
  - **Code:** 401
  - **Content:**
    ```json
    {
        "message": "Invalid username/password"
    }
    ```

### Get Games

- **URL:** `/games`
- **Method:** GET
- **Description:** Retrieves a list of games from an external API.
- **Success Response:**
  - **Code:** 200
  - **Content:** JSON array containing game data.

### Middleware: Verify Token

- **Description:** Middleware function to verify the access token.
- **Request Headers:**
  - `access_token` (string): The access token for authentication.
- **Error Response:**
  - **Code:** 401
  - **Content:**
    ```json
    {
        "message": "Invalid token"
    }
    ```

### Get Games for Sale

- **URL:** `/sell`
- **Method:** GET
- **Description:** Retrieves a list of games available for sale.
- **Success Response:**
  - **Code:** 200
  - **Content:** JSON array of object containing game data.

### Add Game to Cart

- **URL:** `/cart/:gameId`
- **Method:** POST
- **Description:** Adds a game to the user's cart.
- **URL Parameters:**
  - `gameId` (string): The ID of the game to be added to the cart.
- **Success Response:**
  - **Code:** 201
  - **Content:**
    ```json
    {
        "id": "id",
        "gameId": "gameId"
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:**
    ```json
    {
        "message": "Game not found"
    }
    ```

### Get Cart

- **URL:** `/cart`
- **Method:** GET
- **Description:** Retrieves the user's cart with the included game details.
- **Success Response:**
  - **Code:** 200
  - **Content:** JSON object containing the user's cart with game details.

### Remove Game from Cart

- **URL:** `/cart/:gameId`
- **Method:** DELETE
- **Description:** Removes a game from the user's cart.
- **URL Parameters:**
  - `gameId` (string): The ID of the game to be removed from the cart.
- **Success Response:**
  - **Code:** 200
  - **Content:**
    ```json
    {
        "message": "Game removed from cart"
    }
    ```
- **Error Response:**
  - **Code:** 404
  - **Content:**
    ```json
    {
        "message": "Game not found"
    }
    ```


### Error Handling

- **Description:** Middleware function to handle errors.
- **Error Response:**
  - **Code:** 400
  - **Content:**
    ```json
    {
        "message": "Username is required"
    }
    ```
    or
    ```json
    {
        "message": "Password is required"
    }
    ```
  - **Code:** 401
  - **Content:**
    ```json
    {
        "message": "Invalid token"
    }
    ```
  - **Code:** 404
  - **Content:**
    ```json
    {
        "message": "Game not found"
    }
    ```
  - **Code:** 500
  - **Content:**
    ```json
    {
        "message": "Internal server error"
    }
    ```
