import React from 'react';

const GenInteractiveButton = ({ name, svgPath, onClick , isSelected, count}) => {

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
