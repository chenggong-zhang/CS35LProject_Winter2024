import './trending.css';
import TrendingBar from './trendingbar.js';
import React, {useEffect, useState} from 'react';
import { refreshAccessToken, logout} from './authUtil.js';



function TrendingContainer(props)
{
    const [mood, setMood] = useState([{_id: 'Waiting', count: 0},{_id: 'Waiting', count: 0},{_id: 'Waiting', count: 0},{_id: 'Waiting', count: 0},{_id: 'Waiting', count: 0}]);
    useEffect(()=>{
        const getMood = async() =>{
            try{
                const API_key = localStorage.getItem('accessToken');
                if(API_key == null) {
                    throw new Error('User is not logged in')
                }
                const response = await fetch(`http://localhost:4000/post/moods` , {
                    method: 'GET',
                    headers:{
                      'Authorization':`bearer ${API_key}`
                    }
                });
                if (!response.ok){
                    if (response.status == 401)
                    {
                        console.log('trying to refresh access token...');
                        await refreshAccessToken();
                        getMood();
                        return;
                    } else {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                }
                const data = await response.json();
                setMood(data.moods);
                //console.log(data.moods);
            } catch (error) 
            {
                console.error('Error fetching data1:', error);
            }
            }
        getMood();
    },[]);
    if (mood.length < 5)
    {
        for (let i = mood.length;i<5; i++)
        {
            mood[i] = {_id: ' Unavailable', count: 0}
        }
    }

    // dynamically computes the width of each bar based on the highest count
    const highestMoodCount = mood[0].count;
    if(highestMoodCount === 0) {
        mood.forEach(element => element.width = '25%');
    } else {
        for (const element of mood) {
            const ratio = element.count / highestMoodCount;

            // the width of each bar is determined by the ratio of its count to the highest count, 
            // which is then added to 25% to give a minimum width of 25%
            element.width = (ratio * 75 + 25).toFixed(2) + '%';
        }
    }
    

    return( 
        <div className = "trending_container" style = {{position: 'absolute', left: '1112px'}}>
            <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"></link>
            <p style = {{fontSize: '30px', color: 'white', textAlign: 'center', fontFamily: 'Pacifico'}}>
                TRENDING VIBES
            </p>
            <TrendingBar content = {`${mood[0].count} vibes • `} id = {mood[0]._id} width = {mood[0].width}></TrendingBar>
            <TrendingBar content = {`${mood[1].count} vibes • `} id = {mood[1]._id} width = {mood[1].width}></TrendingBar>
            <TrendingBar content = {`${mood[2].count} vibes • `} id = {mood[2]._id} width = {mood[2].width}></TrendingBar>
            <TrendingBar content = {`${mood[3].count} vibes • `} id = {mood[3]._id} width = {mood[3].width}></TrendingBar>
            <TrendingBar content = {`${mood[4].count} vibes • `} id = {mood[4]._id} width = {mood[4].width} fontSize = '13px' ></TrendingBar>
        </div> 
    )
}
export default TrendingContainer;