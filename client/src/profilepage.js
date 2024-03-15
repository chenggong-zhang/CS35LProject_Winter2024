// Navigation.js

import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostList  from './PostList.jsx';
import { refreshAccessToken, logout } from './authUtil.js';

//This is the main class component that gets rendered when the profile page is navigated.
//isself: stores whether the user is viewing their own profilepage, used later to determine if user has editing options
//obj1: this variable stores the current logged in user's information.
//obj2: this variable stores the user information of the current profilepage we are looking at. (Could be self or others)
//username and handle are all current logged in's user information
class Profilepage extends React.Component{
    constructor(props) {
        super(props);
        // Initialize state
        this.state = {
            isself: JSON.parse(localStorage.getItem("isSelf")),
            obj1: JSON.parse(localStorage.getItem('userObject')),
            obj2: JSON.parse(localStorage.getItem('otherObject')),
            username: JSON.parse(localStorage.getItem('userObject')).username,
            handle: JSON.parse(localStorage.getItem('userObject')).handle
        };
        this.handleNewProfile = this.handleNewProfile.bind(this);
    }

    componentDidMount(){
        this.handleNewProfile();
        window.addEventListener('newProfile', this.handleNewProfile);
    }

    componentWillUnmount() {
        window.removeEventListener('newProfile', this.handleNewProfile);
    }

    updateUsername = (newValue) => {
        this.setState({ username: newValue });
    };
    


    handleNewProfile(){
        const { isself, obj1, obj2 } = this.state;
        let newState={};
        if (isself){
            newState={
            username: obj1.username,
            handle: obj1.handle
            }
        }else{
            newState={
            username: obj2.username,
            handle: obj2.handle
            }
        }
        this.setState(newState);

    }

    render(){
        const {username, handle}=this.state;




        const object=localStorage.getItem('userObject');
        const obj=JSON.parse(object);
        const token=localStorage.getItem('accessToken');

        const otherObj=localStorage.getItem('otherObject');
        const obj2=JSON.parse(otherObj);
        const userid=obj2!=null?obj2._id:null;



        return(
<div style={{width: '100%', height: '100%', position: 'relative', background: '#241E52'}}>
    {/* Left part of the page */}
    <div style={{width: 227, height: 1136, left: 54, top: 40, position: 'absolute'}}>
        <VibeButton />
        <LogoutButton />
        <div style={{right: 20, bottom: 15, position: 'relative'}}>
            <Rubato imageSource={`${process.env.PUBLIC_URL}/rubato2 1.svg`}/>
        </div>
        <Logo />
        <div style={{left: 10, top: 140, position: 'relative'}}>
            <NavigationBar imageSource={`${process.env.PUBLIC_URL}/Union.svg`}  barName='home' barPath='/home'/>
            <div style={{marginTop: '20px'}}><NavigationBar imageSource={`${process.env.PUBLIC_URL}/Vector.svg`} barName='profile' barPath='/profile'/></div>
        </div>
        <UserDisplay />
    </div>

    {/* Middle part of the page */}
    <div style={{width: 597, height: 1176, left: 397, top: 0, position: 'absolute', mixBlendMode: 'color-dodge', background: 'black', boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.25)', border: 'transparent'}}>   
    </div>
    <div style={{position: 'absolute',top: "500px", left:"355px", height: '900px', overflowY: 'scroll'}}>
    {this.state.is_self ? (
        <PostList APIkey={token} userID={this.state.obj1._id}/> 
    ) : (
        <PostList APIkey={token} userID={this.state.obj2._id}/> 
    )}
    </div>
    <div style={{width: 556, height: 671, left: 424, top: 123, position: 'absolute'}}>




    <FollowButton userid={userid} token={token}/>
    {/* User display in Middle */}
    <div style={{width: 260, height: 241, left: 144, top: 60, position: 'absolute'}}>
        <UserHandle handle={handle}/>
        <UserName username={username} handle={handle} isself={this.state.isself} updateUsername={this.updateUsername}/>
        <div style={{width: 120, height: 120, left: 42, top: 5, position: 'absolute'}}>
            <UserPic username={username}/>
        </div>  
    </div>

{/* Following and followers bars on the right */}
</div>
    <div style={{width: 360, height: 338, left: 1052, top: 39, position: 'absolute'}}>
        <Following/>
    </div>
    <div style={{width: 360, height: 349, left: 1052, top: 478, position: 'absolute'}}>
        <Followers/>
    </div>
</div>
        )
    }
}

//The following function returns the followers list
function Followers(){
    const otherObj=localStorage.getItem('followers');
    const obj1 = otherObj ? JSON.parse(otherObj) : [null, null, null, null];
    const obj2 = Array.isArray(obj1) ? obj1 : [obj1];
    const updatedfollowers = obj2.length >= 4 ? obj2.slice(0, 4) : [...obj2, ...Array(4 - obj2.length).fill(null)];
    const [followers, setfollowers]=useState(updatedfollowers);

    useEffect(()=>{
    window.addEventListener('otherObjUpdated', function(event){
        handleNewObj();
    });

    function handleNewObj(){
        const otherObj=localStorage.getItem('followers');
        const obj1 = otherObj ? JSON.parse(otherObj) : [null, null, null, null];
        const obj2 = Array.isArray(obj1) ? obj1 : [obj1];
        const updatedfollowers = obj2.length >= 4 ? obj2.slice(0, 4) : [...obj2, ...Array(4 - obj2.length).fill(null)];
        setfollowers(updatedfollowers);
    }
    return () => {
        window.removeEventListener('otherObjUpdated', handleNewObj);
    }
},[]);

    return(
<div>
<   div style={{width: 340, height: 35, left: 0, top: 0, position: 'absolute', boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.25)'}}>
            <div style={{width: 340, height: 35, left: 0, top: 0, position: 'absolute', background: 'rgba(230, 234, 239, 0.10)', borderRadius: 100}} />
            <div style={{left: 115, top: 7, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 18, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>FOLLOWERS</div>
    </div>
    <div style={{width: 360, height: 70, left: 0, top: 69, position: 'absolute'}}>
        {followers[0]!=null?<FollowBar numVibe={followers[0].postCount} uname={followers[0].username} uhandle={followers[0].handle}/>: <></>}
    </div>
    <div style={{width: 360, height: 70, left: 0, top: 139, position: 'absolute'}}>
        {followers[1]!=null?<FollowBar  numVibe={followers[1].postCount} uname={followers[1].username} uhandle={followers[1].handle}/>:<></>}
    </div>
    <div style={{width: 360, height: 70, left: 0, top: 209, position: 'absolute'}}>
        {followers[2]!=null?<FollowBar  numVibe={followers[2].postCount} uname={followers[2].username} uhandle={followers[2].handle}/>:<></>}
    </div>
    <div style={{width: 360, height: 70, left: 0, top: 279, position: 'absolute'}}>
        {followers[3]!=null?<FollowBar  numVibe={followers[3].postCount} uname={followers[3].username} uhandle={followers[3].handle}/>:<></>}
    </div>
</div>
    );
}

//the following function implements the following list
function Following(){
    const otherObj=localStorage.getItem('following');
    const obj1 = otherObj ? JSON.parse(otherObj) : [null, null, null, null];
    const obj2 = Array.isArray(obj1) ? obj1 : [obj1];
    const updatedfollowers = obj2.length >= 4 ? obj2.slice(0, 4) : [...obj2, ...Array(4 - obj2.length).fill(null)];
    const [following, setfollowing]=useState(updatedfollowers);

    useEffect(()=>{
    window.addEventListener('otherObjUpdated', function(event){
        handleNewObj();
    });

    function handleNewObj(){
        const otherObj=localStorage.getItem('following');
        const obj1 = otherObj ? JSON.parse(otherObj) : [null, null, null, null];
        const obj2 = Array.isArray(obj1) ? obj1 : [obj1];
        const updatedfollowing = obj2.length >= 4 ? obj2.slice(0, 4) : [...obj2, ...Array(4 - obj2.length).fill(null)];
        setfollowing(updatedfollowing);
    }
    return () => {
        window.removeEventListener('otherObjUpdated', handleNewObj);
    }
},[]);

    return(
<div>
    <div style={{width: 340, height: 35, left: 0, top: 0, position: 'absolute', boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.25)'}}>
            <div style={{width: 340, height: 35, left: 0, top: 0, position: 'absolute', background: 'rgba(230, 234, 239, 0.10)', borderRadius: 100}} />
            <div style={{width: 87, height: 23, left: 126, top: 7, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 18, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>Following</div>
    </div>
    <div style={{width: 360, height: 70, left: 0, top: 69, position: 'absolute'}}>
        {following[0]!=null? <FollowBar numVibe={following[0].postCount} uname={following[0].username} uhandle={following[0].handle}/>: <></>}
    </div>
    <div style={{width: 360, height: 70, left: 0, top: 139, position: 'absolute'}}>
        {following[1]!=null? <FollowBar  numVibe={following[1].postCount} uname={following[1].username} uhandle={following[1].handle}/>: <></>}
    </div>
    <div style={{width: 360, height: 70, left: 0, top: 209, position: 'absolute'}}>
        {following[2]!=null? <FollowBar  numVibe={following[2].postCount} uname={following[2].username} uhandle={following[2].handle}/>:<></>}
    </div>
    <div style={{width: 360, height: 70, left: 0, top: 279, position: 'absolute'}}>
        {following[3]!=null? <FollowBar  numVibe={following[3].postCount} uname={following[3].username} uhandle={following[3].handle}/>:<></>}
    </div>
</div>
    );
}

//The following function is the individual rows within followers and following list
function FollowBar({numVibe, uname, uhandle}){
    const Alias_style = {
        position: 'absolute',
        bottom: '2px',
        display: 'flex',
        width: '40px',
        height: '40px',
        borderRadius: '100px',
        overflow: 'hidden',
        color: '#fff',
        margin: 'auto',
        background: generateBackground(uname),
        fontFamily: "Old Standard TT",
        fontWeight: "bold",
        fontSize: "23px",
        justifyContent: 'center',
        alignItems: 'center'
    };
        return(
            <div>
                <div style={{width: 320, height: 0, left: 20, top: 1, position: 'absolute', border: '1px rgba(230, 234, 239, 0.10) solid'}}></div>
                <div style={{left: 245, top: 25, position: 'absolute', textAlign: 'right', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '500', wordWrap: 'break-word'}}>· {numVibe} vibes</div> 
                <div style={{width: 128, height: 40, left: 13, top: 15, position: 'absolute'}}>
                    <div style={{left: 49, width:200,top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>{uname}</div>
                    <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>{uhandle}</div>
                    <div style={Alias_style}>{getInitials(uname)}</div>
                </div>
            </div>
        )
}

//The following function implements the userhandle in the middle of the page.
function UserHandle({handle}){
    return(
    <div style={{left: 61, top: 164, position: 'absolute', color: '#FFFDFD', fontSize: 20, fontFamily: 'Old Standard TT', fontWeight: 'bold', wordWrap: 'break-word'}}>@{handle}</div>
    )
}

//The following function implements the user profile picture based on their username
function UserPic({username}){
    let initials = getInitials(username);
    let color = generateBackground(username);
    const Alias_style = {
        position: 'absolute',
        bottom: '2px',
        display: 'flex',
        width: '180px',
        height: '180px',
        borderRadius: '100px',
        overflow: 'hidden',
        color: '#fff',
        margin: 'auto',
        background: color,
        fontFamily: "Old Standard TT",
        fontWeight: "bold",
        fontSize: "25px",
        justifyContent: 'center',
        alignItems: 'center'
    }
    return(
        <div style={Alias_style}>
            <div style={{fontSize: 100}}>{initials}</div>
        </div>
    )
}



//Following function is used toeger with generate background to extract username initials and create their user profile pic
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
  

//The following is the username in the middle of the page, it displays and stores usernames after name change.
function UserName({username, handle, isself, updateUsername}){
    const token=localStorage.getItem('accessToken')
    const navigate=useNavigate();


    const [visible, setVisible]=useState(false)
    const [name, setName]=useState(username)
    const divRef = useRef("");
    const hasMounted=useRef(false);
    const update=()=>{
        setVisible(true)
    }
    const handleKeyPress = (event)=>{
        if (event.key==='Enter'){
          setName(divRef.current.value)
          setVisible(false)
        }
    }
    useEffect(() => {
        if (visible && divRef.current) {
            divRef.current.focus(); // Focus on the input when it becomes visible
        }
    }, [visible]); // Re-run the effect when showInput changes

    useEffect(()=>{
        setName(username);
    },[username]);


    useEffect(()=>{        
        if(name && hasMounted.current==true && isself==true){
            changeName(name, handle, token, navigate)}
            
        else{
            hasMounted.current = true;
        }
    },[name]);

    return(
        <div style={{alignItems: "center"}}>
            <div onClick={()=>update()} style={{width: 260, height: 48, left: 0, top: 193, position: 'absolute', background: 'rgba(217, 217, 217, 0)', borderRadius: 40, border: '2px #E6EAEF dotted'}} />
            {!visible && (<div style={{width: 200, height:35, left: 45, top: 203, textAlign: 'center',position: 'absolute', color: '#FFFDFD', fontSize: 20, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>{name}</div>)}
            {visible &&  
            <input ref={divRef} onKeyDown={handleKeyPress} type='text'style={{background: "transparent", width: 250, height:40, left: 3, top: 196, textAlign: 'center',position: 'absolute', color: '#ffffff', fontSize: 20, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word', borderRadius: 40}}defaultValue={name} ></input>}
        </div>
    );
}



//Following changeName is called when user clicked on the name bar, entered a new name, and then hit enter. 
const changeName = async (name, handle, token, navigate) => {
    try {
        const API_key = localStorage.getItem('accessToken');
        if(API_key == null) {
            throw new Error('User is not logged in')
        }
        
        const response = await fetch('http://localhost:4000/user/', 
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_key}`, // Include the JWT token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                handle: handle,
                username: name
            })
        });

        if (!response.ok) {
            if (response.status == 401)
            {
                await refreshAccessToken();
                changeName(name, handle, token, navigate);
                return;
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }  
        }

        const data = await response.json();
        localStorage.setItem("userObject",JSON.stringify(data.user))
        return ""; 
    } catch (error) {
      console.log(error);
    }
  };





//Following implements the individual navigation bar which combined form the navigation component on the left part of profilepage.
function NavigationBar({imageSource, barName, barPath}){
    const navigate = useNavigate();
    return(
        <div style={{ display: 'flex', flexDirection: 'row'}}>
                <img style={{width: 24, height: 24, position:'absolute'}} alt='pic'src={imageSource} />
                <div onClick={()=>navigate(barPath)} style={{marginLeft: '40px', color: '#E6EAEF', fontSize: 20, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>{barName}</div>
        </div>
    );
}

//Following implements vibebutton in profilepage, it is not equipped with actual function of posting because user could be visiting other's profile, and should not post on others behalf
class VibeButton extends React.Component{
    render(){
        return(
            <div style={{width: 132, height: 40, left: -1, top: 255, position: 'absolute', boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.25)'}}>
                <div style={{width: 132, height: 40, left: 0, top: 0, position: 'absolute', background: '#F95337', borderRadius: 100}} />
                <div style={{width: 87, height: 23, left: 22, top: 9, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 18, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>vibe</div>
            </div>
        )
    }
}


//The following logout button calls logout function from auth.util which logout once user clicks
function LogoutButton(){
    // const token=localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const handleLogout = async (navigate) => {
        try {
            const API_key = localStorage.getItem('accessToken');
            if(API_key == null) {
                throw new Error('User is not logged in')
            }

            await logout()
            navigate('/')

        } catch (error) {
            navigate('/')
        }
      };

    return(
        <div onClick={()=> handleLogout(navigate)} style={{width: 132, height: 40, left: -1, top: 1053, position: 'absolute', boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.25)'}}>
            <div style={{width: 132, height: 40, left: 0, top: 0, position: 'absolute', borderRadius: 100, border: '1px #F95337 solid'}} />
            <div style={{width: 87, height: 23, left: 22, top: 9, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 18, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>logout</div>
            {/* {errMess && <div style={{ color: 'grey' }}>{errMess}</div>} */}
        </div>
    );
}

//Following is logo
class Rubato extends React.Component{
    render(){
        const {imageSource}=this.props;
        return (
            <img style={{width: 88, height: 110, position:'absolute'}} alt='pic'src={imageSource} />
        )
    }
}


class Logo extends React.Component{
    render(){
        return(
            
            <div style={{width: 160, height: 53, left: 94, top: 10, position: 'absolute', color: '#E6EAEF', fontSize: 31, fontFamily: 'Pacifico', fontWeight: '900', letterSpacing: 0.45, wordWrap: 'break-word'}}>
                <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
                RUBATO
            </div>
        )
    }
}

//following is userdisplay section that includes profile pic, username and handle
function UserDisplay(){
    const object=localStorage.getItem('userObject');
    const obj=JSON.parse(object);
    const handle=obj.handle;
    const username=obj.username;
    const Alias_style = {
        position: 'absolute',
        top: '0px',
        left: '0px',
        display: 'flex',
        width: '40px',
        height: '40px',
        borderRadius: '100px',
        overflow: 'hidden',
        color: '#fff',
        fontFamily: 'Old Standard TT',
        fontWeight: 'bold',
        background: generateBackground(username),
        justifyContent: 'center',
        alignItems: 'center'
    }
    

    return(
        <div style={{width: 250, height: 40, left: 1, top: 988, position: 'absolute'}}>
            <div style={{left: 49, top: 0, width: 800, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>{username}</div>
            <div style={{left: 49, top: 20, width: 800, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>{handle}</div>
            <div style={Alias_style}>{getInitials(username)}</div>
        </div>
    )
    
}

//Following is the follow button in the middle of profile page which allows user to follow/unfollow other users
function FollowButton({userid, token}){
    const [isFollowing, setIsFollowing] = useState('Follow');
    const [Flag, setFlag]=useState(false);
    return(
        <div onClick={()=> Flag ? handleUnfollow(setIsFollowing, setFlag, userid, token) :handleFollow(setIsFollowing, setFlag, userid, token)} style={{width: 367, height: 37, left: 94, top: 317, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <div style={{width: 367, height: 37, left: 0, top: 0, position: 'absolute', background: '#37CAF9', borderRadius: 100}} />
            <div style={{width: 87, height: 23, left: 140, top: 8, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 18, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>{isFollowing}</div>
        </div>
    )
}




//Handlefollow is called when the user follow another user.
const handleFollow = async (setIsFollowing, setFlag, userid, token) => {
    try {
        const API_key = localStorage.getItem('accessToken');
        if(API_key == null) {
            throw new Error('User is not logged in')
        }

        const response = await fetch('http://localhost:4000/relation/connect/'+userid, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_key}` // Include the JWT token in the Authorization header
            },
        });

        if (!response.ok) {
            if (response.status == 401)
            {
                await refreshAccessToken();
                handleFollow(setIsFollowing, setFlag, userid, token);
                return;
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }  
        }

        setIsFollowing('Following');
        setFlag(true);
        setFlag(true);
    } catch (error) {
        console.error('Error following user:', error);

    }
};

//Handlefollow is called when the user unfollow another user.
const handleUnfollow = async (setIsFollowing, setFlag, userid, token) => {
    try {
        const API_key = localStorage.getItem('accessToken');
        if(API_key == null) {
            throw new Error('User is not logged in')
        }

        const response = await fetch('http://localhost:4000/relation/disconnect/'+userid, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_key}` // Include the JWT token in the Authorization header
            },
        });

        if (!response.ok) {
            if (response.status == 401)
            {
                await refreshAccessToken();
                handleUnfollow(setIsFollowing, setFlag, userid, token);
                return;
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }  
        }

        setIsFollowing('Follow');
        setFlag(false);
        setIsFollowing('Follow');
        setFlag(false);

    } catch (error) {
        console.error('Error unfollowing user:', error);
        console.error('Error unfollowing user:', error);
    }
};



export default Profilepage;

