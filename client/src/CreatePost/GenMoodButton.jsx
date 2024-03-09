import React from "react";

const GenMoodButton = ({moodString, isSelected, onClick}) => {

    const fill = isSelected ? "#241E52" : "transparent";
    const text_color = isSelected ? "#FFFFFF" : "#241E52"

    return (
        <button 
                className={moodString} 
                onClick={onClick} 
                style={{color: text_color, background: fill, fontFamily: "QuickSand", fontWeight: "800", borderRadius: "40px", border: "2px solid #241E52", width: "120px"}}>
                
            {moodString}</button>
    );

}

export default GenMoodButton