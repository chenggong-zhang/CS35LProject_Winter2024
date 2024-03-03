import './trending.css';

function TrendingBar(props)
{
    const combinedStyles = {width: props.width}
    
    return(
        <div className = "trending_bar" style ={combinedStyles}>
            <header className = "word_font">
                <p>
                    {props.content}
                </p>
            </header>
        </div>
    )
    
}
export default TrendingBar;