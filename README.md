# CS 35L Course Project

## INTRODUCTION
Rubato is a social platform that allows users to share and see what songs their friends are listening to. Users can create a post by entering the names of the song and the artists, along with a snapshot of their mood. The server will automatically find a relevant YouTube music video, which is embedded in the corresponding post display for convenient playback. In addition, users can react to posts using the interaction bar. A daily email notification is sent out, prompting users to create a new post. Rubato urges users to share the most recent track they've enjoyed, offering a genuine glimpse into their musical world. 

Application features:

Basic features
- Search users
- Create post
- Login/logout {authentication}

Our additional features
- User reaction to posts (‘fire’, ‘sad’, etc) 
- Embedded YouTube video player
- Profile {user profile + user post history + editing username}
- Act of following/unfollowing and dynamically display followers/following list
- Trending mood statistics
- Email OTP & notification

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

#### Post Component and related functions:
`PostList`:
A list container of the individual Post components, generated in batch using the map function that maps corresponding data to individual posts. The component is embedded in either the main page or the profile page to display either the feed or the post history of individual users correspondingly. This is handled by the parameter “userID” when requesting data from the backend data structure. When there is a userID, the generated PostList would give back a list of post history of the user that is indicated by the ID, meanwhile without such userID, a feed that contains the posts of all friends a user is following would be generated.

`Post`:
The core component of the Post functionality of the application. It takes in props that indicate the user information (i.e. who created the post), with detailed Public name, user handle. It also displays a time stamp, which marks the time elapsed from when the post was posted. A mood status in the top right corner indicates the mood status the user chose to post. A vibe status in the top left corner suggests whether the playback function of the post is being used. The post also show the information of the song the user shared by including the name of the song and the artist. Below that is the interaction bar(handled by the InteractionBar.jsx) and its corresponding counter that suggests how many users have interacted with the post using the interaction buttons. In addition, the post component also contain an embedded youtube music video of the song the user want to share and a playback toggle with which the user could interact to playback the music. Once the playback function is deployed, the vibe status bar at the top row would also change for indication.

`InteractionButton`:
The interaction bar contains 6 different interaction buttons: like, handshake, fire, sad, lol, gg. Each of the button could be toggle to represent a specific type of interaction the user would like to conduct. Once the button is clicked on, which represents selection, the button would accordingly change color to be highlighted and the counter above would also change the counts to reflect the recording of the interaction. The separate definition of this modular subcomponent in its own .jsx file was intended to handle the data interaction with the backend to extract interaction information based on which counts could be formulated.

`GenInteractiveButton`:
The GenInteractiveButton defines a generic interaction button that can can be labeled by distinct SVGs to indicate their property. A generic interaction button contains a name that labels the type of the button; an onClick prop to take in the functionality of click handling function; isSelected boolean that is used to mark whether such button is being selected; and SVG path that can be passed in to manipulate the shape.

`Play_button`
The PlaybackButton component is a functional component to control audio or video playback of the post. It uses a player object to interface with the media and has state variables isVibing and setIsVibing to manage the vibe status bar at the top row of the post. A local state isPlaying is toggled to reflect whether the embedded media is currently playing. When the button is clicked, it triggers the togglePlayback function, which interacts with the player to either play or pause the media based on the current state. The visual representation of the button switches between a play and pause icon accordingly

`Time_Stamp`
The TimeStamp component displays how many hours ago a post was created. It takes a createdAt prop, which represents the creation time of the post. Upon receiving this prop, it calculates the difference in hours between the current time and the post creation time. This component keeps the displayed time updated by recalculating the difference every hour using setInterval. The time is then presented in a simple format, showing the number of hours prefixed with a bullet point. 

`CreatePost`
The CreatePost component realizes the functionality of gathering user’s song information and their selection of the mood. By entering the name of the song and its artist, a user can thus make a post request to the backend server to record their sharing via the createPost interface. The Mood selection, unlike the string inputs, is handled by 10 mood buttons within the box.

`GenMoodButton`
The GenMoodButton component is a customizable generic mood button tailored for mood selection. It receives three props: moodString to display the mood it represents, isSelected to determine if the button is currently selected, and onClick as the event handler for click actions. The button's appearance changes dynamically based on its selection status.


#### Trending Bar:
The trending container consists of 5 dynamically sized length trending bars each of which display the number of “vibes” each emotion current has associated with it. Every time a user posts, they are allowed to select an emotion to relate to the song post. That emotion gets added to a count in the server that will get fetched. The bar will dynamically display the current count and the associated emotion. 

#### Search:
The search bar allows for users to search for other users on the app. Everytime a user logins using their email, a user account is automatically created for them with a username and a handle. Any user can search for other users through the handle. After typing the desired search query and clicking enter, a list of user handles that includes the search query will render beneath the bar. If a user wishes to navigate to a search result’s profile page, they can click the handle to be sent to their profile. 

#### Vibe Button:
This button is located on the right side of the main page, in the navigation bar. This button is meant to be clicked when the user wants to create a post. This redirects the user to the create post component page where they can enter the name of the song, artist, and mood associated to the song.

#### Buttons on the main page and profile page:
–Home
Clicking the word “Home” on any page will take the user back to the main page. 
–Profile
Clicking the word “Profile” on the main page will bring the user to their own profile page.
–Logout
Clicking the logout button on the bottom left of the main page will log a user out of their account while navigating them to the login page, allowing them to log in again if so desired. 

#### Name changing:
By clicking on the username box in the profile page, which is located below the profile picture, users can change their names at their own will.

#### Interactive Login page:
When the program starts, an interactive login page is mounted such that the user can first fill in their username, and upon entering, the password input box is dynamically displayed for the user to then enter the one time password from their email.

#### Followers and Following list:
On the right side of the profile page, the user can see other users who are currently following and followers. Each row of the followers and following list compose of the user’s account name, user handle and  the number of vibes/past posts on the right. 

#### Following Button:
After searching for other users and clicking the user_id on other user profile pages, you could click the follow button to follow other users, and the follow button will display as the following.

#### User Picture, username, and handle
User pictures for each user are automatically generated using their respective username. Along with the user picture, username and handle will be displayed in the central part of the profile page.




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
- Tianze Zhao
    - Profile Page
    - Login Page
    - Main Page
    - Followers and Following List
    - Integration and Debugging
- Yiheng Zhu
    - Server
    - Database
    - Auth Integration
    - Integration and Debugging
- Alexander Zhang
    - Server
    - Follow/Following Button
    - Integration and Debugging
- Lionel Hu
    - Post and Post List
    - Create Post
    - Integration and Debugging
- Ivan Tran
    - Trending 
    - Search
    - Main Page
    - Integration and Debugging
---
## Examples (screenshots)
https://docs.google.com/presentation/d/1l_H6hpcFr-R12dWQ-O9jZxmqXuCFxtSV3LyngEzc0w0/edit?usp=sharing 