import './trending.css';
import React, {useEffect, useState} from 'react';

function TrendingBar(props)
{
    
    const count = props.content; 
    const givenWidth = props.width;
    const feeling = props.id;
    return(
        <div>
            <div className = "trending_bar" style ={{width: props.width}}>
                <header className = "word_font">
                    <p>
                        {count}
                        {feeling}
                    </p>
                </header>
                
            </div> 
            <div className = "spacer"></div>
        </div>
    )
}
//<img src ={`${process.env.PUBLIC_URL}/Union.svg`} alt= "Trending emoji"></img>
export default TrendingBar;