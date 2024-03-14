import React, { useState, useEffect } from 'react';
import Post from './Post/Post.jsx';

function PostList(APIkey, userID){

    const [postRawData , setPostRawData] = useState([]);

    APIkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJydWJhdG8iLCJzdWIiOiI2NWU3Y2M0YjE2MTk1MGM3M2QzYTNkZjUiLCJpYXQiOjE3MTAzODE4MTUsImV4cCI6MTcxMDM4MjQxNX0.6OhWW41jDv8ymlaN5OyHlCaGb6NJ4Yhhn0dP4XioCos';
    userID = "65e7cc4b161950c73d3a3df5";

  let fullURL = "http://localhost:4000/post";

  if(userID) {
    const params = {
      ['user_id']: userID
    };
    const query = new URLSearchParams(params).toString();
  
    fullURL = `http://localhost:4000/post?${query}`;
  }
  

    useEffect(() => {
        const fetchInfo = async () => {
          try {
            const response = await fetch(fullURL , {
              method: 'GET',
              headers:{
                'Authorization': `bearer ${APIkey}`,
                'Content-Type': 'application/json'
              }
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json(); // Correctly parsing the JSON data
            if (!data.ok) {
                throw new Error('API responded with an error');
              }
              setPostRawData(data.posts);

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchInfo();
      });


      const posts = postRawData.map((postItemRawData) => {
        return (
        <li key={postItemRawData._id}>
            <Post userHandle={postItemRawData.user_id.handle} 
                  userPubName={postItemRawData.user_id.username} 
                  createTime={postItemRawData.created_at} 
                  songName={postItemRawData.song} 
                  artistName={postItemRawData.artists} 
                  moodList={postItemRawData.mood} 
                  postID={postItemRawData._id}
                  likeArray={postItemRawData.like_by}
                  HandshakeArray={postItemRawData.handshake_by}
                  fireArray={postItemRawData.fire_by}
                  sadArray={postItemRawData.sad_by}
                  lolArray={postItemRawData.lol_by}
                  ggArray={postItemRawData.gg_by}
                  ytlink={postItemRawData.yt_link}
                  APIkey={APIkey}
            />
         </li>);
      } )



      return(
        <ol>{posts}</ol>
      )

}

export default PostList;