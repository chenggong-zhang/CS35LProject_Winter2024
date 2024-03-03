
import React, { useState , useEffect} from 'react';
import './Post.css';
import PlaybackButton from './Play_button';
import './InteractionButton';


function Post ({ userhandle, publicname, timestamp, albumCover, songName, artistName }) {


  return (
    <div className="Post">
      <div className="Vibe-Status"> </div>

      <div className="UserInfo">
          <div className="AliasFrame">{}</div> 
          <div className="PublicName">{publicname}</div>
          <div className="UserHandle">@{userhandle}</div>
          <div className="Timestamp">{timestamp}</div>
      </div>
     

      <div className="Post-content">
        <div className="Album_WV"> 
          {albumCover/* Masked Album cover if needed */}
        </div>

        <div className="SongINFO_BV">
          <div className="Album_BV"></div>
          <div className="SongName">{songName}</div>
          <div className="ArtistName">{artistName}</div>
        </div>

        <PlaybackButton></PlaybackButton>

        <div className="InteractionBar">
          <Like_Button onClick={handleLikeButtonClick} />
          <Handshake_Button onClick={handleHandshakeButtonClick} />
          <Fire_Button onClick={handleFireButtonClick} />
          <Sad_Button onClick={handleSadButtonClick} />
          <LOL_Button onClick={handleLOLButtonClick} />
          <GGs_Button onClick={handleGGsButtonClick} />
        </div>
        
      </div>

    </div>
  );
};

export default Post;
