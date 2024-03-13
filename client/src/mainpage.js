// mainpage.js

import TrendingContainer from './trendingcontainer.js';
import React, {Component, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

class Mainpage extends React.Component{
    render(){
        return(
<div style={{width: '100%', height: '100%', position: 'relative', background: '#241E52'}}>
    {
    // codes for the left side of the main page
    }
    <div style={{width: 227, height: 1136, left: 54, top: 40, position: 'absolute'}}>
        <VibeButton />
        <LogoutButton />
        <div style={{right: 20, bottom: 15, position: 'relative'}}>
            <Rubato imageSource={`${process.env.PUBLIC_URL}/rubato2 1.svg`}/>
        </div>
        <Logo />
        <div style={{left: 10, top: 140, position: 'relative'}}>
            <NavigationBar imageSource={`${process.env.PUBLIC_URL}/Union.svg`}  barName='home' />
            <div style={{marginTop: '20px'}}><NavigationBar imageSource={`${process.env.PUBLIC_URL}/Vector.svg`} barName='profile' /></div>
        </div>
        <UserDisplay name='name' handle='handle' />
    </div>
    {
        // Codes for the center part of the main page
    }
    <div style={{width: 597, height: 1176, left: 397, top: 0, position: 'absolute', mixBlendMode: 'color-dodge', background: 'black', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', border: '1px #FFFDFD solid'}}></div>
    <div> 
        {/*insert post list here */}
    </div>
    <div>
        <TrendingContainer/>
        <SearchBar/>
    </div>
</div>

        )
    }
}


function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [newUsers, setNewUsers] = useState([]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const API_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJydWJhdG8iLCJzdWIiOiI2NWU3Y2M0YjE2MTk1MGM3M2QzYTNkZjUiLCJpYXQiOjE3MTAyOTg3NTQsImV4cCI6MTcxMDI5OTM1NH0.6i3cqo4Ptr8-25KbjO7v0krBau98FooXi68Uiewibco';
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the form from causing a page reload
        console.log('Search term:', searchTerm);
        const lowerCaseKeyword = searchTerm.toLowerCase();
        setSubmitted(true);
        const getUsers = async () => {
            try {
                const response = await fetch(`http://localhost:4000/user?queryString=zhu`, {
                    method: 'GET',
                    headers: {
                        'Authorization':`bearer ${API_key}`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data.users);
                const newUsers = data.users.filter(user => user.handle.toLowerCase().includes(lowerCaseKeyword));
                setNewUsers(newUsers);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }};
        getUsers();
    };
    const handleUserClick = (username) => {
        //navigate(`/users/profile`);
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
                        {/*<p>Hello</p>*/}
                        
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <div>
                                {newUsers.map((user, index) => (
                                    <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid #ccc', color: 'white' }} onClick={() => handleUserClick(user.username)}>
                                        {user.username} 
                                        <p style = {{fontSize: '10px'}}>
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

class NavigationBar extends React.Component{
    render(){
        const {imageSource, barName} = this.props;
        return(
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                    <img style={{width: 24, height: 24, position:'absolute'}} alt='pic'src={imageSource} />
                    <div style={{marginLeft: '40px', color: '#E6EAEF', fontSize: 20, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>{barName}</div>
            </div>
        )
    }
}

class VibeButton extends React.Component{
    render(){
        return(
            <div style={{width: 132, height: 40, left: -1, top: 255, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                <div style={{width: 132, height: 40, left: 0, top: 0, position: 'absolute', background: '#F95337', borderRadius: 100}} />
                <div style={{width: 87, height: 23, left: 22, top: 9, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 18, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>vibe</div>
            </div>
        )
    }
}

class LogoutButton extends React.Component{
    render(){
        return(
            <div style={{width: 132, height: 40, left: -1, top: 1053, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
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
        const {name, handle}=this.props
        return(
            <div style={{width: 109, height: 40, left: 1, top: 988, position: 'absolute'}}>
                <div style={{left: 49, top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>{name}</div>
                <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>{handle}</div>
                <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
            </div>
        )
    }
}


export default Mainpage;
