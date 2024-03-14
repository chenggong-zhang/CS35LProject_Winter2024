import './trending.css';
import React, {useEffect, useState} from 'react';

function TrendingBar(props)
{
    const { content, id, width, fontSize } = props;
    return(
        <div>
            <div className = "trending_bar" style ={{width}}>
                <header className = "word_font" style= {{fontSize}}>
                    <p>
                        {content}
                        {id}
                    </p>
                </header>
                
            </div> 
            <div className = "spacer"></div>
        </div>
    )
}
//<img src ={`${process.env.PUBLIC_URL}/Union.svg`} alt= "Trending emoji"></img>
export default TrendingBar;