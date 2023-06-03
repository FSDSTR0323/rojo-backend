# FOOD INFORMER API

API to manage the FOOD Informer endpoints and interaction with its related frontend. 

This API has been designed to be working with MongoDB using a [MongoDB Atlas](https://www.mongodb.com/atlas/database) account. 

Make sure you create an account and set up a new database before continuing through this documentation. Any username and password described here are related to the MongoDB cluster's password.

## Setting up the API server

1. Clone repository locally:

```bash
git clone https://github.com/FSDSTR0323/rojo-backend.git
```

2. Install npm packages:

```bash
npm install
```

3.  Set up a .env file within root with the following variables:

```bash
DB_USER="" # Your Mongo DB Atlas' cluster username
DB_PASSWORD="" # Your Mongo DB Atlas' cluster password
DB_SERVER="" # Your Mongo DB Atlas' cluster server hostname
DB_NAME="" # Your Mongo DB Atlas' cluster Database name
JWT_SECRET="" # Your JSON Web Token Secret
PORT="" # Port you want the API to be in
```

4.  Start the development server by:

```bash
npm run dev
```

## API

### User

The following are User related operations

#### Register Customer and User

Allows to register a new Customer and a User with the role 'owner'.

```bash
POST /user/register
```

##### Body Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| firstName | String | True | User's first name | "John" |
| lastName | String | True | User's last name | "Smith" |
| nickname | String |  True | User's nickname | "johnsmith923" |
| password | String | True | User's password | "1234abc" |
| role | String | True | User's role within the app | ("owner", "headchef", "chef") |
| customerName | String | True | Customer's company name | "Chez Florian" |
| customerAddress | String | True | Customer's company address | "24, Spaghetti road, 08025, Barcelona" |
| customerEmail | String | True | Customer's company email. This email will be used as the user's email as well | "chezflorian@gmail.com" |
| customerCif | String | True | Customer's company CIF Number | "123456789" |

##### Responses

- 201: User successfully registered and logged in.

```json
{
   "token": "<JWT Token>",
}
```

- 400: Bad request or validation error.
- 404: Customer ID not found.
- 500: Internal server error.


#### Login

Allows an already registered user to log in using their nickname and password.

```bash
POST /user/login
```

##### Body Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| nickname | String |  True | User's nickname | "johnsmith923" |
| password | String | True | User's password | "1234abc" |


##### Responses

- 200: User successfully logged in.

```json
{
   "token": "<JWT Token>",
}
```

- 400: Bad request or validation error.
- 404: Customer ID not found.
- 500: Internal server error.


#### Get user data

Allows to get the current user's data, extracting info from a valid JWT Token.

```bash
POST /user/
```

Requires **authentication** via a valid JWT Token in the Authorization header.


##### Responses

- 200: User found in the database

```json
{
    "nickname": "johnsmith923",
    "email": "johnsmith923@gmail.com",
    "role": "owner",
    "permissions": [
        "user.create"
    ]
}
```

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| nickname | String |  True | User's nickname | "johnsmith923" |
| email | String | True | User email | "johnsmith923@gmail.com" |
| role | String | True | User's role within the app | ("owner", "headchef", "chef") |
| permissions | String | True | List of user permissions within the app | ['user.create', 'dashboard.view'] |

- 404: Customer not found.
- 500: Internal server error.