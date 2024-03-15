import React from "react";

/**
 * Renders a button designed to display and select a mood. The button's appearance changes based on whether it's selected.
 *
 * @param {string} moodString - The text displayed on the button, indicating the mood it represents.
 * @param {boolean} isSelected - A flag determining the button's visual state: selected or unselected.
 * @param {function} onClick - The function to be called when the button is clicked.
 * @returns A styled button element that displays the mood and changes style based on the selection state.
 */
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