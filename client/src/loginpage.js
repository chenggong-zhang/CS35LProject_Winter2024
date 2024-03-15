import React, {useRef, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken, logout} from './authUtil.js';

const loginWithEmail = async (email, navigate) => { //This function is the top email input box which sends request to server for one time password
    try {
      const response = await axios.post('http://localhost:4000/auth/email', {
        email: email
      });
      // console.log("axios sucessed");
      if (response.data.ok) {  
        return response.data; 
      } else if (response.status==401){
        navigate('/')
      }
      else {
        throw new Error(response.data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.log('Login failed');
      // console.log(error);
    }
  };


const verifyEmailWithOtp = async (email, otp, navigate) => { //This function is the bottom password box which sends request to server with password and email and get user object, access/refresh token which are then stored in local storage
    try {
      console.log(email)
      const response = await axios.post('http://localhost:4000/auth/email/verify', {
        email: email,
        otp: otp
      });
      if (response.data.ok) {
        localStorage.setItem('accessToken', response.data.accessToken); //storing user object, access and refresh JWT token
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userObject',JSON.stringify(response.data.user))
        return response.data.user; 
      } if (response.status === 401){
        navigate('/')
      }
      else {
        throw new Error(response.data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.log(error)
      console.error('Email verification failed', error);
      throw error;
    }
};



const getUser = async (userid, navigate, token) => {//This function is called when entering another user's profilepage, which retrieves their user object file and a string called isself, used to identify if user has editing permission.
  try {
    console.log('userid: ', userid);
    const API_key = localStorage.getItem('accessToken');
    if(API_key == null) {
        throw new Error('User is not logged in')
    }
    const response = await fetch('http://localhost:4000/user/'+userid, 
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_key}` // Include the JWT token in the Authorization header
      }
    });

    if (!response.ok) {
      if (response.status == 401)
      {
          console.log('trying to refresh access token...');
          await refreshAccessToken();
          getUser(userid, navigate, token);
          return;
      } else {
          throw new Error(`HTTP error! status: ${response.status}`);
      }  
    }

    const data = await response.json();

    localStorage.setItem('otherObject',JSON.stringify(data.user));
    localStorage.setItem('isSelf', data.is_self);
    const event = new CustomEvent('otherObjUpdated', {});
    window.dispatchEvent(event);

  } catch (error) {
    console.log(error)
    console.error("Failed to retrieve other user's information", error);
    navigate('/')
    throw error;
  }
};

//gets the user followers and following
const getFollow=async (userid, navigate, token) => {//This function is called with getUser to retrieve the followers and followings list of the visiting user to display.
  try {
    console.log('running getFollow...');
    const API_key = localStorage.getItem('accessToken');
    if(API_key == null) {
        throw new Error('User is not logged in')
    }
    const response = await fetch('http://localhost:4000/relation/'+userid, 
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_key}` // Include the JWT token in the Authorization header
      }
    });

    if (!response.ok) {
      if (response.status == 401)
      {
          console.log('trying to refresh access token...');
          await refreshAccessToken();
          getFollow(userid, navigate, token);
          return;
      } else {
          throw new Error(`HTTP error! status: ${response.status}`);
      }  
    }

    const data = await response.json();

    localStorage.setItem('following',JSON.stringify(data.following));
    localStorage.setItem('followers', JSON.stringify(data.followers));


  } catch (error) {
    console.error('Getting followers and following failed', error);
    navigate('/')
    throw error;
  }
};


class MainLogin extends React.Component{ //This is the mainlogin component that gets rendered by default
  constructor(props){
    super(props);
    this.state={
      opt: null,
      email: null,
      current: null
    };
  }
  setEmail=(email)=>{
    this.setState({email});
  }
  setCurrent=(current)=>{
    this.setState({current});
  }
  setOpt=(opt)=>{
    this.setState({opt});
  }
    render()
    {
      return(
    <div style={{alignItems: 'center', width: '100%', height: '100%', position: 'relative',  background: 'radial-gradient(circle at bottom left, #9DB2B9, #444D78, #393B6A, #353363, #342D5F, #383262, #47406D, #4E4773, #5A527C, #6C638B)'}}>
      <div style={{ width: 320, height: 50, left: '40%', top: 155, position: 'absolute', boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.25)' }}>
      <div style={{position: 'absolute', bottom: 55, color: '#F2F2F2', fontSize: 20, fontFamily: 'Quicksand', fontWeight: '700', letterSpacing: 0.20, wordWrap: 'break-word'}}>email</div>
            <UserTypingBoard propsData={{state:this.state.email, setState:this.setEmail, current:this.state.current, setCurrent:this.setCurrent}}/>
      </div>
      <PassWord email={this.state.email} current={this.state.current} opt={this.state.opt} setOpt={this.setOpt} setCurrent={this.setCurrent}/>
      
      <div style={{width: 400, height: 53, left: '41.25%', top: 458, position: 'absolute', color: '#3CC2EF', fontSize: 25, fontFamily: 'Pacifico', fontWeight: '900', letterSpacing: 1.0, wordWrap: 'break-word'}}>SHARE YOUR VIBE</div>
      <div style={{width: 400, height: 53, left: '41.35%', top: 462, position: 'absolute', color: '#B50D65', fontSize: 25, fontFamily: 'Pacifico', fontWeight: '900', letterSpacing: 1.0, wordWrap: 'break-word'}}>SHARE YOUR VIBE</div>
      <div style={{width: 400, height: 53, left: '41.3%', top: 460, position: 'absolute', color: '#E6EAEF', fontSize: 25, fontFamily: 'Pacifico', fontWeight: '900', letterSpacing: 1.0, wordWrap: 'break-word'}}>SHARE YOUR VIBE</div>
     
      <div style={{width: 300, height: "auto", left: '40%', top: 650, position: 'absolute'}}>
            <div style={{position: 'absolute'}}>
                  <Rubato imageSource={`${process.env.PUBLIC_URL}/rubato2 1.svg`}/>
            </div>
            <div style={{left: 105, top: 20, position:'absolute', color: '#E6EAEF', fontSize: 42, fontFamily: 'Pacifico', fontWeight: '900', letterSpacing: 0.45, wordWrap: 'break-word'}}>
                <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
                RUBATO
            </div>
        </div>
      </div>
      )
    }
}

function PassWord({email, current, opt, setOpt, setCurrent}){//This is the component name "password" rendered above the password input box
  if (email==null){
    return null;
  }
  else{
    return (
  <div style={{ width: 320, height: 50, left: '40%', top: 250, position: 'absolute', borderRadius:40, boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.25)' }}>
      <div style={{position: 'absolute', bottom: 55, color: '#F2F2F2', fontSize: 20, fontFamily: 'Quicksand', fontWeight: '700', letterSpacing: 0.20, wordWrap: 'break-word'}}>password</div>
    <UserTypingBoard propsData={{state: opt, setState: setOpt, current: current, setCurrent:setCurrent}}/>
  </div>
    );
  }
}

//This is the input boxes for both email and passwords
//
function UserTypingBoard({propsData}) {
  const {state, setState, current, setCurrent}=propsData
  const navigate = useNavigate();
  const inputRef = useRef();

  const focusTextInput = () => {
    inputRef.current.focus();
  };
  const handleKeyPress = (event)=>{
    if (event.key==='Enter'){
      setState(inputRef.current.value)
    }
  }
  useEffect(()=>{
    const executeAsynchOperations=async()=>{
    const executeAsynchOperations=async()=>{
    if (state){
      if (current===null){
        loginWithEmail(state, navigate);
        setCurrent(inputRef.current.value)
      }
      else{
        await verifyEmailWithOtp(current, state, navigate)
        navigate('/home')
      }
    }
  }
    executeAsynchOperations();
  }
    executeAsynchOperations();
  },[state]);

  return (
    <div>
      <input ref={inputRef} onKeyDown={handleKeyPress} type="text" style={{ width: 320, height: 50, bottom: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 40 }} />
      <div onClick={focusTextInput} style={{ cursor: 'pointer', textAlign: 'center', lineHeight: '20px' }}></div>
    </div>
  );
}

//This is the logo
class Rubato extends React.Component{
  render(){
      const {imageSource}=this.props;
      return (
          <img style={{width: 88, height: 110, position:'absolute'}} alt='pic'src={imageSource} />
      )
  }
}


export default MainLogin;
export {
  getUser, getFollow
}
