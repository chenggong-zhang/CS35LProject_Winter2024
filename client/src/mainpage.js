import React from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:4000/'
    

const loginWithEmail = async (email) => {
    try {
      const response = await axios.post('${baseURL}/auth/email', {
        email: email
      });
      if (response.data.ok) {  
        return response.data; 
      } else {
        throw new Error(response.data.error || 'Unknown error occurred');
      }

    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };


const verifyEmailWithOtp = async (email, otp) => {
    try {
      const response = await axios.post('${baseURL}/auth/email/verify', {
        email: email,
        otp: otp
      });
  
      if (response.data.ok) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('userObject', response.data.user)
  
        return response.data.user; 
      } else {
        throw new Error(response.data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Email verification failed', error);
      throw error;
    }
};


class main extends React.Component{
    render(){
        <div style={{width: '100%', height: '100%', position: 'relative', background: '#241E52'}}>
    <div style={{width: 88, height: 110, left: 50, top: 49, position: 'absolute', background: 'rgba(255, 255, 255, 0)'}}>
        <div style={{width: 57.58, height: 57.22, left: 4.55, top: 3.36, position: 'absolute', border: '10px #E6EAEF solid'}}></div>
        <div style={{width: 58.13, height: 56.43, left: 13.10, top: 9.29, position: 'absolute', border: '2px #E6EAEF solid'}}></div>
        <div style={{width: 59.97, height: 56.83, left: 19.05, top: 45.96, position: 'absolute', border: '10px #E6EAEF solid'}}></div>
        <div style={{width: 13.85, height: 30.93, left: 27.06, top: 78.08, position: 'absolute', border: '2.20px #E6EAEF solid'}}></div>
        <div style={{width: 38.21, height: 18.70, left: 48.82, top: 52.58, position: 'absolute', border: '2.20px #E6EAEF solid'}}></div>
        <div style={{width: 4.07, height: 3.60, left: 44.78, top: 74.25, position: 'absolute', background: '#FFFDFD'}}></div>
    </div>
    <div style={{width: 1309, height: 1309, left: -710, top: 724, position: 'absolute', background: 'linear-gradient(180deg, white 0%, rgba(60, 194, 239, 0.50) 100%)', boxShadow: '1000px 1000px 1000px ', filter: 'blur(1000px)'}}></div>
    <div style={{width: 1371, height: 1371, left: 1045, top: -634, position: 'absolute', background: 'linear-gradient(180deg, white 0%, rgba(181, 13, 101, 0.50) 100%)', boxShadow: '1000px 1000px 1000px ', filter: 'blur(1000px)'}}></div>
    <div style={{width: 1051, height: 1044, left: 198, top: 82, position: 'absolute'}}>
        <div style={{width: 360, height: 96, left: 343, top: 202, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 32, display: 'inline-flex'}}>
            <div style={{height: 96, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
                <div style={{textAlign: 'center', color: '#E6EAEF', fontSize: 52, fontFamily: 'Reenie Beanie', fontWeight: '500', wordWrap: 'break-word'}}>Hello, it’s me</div>
                <div style={{textAlign: 'right', color: '#E6EAEF', fontSize: 32, fontFamily: 'Reenie Beanie', fontWeight: '500', wordWrap: 'break-word'}}>- Adele</div>
            </div>
            <div style={{height: 96, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
                <div style={{textAlign: 'center', color: '#E6EAEF', fontSize: 52, fontFamily: 'Reenie Beanie', fontWeight: '500', wordWrap: 'break-word'}}>Welcome to the jungle</div>
                <div style={{color: '#E6EAEF', fontSize: 32, fontFamily: 'Reenie Beanie', fontWeight: '500', wordWrap: 'break-word'}}>- Guns N' Roses</div>
            </div>
            <div style={{height: 96, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
                <div style={{textAlign: 'center', color: '#E6EAEF', fontSize: 52, fontFamily: 'Reenie Beanie', fontWeight: '500', wordWrap: 'break-word'}}>sugar, yes please</div>
                <div style={{color: '#E6EAEF', fontSize: 32, fontFamily: 'Reenie Beanie', fontWeight: '500', wordWrap: 'break-word'}}>- Maroon 5</div>
            </div>
        </div>
        <div style={{left: 420, top: 929, position: 'absolute', textAlign: 'center', color: '#B50D65', fontSize: 28, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>share your vibe</div>
        <div style={{left: 424, top: 933, position: 'absolute', textAlign: 'center', color: '#3CC2EF', fontSize: 28, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>share your vibe</div>
        <div style={{width: 320, height: 52, left: 365, top: 648, position: 'absolute', background: '#F95337', borderRadius: 100}} />
        <div style={{width: 320, height: 52, left: 365, top: 522, position: 'absolute', background: '#E6EAEF', borderRadius: 100}} />
        <div style={{left: 457, top: 659, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 20, fontFamily: 'Quicksand', fontWeight: '700', letterSpacing: 0.20, wordWrap: 'break-word'}}>login / signup</div>
        <div style={{left: 384, top: 497, position: 'absolute', color: '#F2F2F2', fontSize: 20, fontFamily: 'Quicksand', fontWeight: '700', letterSpacing: 0.20, wordWrap: 'break-word'}}>email</div>
        <div style={{left: 422, top: 931, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 28, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>share your vibe</div>
    </div>
    <div style={{width: 184, height: 50, left: 95, top: 70, position: 'absolute'}}>
        <div style={{left: 63, top: 5, position: 'absolute', color: '#E6EAEF', fontSize: 36, fontFamily: 'Quicksand', fontWeight: '700', letterSpacing: 0.36, wordWrap: 'break-word'}}>rubato</div>
        <div style={{width: 48, height: 48, left: 0, top: 0, position: 'absolute'}} />
    </div>
</div>
    }
}


// class mainpage extends React.Component{
//     render(){
//         const email='18801482557@163.com'

//         loginWithEmail(email);
//         verifyEmailWithOtp()

//         return(
            
//         )
//     }
// }
