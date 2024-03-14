// mainpage.js

import TrendingContainer from './trendingcontainer.js';
import React, {Component, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, getFollow } from './loginpage.js';
import axios from 'axios';
import { refreshAccessToken, logout} from './authUtil.js';
import PostList from './PostList.jsx'

class Mainpage extends React.Component{
    
    render(){
        return(
<div style={{width: '100%', height: '100vh', overflow: 'hidden', position: 'relative', background: '#241E52'}}>
    {
    // codes for the left side of the main page
    }
    <div style={{width: 227, height: 1136, left: 54, top: 40, position: 'absolute'}}>
        <VibeButton barPath = '/createpost'/>
        <LogoutButton />
        <div style={{right: 20, bottom: 15, position: 'relative'}}>
            <Rubato imageSource={`${process.env.PUBLIC_URL}/rubato2 1.svg`}/>
        </div>
        <Logo />
        <div style={{left: 10, top: 140, position: 'relative'}}>
            <NavigationBar imageSource={`${process.env.PUBLIC_URL}/Union.svg`}  barName='home' barPath = '/home' />
            <div style={{marginTop: '20px'}}><NavigationBar imageSource={`${process.env.PUBLIC_URL}/Vector.svg`} barName='profile' barPath ='/profile'/></div>
        </div>
        <UserDisplay name='name' handle='handle' />
    </div>
    <div style={{position: 'absolute', left: '375px', height: '900px', overflowY: 'scroll'}}>
        <PostList APIkey={localStorage.getItem('accessToken')}/>
            
    </div>
    <div>
        <TrendingContainer/>
        <SearchBar/>
    </div>
</div>

        )
    }
}


function SearchBar()  {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [newUsers, setNewUsers] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }; 
    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the form from causing a page reload
        console.log('Search term:', searchTerm);
        const lowerCaseKeyword = searchTerm.toLowerCase();
        setSubmitted(true);
        const getUsers = async () => {
            try {
                const API_key = localStorage.getItem('accessToken');
                if(API_key == null) {
                    throw new Error('User is not logged in')
                }
                const response = await fetch(`http://localhost:4000/user?queryString=${searchTerm}`, {
                    method: 'GET',
                    headers: {
                        'Authorization':`bearer ${API_key}`
                    }
                });
                if (!response.ok) {
                    if (response.status == 401)
                    {
                        console.log('trying to refresh access token...');
                        await refreshAccessToken();
                        getUsers();
                        return;
                    } else {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                }
                const data = await response.json();
                setUsers(data.users);
                console.log(data.users);
                const newUsers = data.users.filter(user => user.handle.toLowerCase().includes(lowerCaseKeyword));
                setNewUsers(newUsers);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }};
        getUsers();
    };

    // other's data, for testing purpose only
// retrieving user's information
    const getUser = async (userid, navigate, token) => {
        try {
            console.log('running getUser...');
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
            console.log("getUser called 1 time")
            const event = new CustomEvent('otherObjUpdated', {});
            //    console.log("event dispatched")
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

    



    const handleUserClick = async (_id) => {
        //navigate(`/users/profile`);
        const token = localStorage.getItem("accessToken");
        await getUser(_id, navigate, token);
        await getFollow(_id, navigate, token);
        const event = new CustomEvent('newProfile', {});
        console.log("newProfile dispatched")
        window.dispatchEvent(event);
        navigate('/profile');
    };
    return (
        <div style={{ position: 'relative', width: 350, height: 40, left: '1110px', top: '500px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', background: 'rgba(155,155,155,0.25)', borderRadius: 100 }}>
                <input
                    type="text"
                    placeholder="Search..."
                    style={{ flexGrow: 1, border: 'none', background: 'transparent', paddingLeft: 20, color: 'rgba(0, 0, 0, 0.85)', fontSize: 18, fontFamily: 'Quicksand' }}
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit" style={{ border: 'none', background: 'transparent', marginRight: 10 }}>
                    <img src={`${process.env.PUBLIC_URL}/Group 42.svg`} alt="Search" style={{ width: 18, height: 29 }} />
                </button>
            </form>
            <div>
                {submitted && (newUsers.length > 0 ? (
                    <>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <div>
                                {newUsers.map((user, index) => (
                                    <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid #ccc', color: 'white' }} >
                                        {user.username} 
                                        <p style = {{fontSize: '10px'}} onClick={() => handleUserClick(user._id)}>
                                            @{user.handle}
                                        </p>
                                    </li>
                                ))}
                            </div>
                        </ul>
                    </>
                ) : (
                    <p>No Results Found</p>
                ))}
            </div>
        </div>
    );
}

function NavigationBar({imageSource, barName, barPath}){
    const navigate = useNavigate();
    const _id=JSON.parse(localStorage.getItem("userObject"))._id;
    console.log(localStorage.getItem("userObject"));
    const handleUserClick = async (_id) => {
        //navigate(`/users/profile`);
        const token = localStorage.getItem("accessToken");
        // await getUser(_id, navigate, token);
        // await getFollow(_id, navigate, token);
        const event = new CustomEvent('newProfile', {});
        console.log("newProfile dispatched")
        window.dispatchEvent(event);
        if (barName="profile"){
            await getUser(_id, navigate, token);
            await getFollow(_id, navigate, token);
        }
        navigate(barPath);
    };
    return(
        <div style={{ display: 'flex', flexDirection: 'row'}}>
                <img style={{width: 24, height: 24, position:'absolute'}} alt='pic'src={imageSource} />
                <div onClick={() => handleUserClick(_id)} style={{marginLeft: '40px', color: '#E6EAEF', fontSize: 20, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>{barName}</div>
        </div>
    );
}

function VibeButton (){
    const navigate = useNavigate();
    return(
        <div style={{width: 132, height: 40, left: -1, top: 255, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <div style={{width: 132, height: 40, left: 0, top: 0, position: 'absolute', background: '#F95337', borderRadius: 100}} />
            <div onClick={() => navigate('/createpost')} style={{width: 87, height: 23, left: 22, top: 9, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 18, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>vibe</div>
        </div>
    )
    
}

class LogoutButton extends React.Component{
    render(){
        return(
            <div style={{width: 132, height: 40, left: -1, top: 700, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                <div style={{width: 132, height: 40, left: 0, top: 0, position: 'absolute', borderRadius: 100, border: '1px #F95337 solid'}} />
                <div style={{width: 87, height: 23, left: 22, top: 9, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 18, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>logout</div>
            </div>
        )
    }
}

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
            <div style={{width: 160, height: 53, left: 94, top: 10, position: 'absolute', color: '#E6EAEF', fontSize: 45, fontFamily: 'Quicksand', fontWeight: '700', letterSpacing: 0.45, wordWrap: 'break-word'}}>rubato</div>
        )
    }
}

class UserDisplay extends React.Component{
    render(){
        
        const user = JSON.parse(localStorage.getItem("userObject"));
        const name = user.username;
        const handle = user.handle;
        return(
            <div style={{width: 109, height: 40, left: 1, top: 650, position: 'absolute'}}>
                <div style={{left: 49, top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>{name}</div>
                <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 12, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>@{handle}</div>
                <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
            </div>
        )
    }
}


export default Mainpage;
