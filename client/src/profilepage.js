// Navigation.js

import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const object=localStorage.getItem('userObject');
const obj=JSON.parse(object);
const username=obj.username;
const handle=obj.handle;




class Profilepage extends React.Component{
    render(){
        return(
<div style={{width: '100%', height: '100%', position: 'relative', background: '#241E52'}}>
    <div style={{width: 360, height: 70, left: 1052, top: 98, position: 'absolute'}}>
        <div style={{width: 320, height: 0, left: 20, top: 1, position: 'absolute', border: '1px rgba(230, 234, 239, 0.10) solid'}}></div>
        <div style={{left: 245, top: 25, position: 'absolute', textAlign: 'right', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '500', wordWrap: 'break-word'}}>· 978 vibes</div>
        <div style={{width: 128, height: 40, left: 13, top: 15, position: 'absolute'}}>
            <div style={{left: 49, top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>Alexa</div>
            <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>@alexa001</div>
            <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
        </div>
    </div>
    <div style={{width: 360, height: 70, left: 1052, top: 168, position: 'absolute'}}>
        <div style={{width: 320, height: 0, left: 20, top: 1, position: 'absolute', border: '1px rgba(230, 234, 239, 0.10) solid'}}></div>
        <div style={{left: 254, top: 25, position: 'absolute', textAlign: 'right', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '500', wordWrap: 'break-word'}}>· 34 vibes</div>
        <div style={{width: 88, height: 40, left: 13, top: 15, position: 'absolute'}}>
            <div style={{left: 49, top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>Benji</div>
            <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>@bnj</div>
            <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
        </div>
    </div>
    <div style={{width: 360, height: 70, left: 1052, top: 238, position: 'absolute'}}>
        <div style={{width: 320, height: 0, left: 20, top: 1, position: 'absolute', border: '1px rgba(230, 234, 239, 0.10) solid'}}></div>
        <div style={{left: 247, top: 25, position: 'absolute', textAlign: 'right', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '500', wordWrap: 'break-word'}}>· 201 vibes</div>
        <div style={{width: 120, height: 40, left: 13, top: 15, position: 'absolute'}}>
            <div style={{left: 49, top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>casey</div>
            <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>@cacylee</div>
            <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
        </div>
    </div>
    <div style={{width: 360, height: 70, left: 1052, top: 308, position: 'absolute'}}>
        <div style={{width: 320, height: 0, left: 20, top: 1, position: 'absolute', border: '1px rgba(230, 234, 239, 0.10) solid'}}></div>
        <div style={{left: 262, top: 25, position: 'absolute', textAlign: 'right', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '500', wordWrap: 'break-word'}}>· 8 vibes</div>
        <div style={{width: 105, height: 40, left: 13, top: 15, position: 'absolute'}}>
            <div style={{left: 49, top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>doug</div>
            <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>@dawg</div>
            <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
        </div>
    </div>

    <div style={{width: 227, height: 1136, left: 54, top: 40, position: 'absolute'}}>
        <VibeButton />
        <LogoutButton />
        <div style={{right: 20, bottom: 15, position: 'relative'}}>
            <Rubato imageSource={`${process.env.PUBLIC_URL}/rubato2 1.svg`}/>
        </div>
        <Logo />
        <div style={{left: 10, top: 140, position: 'relative'}}>
            <NavigationBar imageSource={`${process.env.PUBLIC_URL}/Union.svg`}  barName='home' barPath='/main'/>
            <div style={{marginTop: '20px'}}><NavigationBar imageSource={`${process.env.PUBLIC_URL}/Vector.svg`} barName='profile' barPath='/profile'/></div>
        </div>
        <UserDisplay />
    </div>






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
            <UserHandle/>
            <UserName/>
            <div style={{width: 120, height: 120, left: 42, top: 5, position: 'absolute'}}>
                <UserPic/>
            </div>  
        </div>




        
    </div>
    <div style={{width: 360, height: 338, left: 1052, top: 39, position: 'absolute'}}>
        <div style={{width: 360, height: 70, left: 0, top: 58, position: 'absolute'}}>
            <div style={{width: 320, height: 0, left: 20, top: 1, position: 'absolute', border: '1px rgba(230, 234, 239, 0.10) solid'}}></div>
            <div style={{left: 245, top: 25, position: 'absolute', textAlign: 'right', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '500', wordWrap: 'break-word'}}>· 978 vibes</div>
            <div style={{width: 128, height: 40, left: 13, top: 15, position: 'absolute'}}>
                <div style={{left: 49, top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>Alexa</div>
                <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>@alexa001</div>
                <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
            </div>
        </div>
        <div style={{width: 360, height: 70, left: 0, top: 128, position: 'absolute'}}>
            <div style={{width: 320, height: 0, left: 20, top: 1, position: 'absolute', border: '1px rgba(230, 234, 239, 0.10) solid'}}></div>
            <div style={{left: 254, top: 25, position: 'absolute', textAlign: 'right', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '500', wordWrap: 'break-word'}}>· 34 vibes</div>
            <div style={{width: 88, height: 40, left: 13, top: 15, position: 'absolute'}}>
                <div style={{left: 49, top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>Benji</div>
                <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>@bnj</div>
                <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
            </div>
        </div>
        <div style={{width: 360, height: 70, left: 0, top: 198, position: 'absolute'}}>
            <div style={{width: 320, height: 0, left: 20, top: 1, position: 'absolute', border: '1px rgba(230, 234, 239, 0.10) solid'}}></div>
            <div style={{left: 247, top: 25, position: 'absolute', textAlign: 'right', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '500', wordWrap: 'break-word'}}>· 201 vibes</div>
            <div style={{width: 120, height: 40, left: 13, top: 15, position: 'absolute'}}>
                <div style={{left: 49, top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>casey</div>
                <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>@cacylee</div>
                <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
            </div>
        </div>
        <div style={{width: 360, height: 70, left: 0, top: 268, position: 'absolute'}}>
            <div style={{width: 320, height: 0, left: 20, top: 1, position: 'absolute', border: '1px rgba(230, 234, 239, 0.10) solid'}}></div>
            <div style={{left: 262, top: 25, position: 'absolute', textAlign: 'right', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '500', wordWrap: 'break-word'}}>· 8 vibes</div>
            <div style={{width: 105, height: 40, left: 13, top: 15, position: 'absolute'}}>
                <div style={{left: 49, top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>doug</div>
                <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>@dawg</div>
                <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
            </div>
        </div>
        <div style={{width: 340, height: 35, left: 0, top: 0, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <div style={{width: 340, height: 35, left: 0, top: 0, position: 'absolute', background: 'rgba(230, 234, 239, 0.10)', borderRadius: 100}} />
            <div style={{width: 87, height: 23, left: 126, top: 7, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 18, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>Following</div>
        </div>
    </div>
    <div style={{width: 360, height: 349, left: 1052, top: 478, position: 'absolute'}}>
        <div style={{width: 360, height: 70, left: 0, top: 69, position: 'absolute'}}>
            <div style={{width: 320, height: 0, left: 20, top: 1, position: 'absolute', border: '1px rgba(230, 234, 239, 0.10) solid'}}></div>
            <div style={{left: 245, top: 25, position: 'absolute', textAlign: 'right', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '500', wordWrap: 'break-word'}}>· 978 vibes</div>
            <div style={{width: 128, height: 40, left: 13, top: 15, position: 'absolute'}}>
                <div style={{left: 49, top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>Alexa</div>
                <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>@alexa001</div>
                <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
            </div>
        </div>
        <div style={{width: 360, height: 70, left: 0, top: 139, position: 'absolute'}}>
            <div style={{width: 320, height: 0, left: 20, top: 1, position: 'absolute', border: '1px rgba(230, 234, 239, 0.10) solid'}}></div>
            <div style={{left: 254, top: 25, position: 'absolute', textAlign: 'right', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '500', wordWrap: 'break-word'}}>· 34 vibes</div>
            <div style={{width: 88, height: 40, left: 13, top: 15, position: 'absolute'}}>
                <div style={{left: 49, top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>Benji</div>
                <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>@bnj</div>
                <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
            </div>
        </div>
        <div style={{width: 360, height: 70, left: 0, top: 209, position: 'absolute'}}>
            <div style={{width: 320, height: 0, left: 20, top: 1, position: 'absolute', border: '1px rgba(230, 234, 239, 0.10) solid'}}></div>
            <div style={{left: 247, top: 25, position: 'absolute', textAlign: 'right', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '500', wordWrap: 'break-word'}}>· 201 vibes</div>
            <div style={{width: 120, height: 40, left: 13, top: 15, position: 'absolute'}}>
                <div style={{left: 49, top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>casey</div>
                <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>@cacylee</div>
                <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
            </div>
        </div>
        <div style={{width: 360, height: 70, left: 0, top: 279, position: 'absolute'}}>
            <div style={{width: 320, height: 0, left: 20, top: 1, position: 'absolute', border: '1px rgba(230, 234, 239, 0.10) solid'}}></div>
            <div style={{left: 262, top: 25, position: 'absolute', textAlign: 'right', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '500', wordWrap: 'break-word'}}>· 8 vibes</div>
            <div style={{width: 105, height: 40, left: 13, top: 15, position: 'absolute'}}>
                <div style={{left: 49, top: 0, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>doug</div>
                <div style={{left: 49, top: 20, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>@dawg</div>
                <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
            </div>
        </div>
        <div style={{width: 340, height: 35, left: 0, top: 0, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <div style={{width: 340, height: 35, left: 0, top: 0, position: 'absolute', background: 'rgba(230, 234, 239, 0.10)', borderRadius: 100}} />
            <div style={{left: 115, top: 7, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 18, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>FOLLOWERS</div>
        </div>
    </div>
</div>
        )
    }
}


function UserHandle(){
    const object=localStorage.getItem('userObject');
    const obj=JSON.parse(object);
    const handle=obj.handle;
    return(
    <div style={{left: 61, top: 164, position: 'absolute', color: '#FFFDFD', fontSize: 20, fontFamily: 'Old Standard TT', fontWeight: '400', wordWrap: 'break-word'}}>@{handle}</div>
    )
}

function UserPic(){
    let initials = getInitials(username);
    let color = generateBackground(username);
    const Alias_style = {
        position: 'absolute',
        bottom: '2px',
        display: 'flex',
        width: '180px',
        height: '180px',
        borderRadius: '100px',
        overflow: 'hidden',
        color: '#fff',
        margin: 'auto',
        background: color,
        justifyContent: 'center',
        alignItems: 'center'
    }
    return(
        <div style={Alias_style}>
            <div style={{fontSize: 100}}>{initials}</div>
        </div>
    )
}




function getInitials(name) {
    if (typeof name === 'string') {
      const names = name.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`;
      } else if (names.length === 1) {
        return names[0][0];
      }
    }
    return ''; 
  }

  function generateBackground(name) {
    let hash = 0;
    let i;
     for (i = 0; i < name.length; i += 1) {
       hash = name.charCodeAt(i) + ((hash << 5) - hash);
     } 
    let color = '#';
     for (i = 0; i < 3; i += 1) {
       const value = (hash >> (i * 8)) & 0xff;
       color += `00${value.toString(16)}`.slice(-2);
     }
     return color;
  }
  






function UserName({}){
    const token=localStorage.getItem('accessToken')
    // const refresh=localStorage.getItem('refreshToken')
    // console.log(refresh)

    const [visible, setVisible]=useState(false)
    const [name, setName]=useState(username)
    const divRef = useRef("");
    const update=()=>{
        setVisible(true)
        // console.log(divRef.current.value)
        // console.log("update")
    }
    const handleKeyPress = (event)=>{
        if (event.key==='Enter'){
          setName(divRef.current.value)
          setVisible(false)
        }
    }
    useEffect(() => {
        if (visible && divRef.current) {
            divRef.current.focus(); // Focus on the input when it becomes visible
        }
    }, [visible]); // Re-run the effect when showInput changes

    useEffect(()=>{
        if(name){
            // console.log(username)
            // console.log(handle)
            // console.log(token)
            const result=changeName(name, handle, token)
            // console.log(name)
        }
    },[name]);

    return(
        <div>
            <div onClick={()=>update()} style={{width: 260, height: 48, left: 0, top: 193, position: 'absolute', background: 'rgba(217, 217, 217, 0)', borderRadius: 40, border: '0.50px #E6EAEF dotted'}} />
            {!visible && (<div style={{width: 150, height:35, left: 45, top: 203, textAlign: 'center',position: 'absolute', color: '#FFFDFD', fontSize: 20, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>{name}</div>)}
            {visible &&  
            <input ref={divRef} onKeyDown={handleKeyPress} type='text'style={{width: 150, height:35, left: 45, top: 198, textAlign: 'center',position: 'absolute', color: '#000000', fontSize: 20, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}} defaultValue={name} ></input>}
        </div>
    );
}




const changeName = async (name, handle, token) => {
    try {
        // console.log(name)
        // console.log(handle)
        // console.log(token)
      const response = await axios.post('http://localhost:4000/user/', {
        handle: handle,
        username: name
      },  {headers: {
        'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
      }});
      if (response.data.ok) {  
        return ""; 
      } else {
        throw new Error(response.data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.log('Name change failed');
      console.log(error);
    }
  };






function NavigationBar({imageSource, barName, barPath}){
    const navigate = useNavigate();
    return(
        <div style={{ display: 'flex', flexDirection: 'row'}}>
                <img style={{width: 24, height: 24, position:'absolute'}} alt='pic'src={imageSource} />
                <div onClick={()=>navigate(barPath)} style={{marginLeft: '40px', color: '#E6EAEF', fontSize: 20, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>{barName}</div>
        </div>
    );
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

function LogoutButton(){
    const [errMess, seterrMess]=useState('');
    const token=localStorage.getItem('accessToken');
    const navigate = useNavigate();
    const logout = async (token) => {
        try {
          const response = await axios.post('http://localhost:4000/auth/logout',{},{
            headers: {
              'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
            }
          });
          if (response.data.ok) {  
            seterrMess('Sueccessfully logged out');
            navigate('/')
          } else {
            seterrMess('Unkown error occurred');
            throw new Error(response.data.error || 'Unknown error occurred');
          }
        } catch (error) {
          seterrMess('logout failed');
        }
      };

    return(
        <div style={{width: 132, height: 40, left: -1, top: 1053, position: 'absolute', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <div style={{width: 132, height: 40, left: 0, top: 0, position: 'absolute', borderRadius: 100, border: '1px #F95337 solid'}} />
            <div onClick={()=> logout(token)}style={{width: 87, height: 23, left: 22, top: 9, position: 'absolute', textAlign: 'center', color: '#E6EAEF', fontSize: 18, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>logout</div>
            {/* {errMess && <div style={{ color: 'grey' }}>{errMess}</div>} */}
        </div>
    );
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

function UserDisplay(){
    // const[name, setName]=useState('')
    // const[handle, setHandle]=useState('')
    // const token=localStorage.getItem('accessToken');
    const object=localStorage.getItem('userObject');
    const obj=JSON.parse(object);
    const handle=obj.handle;
    const username=obj.username;
    console.log(username)
    console.log(handle)
    

    return(
        <div style={{width: 109, height: 40, left: 1, top: 988, position: 'absolute'}}>
            <div style={{left: 49, top: 0, width: 200, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '700', wordWrap: 'break-word'}}>{username}</div>
            <div style={{left: 49, top: 20, width: 100, position: 'absolute', color: '#E6EAEF', fontSize: 16, fontFamily: 'Quicksand', fontWeight: '400', wordWrap: 'break-word'}}>{handle}</div>
            <div style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', background: '#E6EAEF', borderRadius: 9999}} />
        </div>
    )
    
}


export default Profilepage;
