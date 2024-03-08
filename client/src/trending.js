import './trending.css';
import React, {useEffect, useState} from 'react';

function TrendingContainer(props)
{
    const [mood, setMood] = useState([]); 

    const APIkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJydWJhdG8iLCJzdWIiOiI2NWU3Y2M0YjE2MTk1MGM3M2QzYTNkZjUiLCJpYXQiOjE3MDk3NjU2MjksImV4cCI6MTcwOTc2NjIyOX0.lQzFf1_VX1b1Z-z-OAwGdvIR2JfphnUE1MWmXR2KKu0';
    useEffect(()=>{
        const getMood = async() =>{
            try{
                const response = await fetch(`http://localhost:4000/post` , {
                    method: 'GET',
                    headers:{
                      'Authorization':`Bearer ${APIkey}`
                    }
                });
                if (!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                //console.log(response);
                //const data = await response.json();
                //const count = data.moods.count;
                //setMood(count)
            } catch (error) 
            {
                console.error('Error fetching data1:', error);
            }
            }
            
        getMood();
    },[]);
    const content = "1,234 vibes";
    return( 
        <div className = "trending_container" style = {{position: 'absolute', left: '1112px'}}>
            <p style = {{fontSize: '35px', color: 'white', textAlign: 'center', fontFamily: 'Quicksand'}}>
                Trending Vibes
            </p>
            <div className = "trending_bar" style ={{width: '100%'}}>
                <header className = "word_font">
                    <p>
                        {content}
                    </p>
                </header>
                <img src ={`${process.env.PUBLIC_URL}/Union.svg`} alt= "Trending emoji"></img>
            </div> 
            <div className = "spacer"></div>
            <div className = "trending_bar" style ={{width: '80%'}}>
                <header className = "word_font">
                    <p>
                        {content}
                    </p>
                </header>
                <img src ={`${process.env.PUBLIC_URL}/Union.svg`} alt= "Trending emoji"></img>
            </div> 
            <div className = "spacer"></div>
            <div className = "trending_bar" style ={{width: '50%'}}>
                <header className = "word_font">
                    <p>
                        {content}
                    </p>
                </header>
                <img src ={`${process.env.PUBLIC_URL}/Union.svg`} alt= "Trending emoji"></img>
            </div> 
            <div className = "spacer"></div>
            <div className = "trending_bar" style ={{width: '30%'}}>
                <header className = "word_font">
                    <p>
                        {content}
                    </p>
                </header>
                <img src ={`${process.env.PUBLIC_URL}/Union.svg`} alt= "Trending emoji"></img>
            </div> 
            <div className = "spacer"></div>
            <div className = "trending_bar" style ={{width: '10%'}}>
                <header className = "word_font">
                    <p>
                        {content}
                    </p>
                </header>
                <img src ={`${process.env.PUBLIC_URL}/Union.svg`} alt= "Trending emoji"></img>
            </div> 
        </div>
        
    )
    
}
export default TrendingContainer;