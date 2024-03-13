import './trending.css';
import TrendingBar from './trendingbar.js';
import React, {useEffect, useState} from 'react';


function TrendingContainer(props)
{
    const [mood, setMood] = useState([{_id: 'Waiting', count: 0},{_id: 'Waiting', count: 0},{_id: 'Waiting', count: 0},{_id: 'Waiting', count: 0},{_id: 'Waiting', count: 0}]);
    const API_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJydWJhdG8iLCJzdWIiOiI2NWU3Y2M0YjE2MTk1MGM3M2QzYTNkZjUiLCJpYXQiOjE3MTAyODgxMDcsImV4cCI6MTcxMDI4ODcwN30.VtLlBLh2FheNYJ1MdrHluwwK__s8e6Sk5ZnEyVHKkGM';
    useEffect(()=>{
        const getMood = async() =>{
            try{
                const response = await fetch(`http://localhost:4000/post/moods` , {
                    method: 'GET',
                    headers:{
                      'Authorization':`bearer ${API_key}`
                    }
                });
                if (!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
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
      
    return( 
        <div className = "trending_container" style = {{position: 'absolute', left: '1112px'}}>
            <p style = {{fontSize: '35px', color: 'white', textAlign: 'center', fontFamily: 'Quicksand'}}>
                Trending Vibes
            </p>
            <TrendingBar content = {`${mood[0].count} vibes`} id = {mood[0]._id} width = "100%"></TrendingBar>
            <TrendingBar content = {`${mood[1].count} vibes`} id = {mood[1]._id} width = "80%"></TrendingBar>
            <TrendingBar content = {`${mood[2].count} vibes`} id = {mood[2]._id} width = "50%"></TrendingBar>
            <TrendingBar content = {`${mood[3].count} vibes`} id = {mood[3]._id} width = "30%"></TrendingBar>
            <TrendingBar content = {`${mood[4].count} vibes`} id = {mood[4]._id} width = "10%"></TrendingBar>
        </div> 
    )
}
export default TrendingContainer;