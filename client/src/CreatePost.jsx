import React, { useState } from "react";
import "./CreatePost.css";
import GenMoodButton from "./GenMoodButton";
import { refreshAccessToken } from './authUtil.js';
import { useNavigate } from 'react-router-dom';

/**
 * A component that provides an interface for users to create a new post, selecting a song, artist, and mood. 
 * It allows users to input the name of the song and artist, choose a mood, and submit the post.
 * If the user is not logged in or an error occurs during post submission, appropriate feedback is provided.
 *
 * @returns A form allowing the user to create a post with song, artist, and mood information.
 */
const CreatePost = () => {
  const [songInput, setSongInput] = useState('');
  const [artistInput, setArtistInput] = useState('');
  const [moods , setMoods] = useState({
        "😄 happy" : { Mstring:[] , isSelected: false},
        "😢 sad" : { Mstring:[] , isSelected: false},
        "😴 tired" : { Mstring:[] , isSelected: false},
        "😠 angry" : { Mstring:[] , isSelected: false},
        "🌈 hopeful" : { Mstring:[] , isSelected: false},
        "😰 anxious" : { Mstring:[] , isSelected: false},
        "✨ inspired" : { Mstring:[] , isSelected: false},
        "🧘 calm" : { Mstring:[] , isSelected: false},
        "🤩 excited" : { Mstring:[] , isSelected: false},
        "😂 amused" : { Mstring:[] , isSelected: false},
    } );
    const navigate = useNavigate();
    const getSelectedMood = () => {
      const selectedMood = Object.keys(moods).find(key => moods[key].isSelected);
      return selectedMood; 
    };

    /**
     * Handles the submission of the post form. Validates the input and sends the post data to the server.
     * @param {Event} event - The event triggered on form submission.
     */
    const handleSubmit = (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      
      const moodInput = getSelectedMood();
  
      if (!moodInput || !songInput.trim() || !artistInput.trim()) {
        alert("Please fill out all fields and select a mood to VIBE ;)");
    
        setSongInput('');
        setArtistInput('');
        if(moodInput){
          const refreshedMoods =  { ...moods };
          refreshedMoods[moodInput].isSelected = false;
          setMoods(refreshedMoods);
        }
      } else{
        /**
         * Asynchronously sends the post data to the server. If the user is not logged in or if there is an issue with the 
         * request, appropriate error handling is performed. In case of an expired or invalid access token, an attempt to refresh
         * the access token is made.
         */
        const sendPost = async() => {
          const postData = {
            song: songInput,
            artists: artistInput,
            mood: moodInput,
          };
          const API_key = localStorage.getItem('accessToken');
          if(API_key == null) 
            {throw new Error('User is not logged in')}
          try {
            const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            headers: {
              'Authorization': `bearer ${API_key}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
          })
          
          if (!response.ok) { 
            if (response.status == 401)
            {
                console.log('trying to refresh access token...');
                await refreshAccessToken();
                sendPost();
                return;
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
          }

          } catch (error) {
            console.error('Failed to update created post:', error);
          }
        }
        sendPost();
        navigate('/home')
        }
    };

    /**
     * Cancels the post creation and navigates the user back to the home page.
     */
    const handleCancel = () => {
      navigate('/home')
    };
  

    /**
     * Toggles the selected mood for the post, ensuring only one mood can be selected at a time.
     * @param {string} moodType - The type of mood being toggled.
     */
    const handleMoodClick = (moodType) => {
        const updatedMoods = { ...moods };
        const check_mood = updatedMoods[moodType];
        if (check_mood.isSelected)
            check_mood.Mstring = [];
        else
            //check if 
            Object.keys(updatedMoods).forEach(mood => {
                updatedMoods[mood].isSelected = false;
                updatedMoods[mood].Mstring = [];
              });
              // Select the clicked mood and set its string
            updatedMoods[moodType].Mstring = moodType;
            check_mood.Mstring = moodType;

        check_mood.isSelected = !check_mood.isSelected;
        setMoods(updatedMoods);
      };
    /**
     * Renders a mood selection button.
     * @param {string} moodType - The type of mood the button represents.
     * @returns A GenMoodButton component for mood selection.
     */
    const renderButton = (moodType) => (
        <GenMoodButton
            type="button"
            moodString={moodType}
            onClick={() => handleMoodClick(moodType)}
            isSelected={moods[moodType].isSelected}
        />
      );

    
  return (

    <div className="createPost" style = {{position: 'fixed', left: '400px'}}>
        <div className="captureYourVibe" style = {{position: 'absolute', left: '120px'}}>CAPTURE YOUR VIBE!</div>

            <div className="artistFrame">
              <div className="Tag">Artist</div>
              <input
                className="artist-input"
                id="artistData"
                type="text"
                placeholder="  ADD THE ARTIST HERE..."
                value={artistInput}
                onChange={(e) => setArtistInput(e.target.value)}
              />
          </div>

          <div className="songFrame">
            <div className="Tag">Song</div>
            <input
              className="song-input"
              id="songData"
              type="text"
              placeholder="  ADD YOUR SONG HERE..."
              value={songInput}
              onChange={(e) => setSongInput(e.target.value)}
            />
        </div>

          <div className="moodFrame">
            <div className="Tag">Mood</div>
            <div className="mood-input">
                <div>{renderButton("😄 happy")}<span> </span>{renderButton("😢 sad")}</div>
                <p></p>
                <div>{renderButton("😴 tired")}<span> </span>{renderButton("😠 angry")}<span> </span>{renderButton("🌈 hopeful")}</div>
                <p></p>
                <div>{renderButton("😰 anxious")}<span> </span>{renderButton("✨ inspired")}<span> </span>{renderButton("🧘 calm")}</div>
                <p></p>
                <div>{renderButton("🤩 excited")}<span> </span> {renderButton("😂 amused")}</div>
            </div>
          </div>

        <div className="pcButtons">
            <button className="cancelButton" type="button" onClick={handleCancel}>Cancel</button>
            <button className="postButton" type="submit" onClick={handleSubmit}>Post</button>
        </div>
    </div>
  );
};

export default CreatePost;



