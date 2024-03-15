import React from 'react';

/**
* Extracts the name initials based on the Public name of a user
*
* @param {string} name a string of the name of the button, e.g. like, handshake, etc.
* @param {string} svgPath a string that is an svg path to determine the shape of the button
* @param {Object} onClick a prop that handles button click and calls the update of backend and frontend information
* @param {boolean} isSelected a boolean that labels whether a button is selected and thus toggle highlighting
* @returns an interactive button of different shape
*/
const GenInteractiveButton = ({ name, svgPath, onClick , isSelected }) => {

    const fillColor = isSelected ? "#E56363" : "#241E52";

    return (
        <button className={`${name}`} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path fill={fillColor} d={svgPath} />
            </svg>
        </button>
    );
};

export default GenInteractiveButton;

