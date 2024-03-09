import React, { useState } from "react";
import "./CreatePost.css";
import GenMoodButton from "./GenMoodButton";

 const CreatePost = () => {

  const APIkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJydWJhdG8iLCJzdWIiOiI2NWU3Y2M0YjE2MTk1MGM3M2QzYTNkZjUiLCJpYXQiOjE3MTAwNTI5NTIsImV4cCI6MTcxMDA1MzU1Mn0.2yXsumm2t-pqVhDDvGxqJ2I1M1olEBOhcLRbKb-R40A';

  const [moods , setMoods] = useState({
        "😆 HAPPY" : { Mstring:[] , isSelected: false},
        "😢 SAD" : { Mstring:[] , isSelected: false},
        "🥱 TIRED" : { Mstring:[] , isSelected: false},
        "🤬 ANGRY" : { Mstring:[] , isSelected: false},
        "🫡 HOPEFUL" : { Mstring:[] , isSelected: false},
        "😫 ANXIOUS" : { Mstring:[] , isSelected: false},
        "🫢 NERVOUS" : { Mstring:[] , isSelected: false},
        "🧐 INSPIRED" : { Mstring:[] , isSelected: false},
        "😮‍💨 CHILL" : { Mstring:[] , isSelected: false},
        "😤 LFG" : { Mstring:[] , isSelected: false},
        "🤣 LMAO" : { Mstring:[] , isSelected: false},
        "🤯 MINDBLOWN" : { Mstring:[] , isSelected: false}
    } );

    const getSelectedMood = () => {
      const selectedMood = Object.keys(moods).find(key => moods[key].isSelected);
      return selectedMood; 
    };
  
  document.addEventListener('DOMContentLoaded', function() {   
    document.getElementById('post').addEventListener('click', function() {
        // Capture the data from the input fields
        var songInput = document.getElementById('songData').value;
        var artistInput = document.getElementById('artistData').value;
        var moodInput = getSelectedMood();
        
          if (!moodInput || !songInput || !artistInput) 
            console.log('Something is not selected!');

        // still pending one function to do the searching and retrieve the data from youtube data API
        const searchString = songInput + " " + artistInput;

        // Create an object with the data
        var postData = {
            song: songInput,
            artists: artistInput, 
            mood: moodInput
        };
        
        // Define the API endpoint
        var fullURL = 'http://localhost:4000/post';
    
        // Make an API call to the backend server
        fetch(fullURL, {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${APIkey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
  });
  
  
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

    const renderButton = (moodType) => (
        <GenMoodButton
            moodString={moodType}
            onClick={() => handleMoodClick(moodType)}
            isSelected={moods[moodType].isSelected}
        />
      );

    
  return (
    <div className="createPost">
        <div className="captureYourVibe">CAPTURE YOUR VIBE!</div>

          <div className="artistFrame">
            <div className="Tag">Artist</div>
            <input className="artist-input" id="artistData" type="text" placeholder="  ADD THE ARTIST HERE..."  />
          </div>

          <div className="songFrame">
            <div className="Tag">Song</div>
            <input className="song-input" id="songData" type="text" placeholder="  ADD YOUR SONG HERE..." />
          </div>

          <div className="moodFrame">
            <div className="Tag">Mood</div>
            <div className="mood-input">
                <p></p>
                {renderButton("😆 HAPPY")}<span> </span>{renderButton("😢 SAD")}<span> </span>{renderButton("🥱 TIRED")}
                <p></p>
                {renderButton("🤬 ANGRY")}<span> </span>{renderButton("🫡 HOPEFUL")}<span> </span>{renderButton("😫 ANXIOUS")}
                <p></p>
                {renderButton("🫢 NERVOUS")}<span> </span>{renderButton("🧐 INSPIRED")}<span> </span>{renderButton("😮‍💨 CHILL")}
                <p></p>
                {renderButton("😤 LFG")}<span> </span> {renderButton("🤣 LMAO")}<span> </span>{renderButton("🤯 MINDBLOWN")}
            </div>
          </div>


        <div className="pcButtons">
            <button className="cancelButton" id="cancel">Cancel</button>
            <button className="postButton" id="post">Post</button>
        </div>
    </div>
  );
};

export default CreatePost