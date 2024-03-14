import React, { useState, useEffect } from 'react';
import Post from './Post/Post.jsx';

function PostList(){

    const [postRawData , setPostRawData] = useState([]);

    const APIkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJydWJhdG8iLCJzdWIiOiI2NWU3Y2M0YjE2MTk1MGM3M2QzYTNkZjUiLCJpYXQiOjE3MTAwMjg0NTAsImV4cCI6MTcxMDAyOTA1MH0._Q6gnU3tdZ4Fcd_NJaNM3IXNnsqo5gOfv1CNgoHAJ-c';


  const params = {
    // ['sort']: "string",
    // ['filter']: "string",
    ['user_id']: "65e7cc4b161950c73d3a3df5"

  };
  const query = new URLSearchParams(params).toString();

  const fullURL = `http://localhost:4000/post?${query}`;

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
                  ggArray={postItemRawData.gg_by}/>
         </li>);
      } )



      return(
        <ol>{posts}</ol>
      )

}

export default PostList;