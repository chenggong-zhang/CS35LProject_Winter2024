import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import GenMoodButton from "./GenMoodButton";

 const CreatePost = () => {

  const APIkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJydWJhdG8iLCJzdWIiOiI2NWU3Y2M0YjE2MTk1MGM3M2QzYTNkZjUiLCJpYXQiOjE3MTAyOTkyMzgsImV4cCI6MTcxMDI5OTgzOH0.eRhEMe3CSGSNJvLSeSwBo4hUlTt0ERio90leijWEA-A';

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

    const getSelectedMood = () => {
      const selectedMood = Object.keys(moods).find(key => moods[key].isSelected);
      return selectedMood; 
    };
  
    const handleSubmit = (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      
      const moodInput = getSelectedMood();
      console.log(songInput, artistInput, moodInput);
  
      if (!moodInput || !songInput.trim() || !artistInput.trim()) {
        alert("Please fill out all fields and select a mood to VIBE ;)");
    
        // Clear the input fields after alert
        setSongInput('');
        setArtistInput('');
        if(moodInput){
          const refreshedMoods =  { ...moods };
          refreshedMoods[moodInput].isSelected = false;
          setMoods(refreshedMoods);
        }
        // Optionally clear the mood selection as well
        // Reset moods here if needed
      } else{
        const postData = {
          song: songInput,
          artists: artistInput,
          mood: moodInput,
        };
    
        fetch('http://localhost:4000/post', {
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

        // return to the previous page
      }
    };

    const handleCancel = () => {
      
    };
  
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
            type="button"
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
                <p></p>
                {renderButton("😄 happy")}<span> </span>{renderButton("😢 sad")}
                <p></p>
                {renderButton("😴 tired")}<span> </span>{renderButton("😠 angry")}<span> </span>{renderButton("🌈 hopeful")}
                <p></p>
                {renderButton("😰 anxious")}<span> </span>{renderButton("✨ inspired")}<span> </span>{renderButton("🧘 calm")}
                <p></p>
                {renderButton("🤩 excited")}<span> </span> {renderButton("😂 amused")}
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



  // document.addEventListener('DOMContentLoaded', function() {   
  //   document.getElementById('post').addEventListener('click', () => {
  //       // Capture the data from the input fields
  //       const songInput = document.getElementById('songData').value;
  //       const artistInput = document.getElementById('artistData').value;
  //       const moodInput = getSelectedMood();
  //       console.log(songInput);
  //       console.log(artistInput);
  //       console.log(moodInput);

  //       if (!moodInput || !songInput || !artistInput) 
  //            throw new Error(`Something is missing!`);

        
  //       // Create an object with the data
  //       const postData = {
  //           song: songInput,
  //           artists: artistInput, 
  //           mood: moodInput,
  //       };
        
  //       // Define the API endpoint
  //       const fullURL = 'http://localhost:4000/post';
    
  //       // Make an API call to the backend server
  //       fetch(fullURL, {
  //           method: 'POST',
  //           headers: {
  //               'Authorization': `bearer ${APIkey}`,
  //               'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(postData),
  //       })
  //       .then(response => response.json())
  //       .then(data => {
  //           console.log('Success:', data);
  //       })
  //       .catch((error) => {
  //           console.error('Error:', error);
  //       });
  //   });
  // });
  