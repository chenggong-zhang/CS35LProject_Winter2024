import './trending.css';
import React, {useEffect, useState} from 'react';

//creates individual trending bars taking in props to dynamically size width, count, and the id. this function is called by trending container
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
export default TrendingBar;