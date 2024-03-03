// mainpage.js

import React from 'react';
import TrendingBar from './trending.js';

class Mainpage extends React.Component{
    render(){
        return(
<div style={{width: '100%', height: '100%', position: 'relative', background: '#241E52'}}>
    {
    // codes for the left side of the main page
    }
    <div style={{width: 227, height: 1136, left: 54, top: 40, position: 'absolute'}}>
        <VibeButton />
        <LogoutButton />
        <div style={{right: 20, bottom: 15, position: 'relative'}}>
            <Rubato imageSource={`${process.env.PUBLIC_URL}/rubato2 1.svg`}/>
        </div>
        <Logo />
        <div style={{left: 10, top: 140, position: 'relative'}}>
            <NavigationBar imageSource={`${process.env.PUBLIC_URL}/Union.svg`}  barName='home' />
            <div style={{marginTop: '20px'}}><NavigationBar imageSource={`${process.env.PUBLIC_URL}/Vector.svg`} barName='profile' /></div>
        </div>
        <UserDisplay name='name' handle='handle' />
    </div>
    {
        // Codes for the center part of the main page
    }
    <div style={{width: 597, height: 1176, left: 397, top: 0, position: 'absolute', mixBlendMode: 'color-dodge', background: 'black', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', border: '1px #FFFDFD solid'}}></div>
    <div style={{width: 556, height: 671, left: 424, top: 123, position: 'absolute'}}>
        <div style={{width: 556, height: 671, left: 0, top: 0, position: 'absolute'}} />
        <div style={{width: 448, height: 3, left: 54, top: 397, position: 'absolute', background: '#FFFDFD'}} />
        <div style={{width: 327, height: 64, left: 112, top: 440, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <div style={{width: 327, height: 64, left: 0, top: 0, position: 'absolute', background: '#F95337', borderRadius: 100}} />
            <div style={{width: 87, height: 23, left: 120, top: 21, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 18, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>Past Post</div>
        </div>
        <div style={{width: 327, height: 64, left: 112, top: 543, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <div style={{width: 327, height: 64, left: 0, top: 0, position: 'absolute', background: '#F95337', borderRadius: 100}} />
            <div style={{width: 87, height: 23, left: 120, top: 21, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 18, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>Past Post2 </div>
        </div>
        <div style={{width: 367, height: 37, left: 94, top: 317, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <div style={{width: 367, height: 37, left: 0, top: 0, position: 'absolute', background: '#37CAF9', borderRadius: 100}} />
            <div style={{width: 87, height: 23, left: 140, top: 8, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 18, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>Follow</div>
        </div>
        <div style={{width: 260, height: 241, left: 148, top: 60, position: 'absolute'}}>
            <div style={{left: 45, top: 196, position: 'absolute', color: '#FFFDFD', fontSize: 30, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>User_name</div>
            <div style={{left: 61, top: 164, position: 'absolute', color: '#FFFDFD', fontSize: 20, fontFamily: 'Old Standard TT', fontWeight: '400', wordWrap: 'break-word'}}>@User_handle</div>
            <div style={{width: 260, height: 48, left: 0, top: 193, position: 'absolute', background: 'rgba(217, 217, 217, 0)', borderRadius: 40, border: '0.50px #E6EAEF dotted'}} />
            <div style={{width: 120, height: 120, left: 67, top: 20, position: 'absolute'}}>
                <div style={{width: 100, height: 99.91, left: 10, top: 10, position: 'absolute', background: '#E6EAEF'}}></div>
            </div>
            <div style={{width: 160, height: 160, left: 50, top: 0, position: 'absolute', background: 'rgba(217, 217, 217, 0)', borderRadius: 9999, border: '3px #E6EAEF solid'}} />
        </div>
    </div>
    <div>
        
        <div style ={{position: 'absolute', marginTop: '100px', marginLeft: '-70px'}}>
            <p style ={{position: 'absolute', color: 'white',fontSize: '35px', textAlign: 'Right', right: '40px', marginTop: '-65px', marginBottom:'15px'}}>
                Trending Vibes
            </p>
            <div className = "trending_container">
                <TrendingBar content = "1,233 vibes" width = "80%" imageSource={`${process.env.PUBLIC_URL}/Union.svg`}/> 
            </div>
            <div className = "trending_container"> 
                <TrendingBar content = "792 vibes"  width = "65%" imageSource={`${process.env.PUBLIC_URL}/Union.svg`}/>
            </div>
            <div className = "trending_container"> 
                <TrendingBar content = "456 vibes"  width = "50%" imageSource={`${process.env.PUBLIC_URL}/Union.svg`}/>
            </div>
            <div className = "trending_container"> 
                <TrendingBar content = "102 vibes"  width = "12.5%" imageSource={`${process.env.PUBLIC_URL}/Union.svg`}/>
            </div>
            <div className = "trending_container"> 
                <TrendingBar content = "70 vibes"  width = "1%" imageSource={`${process.env.PUBLIC_URL}/Union.svg`}/>
            </div>
        </div>
    </div>
</div>

        )
    }
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
