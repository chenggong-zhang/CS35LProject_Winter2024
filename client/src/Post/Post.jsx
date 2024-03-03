import React, { useState, useEffect } from 'react';
import './Post.css';
import InteractionButton from './InteractionButton';
import PlaybackButton from './Play_button';
import TimeStamp from './Time_stamp';


function Post(ID = '65e8fa9bc8148ce89579ceb7') {



  const APIkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJydWJhdG8iLCJzdWIiOiI2NWU3Y2M0YjE2MTk1MGM3M2QzYTNkZjUiLCJpYXQiOjE3MDk3NjU2MjksImV4cCI6MTcwOTc2NjIyOX0.lQzFf1_VX1b1Z-z-OAwGdvIR2JfphnUE1MWmXR2KKu0';
  const [isVibing, setIsVibing] = useState(false);

  /* User info setting*/
  const [userHandle , setUserHandle] = useState([]);
  const [userPubName , setUserPubName] = useState([]);
  /* Time stamp calc and setting */
  const [createTime , setCreateTime] = useState([]);
  /* Song and artist info setting*/
  const [songName , setSongName] = useState([]);
  const [artistName, setArtistName] = useState([]);
  /* Mood Status*/
  const [moodEmoji , setMoodEmoji] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch(`http://localhost:4000/post` , {
          method: 'GET',
          headers:{
            'Authorization':`Bearer ${APIkey}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Correctly parsing the JSON data

        console.log(data)
        // Now access the properties directly without await
        const UH = data.user_id.handle;
        const UPN = data.user_id.username;
        const CT = data.user_id.created_at;
        const SN = data.song;
        const AN = data.artists; // Check this key, there's a typo in your original code (artisits)
        const MoodRaw = data.mood;
  
        // Set the state with the fetched data
        setUserHandle(UH);
        setUserPubName(UPN);
        setCreateTime(CT);
        setSongName(SN);
        setArtistName(AN);
  
        const MD = MoodRaw[0];
        setMoodEmoji(MD);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchInfo();
  }, []);

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
    return ''; // Return a default value if name is not a string or is empty
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
  let color = generateBackground(userPubName);
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
      background: color,
      justifyContent: 'center',
      alignItems: 'center'
  }
  
  /* Interaction counting */
  const [interactions, setInteractions] = useState({
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0,
    dislikes: 0,
    reports: 0
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

        <script>

        </script>
      </div>


      <div className="Album_WV"></div>

      <div className="SongINFO_BV">
        <div className="Album_BV">
          <svg xmlns="http://www.w3.org/2000/svg" width="86" height="86" viewBox="0 0 86 86" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M76.2629 15H74.531L70.3141 24.9472H16.0471L11.775 15H9.97277C6.24787 15 3.22578 18.1755 3.22578 22.0846L2.99988 63.9154C2.99988 67.8245 6.02197 71 9.74687 71H76.3533C80.0782 71 82.774 67.8245 82.774 63.9154L82.9999 22.0846C83.0049 18.1755 79.9828 15 76.2629 15ZM25.4949 60.8182C18.5959 60.8182 12.9949 55.1206 12.9949 48.0909C12.9949 41.0612 18.5959 35.3636 25.4949 35.3636C32.4034 35.3636 37.9949 41.0612 37.9949 48.0909C37.9949 55.1206 32.4034 60.8182 25.4949 60.8182ZM60.4925 60.8182C53.5925 60.8182 47.9949 55.1206 47.9949 48.0909C47.9949 41.0612 53.5925 35.3636 60.4925 35.3636C67.3973 35.3636 72.9949 41.0612 72.9949 48.0909C72.9949 55.1206 67.4021 60.8182 60.4925 60.8182Z" fill="#241E52" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M20.6399 19.6225H64.1749L67.6299 15H18.1599L20.6399 19.6225Z" fill="#241E52" />
            <path d="M25.26 55.4116C29.2723 55.4116 32.525 52.0634 32.525 47.9331C32.525 43.8028 29.2723 40.4545 25.26 40.4545C21.2476 40.4545 17.995 43.8028 17.995 47.9331C17.995 52.0634 21.2476 55.4116 25.26 55.4116Z" fill="#241E52" />
            <path d="M60.2595 55.4116C64.2719 55.4116 67.5245 52.0634 67.5245 47.9331C67.5245 43.8028 64.2719 40.4545 60.2595 40.4545C56.2472 40.4545 52.9945 43.8028 52.9945 47.9331C52.9945 52.0634 56.2472 55.4116 60.2595 55.4116Z" fill="#241E52" />
          </svg>
        </div>
        <div className="SongName">{songName}</div>
        <div className="ArtistName">{artistName}</div>
        <div className="PlayButtonFrame">
          <PlaybackButton isVibing={isVibing} setIsVibing={setIsVibing} />
        </div>
      </div>

      <InteractionButton PID={ID} key={APIkey} />

      <div className="InterCounter">
        <span>{interactions.likes}</span>
        <span>{interactions.comments}</span>
        <span>{interactions.shares}</span>
        <span>{interactions.saves}</span>
        <span>{interactions.dislikes}</span>
        <span>{interactions.reports}</span>
      </div>

    </div>
  );
};


export default Post;