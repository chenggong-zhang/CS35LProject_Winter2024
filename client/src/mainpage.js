// mainpage.js

import TrendingContainer from './trendingcontainer.js';
import React, {Component, useEffect, useState} from 'react';

class Mainpage extends React.Component{
    render(){
      return(
        <div style={{width: '100%', height: '100%', position: 'relative', background: '#241E52'}}>
    <div style={{width: 88, height: 110, left: 50, top: 49, position: 'absolute', background: 'rgba(255, 255, 255, 0)'}}>
        <div style={{width: 57.58, height: 57.22, left: 4.55, top: 3.36, position: 'absolute', border: '10px #E6EAEF solid'}}></div>
        <div style={{width: 58.13, height: 56.43, left: 13.10, top: 9.29, position: 'absolute', border: '2px #E6EAEF solid'}}></div>
        <div style={{width: 59.97, height: 56.83, left: 19.05, top: 45.96, position: 'absolute', border: '10px #E6EAEF solid'}}></div>
        <div style={{width: 13.85, height: 30.93, left: 27.06, top: 78.08, position: 'absolute', border: '2.20px #E6EAEF solid'}}></div>
        <div style={{width: 38.21, height: 18.70, left: 48.82, top: 52.58, position: 'absolute', border: '2.20px #E6EAEF solid'}}></div>
        <div style={{width: 4.07, height: 3.60, left: 44.78, top: 74.25, position: 'absolute', background: '#FFFDFD'}}></div>
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
    const [users, setUsers] = useState([{_id: 'Waiting', count: 0},{_id: 'Waiting', count: 0},{_id: 'Waiting', count: 0},{_id: 'Waiting', count: 0},{_id: 'Waiting', count: 0}]);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the form from causing a page reload
        console.log('Search term:', searchTerm);
        setSubmitted(true);
        const getUsers = async () => {
            try {
                const response = await fetch(`http://localhost:4000/user?queryString=zhu`, {}, {
                    method: 'GET',
                    headers: {
                        'Authorization':`bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJydWJhdG8iLCJzdWIiOiI2NWU3Y2M0YjE2MTk1MGM3M2QzYTNkZjUiLCJpYXQiOjE3MDk3NjU2MjksImV4cCI6MTcwOTc2NjIyOX0.lQzFf1_VX1b1Z-z-OAwGdvIR2JfphnUE1MWmXR2KKu0`
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }};
        getUsers();
    };
    //below is test code that was written for fetching moods and filtering through the counts
    // just an example to how i planned to parse througuh usernames that get fetched
    //current issue is that i get 401 unauthorized when fetching from /user?query.... 
    // my other fetch in trendingcontainer fetching /post/moods is working fine...
    /*if (users.length < 5)
    {
        for (let i = users.length;i<5; i++)
        {
            users[i] = {_id: ' Unavailable', count: 0}
        }
    }
    // test condition if the count is not 2, dont display it
    for (let i = 0; i<users.length; i++)
    {
        if (users[i].count !== 2)
        {
            users.splice(i, 1);
        }
    }
    if (users[users.length] !== 2)
    {
        users.pop();
    }*/
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
                    <img src={`${process.env.PUBLIC_URL}/Union.svg`} alt="Search" style={{ width: 24, height: 24 }} />
                </button>
            </form>
            <div>
                {submitted && (users.length > 0 ? (
                    <>
                        {/*<p>Hello</p>*/}
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {users.map((user, index) => (
                                <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
                                    {user.count}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>No results found</p>
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