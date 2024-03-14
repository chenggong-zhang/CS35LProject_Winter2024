import React, { useState, useEffect } from 'react';
import Post from './Post/Post.jsx';
import './PostList.css'
import { refreshAccessToken} from './authUtil.js';
function PostList({APIkey, userID}){

  const [postRawData , setPostRawData] = useState([]);


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
            const API_key = localStorage.getItem('accessToken');
                if(API_key == null) {
                    throw new Error('User is not logged in')
                }
            const response = await fetch(fullURL , {
              method: 'GET',
              headers:{
                'Authorization': `bearer ${API_key}`,
                'Content-Type': 'application/json'
              }
            });
            if (!response.ok) {
              if (response.status == 401)
                    {
                        console.log('trying to refresh access token...');
                        await refreshAccessToken();
                        fetchInfo();
                        return;
                    } else {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
            }
            const data = await response.json(); // Correctly parsing the JSON data
            console.log('post data:', data);
            if (!data.ok) {
                throw new Error('API responded with an error');
              }
            setPostRawData(data.posts);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchInfo();
      },[]);


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
                  userID={userID}
            />
         </li>);
      } )



      return(
        <ol>{posts}</ol>
      )

}

export default PostList;