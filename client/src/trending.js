import './trending.css';

function TrendingBar(props)
{

    return(
        <div className = "trending_bar" style ={{width: props.width}}>
            <header className = "word_font">
                <p>
                    {props.content}
                </p>
            </header>
        </div>
    )
    
}
export default TrendingBar;