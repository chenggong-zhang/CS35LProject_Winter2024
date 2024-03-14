# CS 35L Course Project

## Project set up
To set up the project, follow these steps:
> **_NOTE:_**  
> - When connecting to the remote MongoDB database, we noticed that the UCLA_WEB does not work. Please switch to a different network such as eduroam. 
> - Also, please make sure to have the latest version of Node.js and npm installed.

1. Clone the repository:

```
git clone https://github.com/chenggong-zhang/CS35LProject_Winter2024.git
```

2. Install the dependencies in the server and client directories:

```
# from the project's root directory
cd server
npm install

# from the project's root directory
cd client
npm install
```

3. Create a `.env` file in the server directory and add the following variables:
   > **_WARNING:_**  
   > - Normally, you should not push sensitive information like database tokens and jwt secrets to github. 
   > - The following information is just for testing purposes for this class project. They will be deactivated once the course is over.

```
# To be updated
```

4. Run the server and client:

```
# from the project's root directory
cd server
nodemon app.js  # run npx nodemon app.js if 'nodemon app.js' doesn't work

# from the project's root directory
cd client
npm start
```

1. Open the client in your browser at `http://localhost:3000`. 


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


### Other tools
- Postman: API
- MongoDB Compass: Database management
- Figma: UI Design