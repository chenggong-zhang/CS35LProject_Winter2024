import React, { useState, useEffect } from 'react';
import Post from './Post/Post.jsx';
import './PostList.css'
import { refreshAccessToken} from './authUtil.js';

/**
 * A component that renders a list of Post components based on data fetched from an API.
 * It dynamically generates each Post by passing down the necessary props extracted from the raw post data.
 *
 * @param {string} APIkey An API key used for authorization in API requests (currently not directly used in the component).
 * @param {string} userID The ID of the user whose posts are to be fetched and displayed.
 * @returns An ordered list (<ol>) of Post components.
 */

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
  
  /**
   * Fetches post data from the server and updates the component's state with the received data.
   */
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

      /**
       * Maps each item of post raw data to a Post component, passing the necessary data as props.
       * Each Post component represents a single user post, displaying various details such as the user's public name,
       * the song shared, the artist's name, the mood associated with the post, and interactive elements like a like button
       * and a playback toggle for an embedded YouTube video of the shared song.
       *
       * @param {Array} postRawData - An array of objects, each containing data for a single post.
       * @returns An array of <li> elements, each containing a Post component with the corresponding post data.
       */
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