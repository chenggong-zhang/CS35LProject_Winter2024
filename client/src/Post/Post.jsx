import React, { useState } from 'react';
import './Post.css';
import { refreshAccessToken } from '../authUtil.js';
import YouTube from 'react-youtube';
import InteractionButton from './InteractionButton';
import PlaybackButton from './Play_button';
import TimeStamp from './Time_stamp';


function Post({userHandle, userPubName, createTime, songName, artistName, moodList , postID,
              likeArray, HandshakeArray, fireArray, sadArray, lolArray, ggArray, ytlink, userID}) {

  const moodEmoji = moodList.split(" ")[0];
  const [player, setPlayer] = useState(null);
  const link = ytlink.split('v=')[1];
  const [isVibing, setIsVibing] = useState(false);


  const onReady = (e) => {
    setPlayer(e.target);
  };
  

  /* Alias Frame related implementations */
  function getInitials(name) {
    if (typeof name === 'string') {
      const names = name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`;
      } else if (names.length === 1) {
        return names[0][0];
      }
    }
    return ''; 
  }

  function generateBackground(name) {
    let hash = 0;
    let i;
     for (i = 0; i < name.length; i += 1) {
       hash = name.charCodeAt(i) + ((hash << 5) - hash);
     } 
    let color = '#';
     for (i = 0; i < 3; i += 1) {
       const value = (hash >> (i * 8)) & 0xff;
       color += `00${value.toString(16)}`.slice(-2);
     }
     return color;
  }
  
  let initials = getInitials(userPubName);
  let randColor = generateBackground(userPubName);
  const Alias_style = {
      position: 'absolute',
      bottom: '16px',
      display: 'flex',
      width: '45px',
      height: '45px',
      borderRadius: '100px',
      overflow: 'hidden',
      color: '#fff',
      margin: 'auto',
      background: randColor,
      justifyContent: 'center',
      alignItems: 'center'
  }
  
  /* Interaction counting */
  const [inters, setInter] = useState({
    like: { count: likeArray.length, isSelected: likeArray.includes(userID) },
    handshake: { count: HandshakeArray.length, isSelected: HandshakeArray.includes(userID) },
    fire: { count: fireArray.length, isSelected: fireArray.includes(userID) },
    sad: { count: sadArray.length, isSelected: sadArray.includes(userID) },
    lol: { count: lolArray.length, isSelected: lolArray.includes(userID) },
    gg: { count: ggArray.length, isSelected: ggArray.includes(userID) }
  });  
  


  return (
    <div className="Post">

      <div className="VibeStatus">
        <div className='vibe-text'>{isVibing ? 'VIBING NOW...' : 'VIBE'}</div>
        <div className='vibeEmoji'>{moodEmoji}</div>
      </div>

      <div className="UserInfo">
        <div style={Alias_style}>
            <span style={{margin: 'auto', fontFamily: 'Quattrocento', fontSize: '20px', fontWeight: 'bold'}}> {initials} </span>
        </div>
        <div className="PublicName">{userPubName}</div>
        <div className="UserHandle">@{userHandle}</div>
        <TimeStamp createdAt={createTime}/>
      </div>


      <div className="player">
          <YouTube videoId={link} 
                   opts={{height: '240',
                          width: '600',
                          playerVars: {'controls':0,}, }} 
                   onReady={onReady}> 
          </YouTube>
      </div>

      <div className="SongINFO_BV">
        <div className="Album_BV">
          <svg xmlns="http://www.w3.org/2000/svg" width="86" height="86" viewBox="0 0 86 86" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M76.2629 15H74.531L70.3141 24.9472H16.0471L11.775 15H9.97277C6.24787 15 3.22578 18.1755 3.22578 22.0846L2.99988 63.9154C2.99988 67.8245 6.02197 71 9.74687 71H76.3533C80.0782 71 82.774 67.8245 82.774 63.9154L82.9999 22.0846C83.0049 18.1755 79.9828 15 76.2629 15ZM25.4949 60.8182C18.5959 60.8182 12.9949 55.1206 12.9949 48.0909C12.9949 41.0612 18.5959 35.3636 25.4949 35.3636C32.4034 35.3636 37.9949 41.0612 37.9949 48.0909C37.9949 55.1206 32.4034 60.8182 25.4949 60.8182ZM60.4925 60.8182C53.5925 60.8182 47.9949 55.1206 47.9949 48.0909C47.9949 41.0612 53.5925 35.3636 60.4925 35.3636C67.3973 35.3636 72.9949 41.0612 72.9949 48.0909C72.9949 55.1206 67.4021 60.8182 60.4925 60.8182Z" fill="#241E52" />
            <path fillRule="evenodd" clipRule="evenodd" d="M20.6399 19.6225H64.1749L67.6299 15H18.1599L20.6399 19.6225Z" fill="#241E52" />
            <path d="M25.26 55.4116C29.2723 55.4116 32.525 52.0634 32.525 47.9331C32.525 43.8028 29.2723 40.4545 25.26 40.4545C21.2476 40.4545 17.995 43.8028 17.995 47.9331C17.995 52.0634 21.2476 55.4116 25.26 55.4116Z" fill="#241E52" />
            <path d="M60.2595 55.4116C64.2719 55.4116 67.5245 52.0634 67.5245 47.9331C67.5245 43.8028 64.2719 40.4545 60.2595 40.4545C56.2472 40.4545 52.9945 43.8028 52.9945 47.9331C52.9945 52.0634 56.2472 55.4116 60.2595 55.4116Z" fill="#241E52" />
          </svg>
        </div>
        <div className="SongName">{songName}</div>
        <div className="ArtistName">{artistName}</div>
        <div className="PlayButtonFrame">
          <PlaybackButton player={player} isVibing={isVibing} setIsVibing={setIsVibing} />
        </div>
      </div>

      <InteractionButton 
          inters={inters}
          setInter={setInter}
          PID={postID} 
          
          userID={userID} />

      <div className="InterCounter">
        <span>{inters.like.count}</span>
        <span>{inters.handshake.count}</span>
        <span>{inters.fire.count}</span>
        <span>{inters.sad.count}</span>
        <span>{inters.lol.count}</span>
        <span>{inters.gg.count}</span>
      </div>

    </div>
  );
};


export default Post;
