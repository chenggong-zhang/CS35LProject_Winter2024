import React, {useRef, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { refreshAccessToken, logout} from './authUtil.js';

const loginWithEmail = async (email, navigate) => {
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


const verifyEmailWithOtp = async (email, otp, navigate) => {
    try {
      console.log(email)
      const response = await axios.post('http://localhost:4000/auth/email/verify', {
        email: email,
        otp: otp
      });
      if (response.data.ok) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userObject',JSON.stringify(response.data.user))
        // console.log("email verified")
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


// other's data, for testing purpose only
// retrieving user's information
const getUser = async (userid, navigate, token) => {
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
    console.log("Original login page isself",  data.is_self)
    console.log("The fetched isSelf is ")
    console.log(data.is_self);
    console.log("other user's object sucessflly retrieved")
    const event = new CustomEvent('otherObjUpdated', {});
    console.log("event dispatched")
    window.dispatchEvent(event);

  } catch (error) {
    console.log(error)
    console.error("Failed to retrieve other user's information", error);
    navigate('/')
    throw error;
  }
};

//gets the user followers and following
const getFollow=async (userid, navigate, token) => {
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
    // console.log(response.data.following===null);
    // console.log(localStorage.getItem('following')==null);
    localStorage.setItem('followers', JSON.stringify(data.followers));
    // console.log(response.data.following);
    // console.log(response.data.followers);
    console.log(localStorage.getItem('following'));
    console.log(localStorage.getItem('followers'));
    console.log("The following and followers are suecessfully retrieved")

  } catch (error) {
    console.log(error)
    console.error('Getting followers and following failed', error);
    navigate('/')
    throw error;
  }
};


class MainLogin extends React.Component{
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
      
      <div style={{width: 400, height: 53, left: '40.85%', top: 498, position: 'absolute', color: '#3CC2EF', fontSize: 25, fontFamily: 'Pacifico', fontWeight: '900', letterSpacing: 1.0, wordWrap: 'break-word'}}>SHARE YOUR VIBE</div>
      <div style={{width: 400, height: 53, left: '40.95%', top: 502, position: 'absolute', color: '#B50D65', fontSize: 25, fontFamily: 'Pacifico', fontWeight: '900', letterSpacing: 1.0, wordWrap: 'break-word'}}>SHARE YOUR VIBE</div>
      <div style={{width: 400, height: 53, left: '40.9%', top: 500, position: 'absolute', color: '#E6EAEF', fontSize: 25, fontFamily: 'Pacifico', fontWeight: '900', letterSpacing: 1.0, wordWrap: 'break-word'}}>SHARE YOUR VIBE</div>
      <div style={{left: '39.85%', top: 740, position: 'absolute'}}>
            <Rubato imageSource={`${process.env.PUBLIC_URL}/rubato2 1.svg`}/>
      </div>
      <div style={{width: 300, height: 53, left: '44.3%', top: 760, position: 'absolute', color: '#E6EAEF', fontSize: 45, fontFamily: 'Pacifico', fontWeight: '900', letterSpacing: 0.45, wordWrap: 'break-word'}}>
                <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
                RUBATO
      </div>
    </div>
      )
    }
}

function PassWord({email, current, opt, setOpt, setCurrent}){
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

function UserTypingBoard({propsData}) {
  const {state, setState, current, setCurrent}=propsData
  const navigate = useNavigate();
  const inputRef = useRef();


  // const userid=JSON.parse(localStorage.getItem('userObject'))._id;
  // const token=localStorage.getItem('accessToken');


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
        // await getUser(userid, navigate, token)
        // await getFollow(userid, navigate, token)
        // console.log(localStorage.getItem("otherObject"));
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
