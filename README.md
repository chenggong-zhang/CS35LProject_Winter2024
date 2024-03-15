# CS 35L Course Project

## INTRODUCTION

---

## COMPONENT

### BACKEND (API)
| Method | API endpoint | Additional Parameters | Description |
| --- | --- | --- | --- |
| POST | `/auth/email` | body: `{email: string}` | log in or sign up with an email |
| POST | `/auth/email/verify` | body: `{email: string, otp: string}` | use one time password to verify email |
| GET |  `/auth/token` | query: `?refreshToken=refresh_token` | refresh access token |
| POST | `/auth/logout` | headers: `Authorization: Bearer access_token` | log out |
| GET | `/user/:user_id` | headers: `Authorization: Bearer access_token`, path: `:user_id` | retrieve user profile data |
| POST | `/user` | headers: `Authorization: Bearer access_token; content-type: application/json`, body: `{username: string, handle: string}` | update user profile data |
| GET | `/user` | headers: `Authorization: Bearer access_token`, query: `?queryString=search_string` | search users |
| POST | `/relation/connect/:user_id` | headers: `Authorization: Bearer access_token`, path: `:user_id` | Connect with another user |
| POST | `/relation/disconnect/:user_id` | headers: `Authorization: Bearer access_token`, path: `:user_id` | Disconnect another user |
| GET | `/relation/:user_id` | headers: `Authorization: Bearer access_token`, path: `:user_id` | Get relations of a user |
| POST | `/post` | headers: `Authorization: Bearer access_token; content-type: application/json`, body: `{song: string, artists: string, mood: string}` | Create a post |
| Get | `/post` | headers: `Authorization: Bearer access_token`, query: `?user_id=user_id` | Get a list of posts. If `user_id` is provided, get the posts of that user; otherwise, get the feed of the current user |
| POST | `/post/:post_id/reaction` | headers: `Authorization: Bearer access_token; content-type: application/json`, body: `{reaction: string}`, path: `:post_id` | react to a post (add a reaction) | | react to a post (toggle a reaction) |
| GET | `/post/moods` | headers: `Authorization: Bearer access_token` | get the latest trending moods |

### FRONTEND




### DATASTORE
We used MongoDB as our database. The database has the following collections:

`users`:
| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | unique identifier |
| `username` | String | user's username |
| `handle` | String | user's handle |
| `email` | String | user's email |
| `temp_code` | Object | temporary code for email verification, contains `otp` for one-time password and `exp` for expiration time |
| `refresh_token` | String | refresh token for access token refresh |
| `created_at` | Date | creation date |
| `updated_at` | Date | last update date |

`relations`:
| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | unique identifier |
| `user1_id` | ObjectId | the user id of the follower |
| `user2_id` | ObjectId | the user id of the followed |
| `created_at` | Date | creation date |
| `updated_at` | Date | last update date |

`posts`:
| Field | Type | Description |
| --- | --- | --- |
| `_id` | ObjectId | unique identifier |
| `user_id` | ObjectId | the user id of the creator |
| `song` | String | the name of the song |
| `artists` | String | the name of the artists |
| `yt_link` | String | the link to the YouTube video |
| `mood` | String (enum) | the mood of the post |
| `like_by` | Array of ObjectId | the user ids of the users who added like reaction the post |
| `handshake_by` | Array of ObjectId | the user ids of the users who added handshake reaction to the post |
| `fire_by` | Array of ObjectId | the user ids of the users who add fire reaction to the post |
| `sad_by` | Array of ObjectId | the user ids of the users who add sad reaction to the post |
| `lol_by` | Array of ObjectId | the user ids of the users who add lol reaction to the post |
| `gg_by` | Array of ObjectId | the user ids of the users who add gg reaction to the post |
| `created_at` | Date | creation date |
| `updated_at` | Date | last update date |


---

## SETUP & COMMANDS
To set up the project, follow these steps:
> **_NOTE:_**   
> When connecting to the remote MongoDB database, we noticed that the UCLA_WEB does not work. Please switch to a different network such as eduroam. 
> 
> Also, please make sure to have the latest LTS version of Node.js and npm installed.

> **_IMPORTANT:_** Before initializing the project, make sure to add a `.env` file in the `./server` directory with the provided key-value pairs.  


1. Clone the repository:

```
git clone https://github.com/chenggong-zhang/CS35LProject_Winter2024.git
```

2. The `./initialize.sh` script can be run to initialize the project and run both the server and the client. You can then skip to step 6. If you want to manually initialize the project, you can jump to step 3.

```
# in the project's root directory
# first enable the execute permission of the script 
chmod u+x ./initialize.sh

# then run the script
./initialize.sh
```


3. (If you ran the `./initialize.sh` script, you can skip to step 6.) Install the dependencies in the server and client directories:

```
# from the project's root directory
cd server
npm install

# from the project's root directory
cd client
npm install
```

4. Install `concurrently` to run both the server and the client at the same time:

```
# from the project's root directory
npm install concurrently --save-dev
```

5. Run the server and client together:

```
# from the project's root directory
npm start
```

6. Open the client in your browser at `http://localhost:3000`. 



### Resources

#### Server-side
packages:
- express
- mongoose
- body-parser
- @sendgrid/mail
- cors
- dotenv
- jsonwebtoken
- node-schedule
- otp-generator
- passport
- passport-jwt
- nodemon
- express-mongo-sanitize

database instance:
- MongoDB Atlas

email service:
- SendGrid

Youtube API:
- Youtube Data API v3

#### Client-side
packages:
- axios
- react
- react-router-dom
- buffer
- crypto-browserify
- react-youtube
- stream-browserify
- web-vitals
- jsonwebtoken

#### Other tools
- Postman: API
- MongoDB Compass: Database management
- Figma: UI Design

---
## CONTRIBUTORS


---
## Examples (screenshots)
