# CS 35L Course Project

## Project set up
To set up the project, follow these steps:
> **_NOTE:_**   
> When connecting to the remote MongoDB database, we noticed that the UCLA_WEB does not work. Please switch to a different network such as eduroam. 
> 
> Also, please make sure to have the latest version of Node.js and npm installed.

> **_IMPORTANT:_** Before initialize the project, make sure to add a `.env` file in the `./server` directory with the provided key-value pairs.  
>
1. Clone the repository:

```
git clone https://github.com/chenggong-zhang/CS35LProject_Winter2024.git
```

1. The `./initialize.sh` script can be run to initialize the project and run both the server and the client. You can then skip to step 6. If you want to manually initialize the project, you can jump to step 3.

```
# in the project's root directory
# first enable the execute permission of the script 
chmod u+x ./initialize.sh

# then run the script, and it's good to go!
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


---
## Resources

### Server-side
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

### Client-side
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

### Other tools
- Postman: API
- MongoDB Compass: Database management
- Figma: UI Design