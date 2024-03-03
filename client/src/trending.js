import './trending.css';

function TrendingBar(props)
{
    console.log('Width:', props.width);
    const combinedStyles = {width: props.width}
    
    return(
        <div className = "trending_bar" style ={combinedStyles}>
            <header className = "word_font">
                <p>
                    {props.content}
                </p>
            </header>
            <img src ={props.imageSource} alt= "Trending emoji"></img>
        </div>
    )
    
}
export default TrendingBar;