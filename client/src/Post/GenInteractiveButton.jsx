import React, { useState } from 'react';

const GenInteractiveButton = ({ name, svgPath, onClick }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleOnClick = () => {
        setIsSelected(!isSelected);
        if (onClick) {
            onClick();
        }
    };

    const fillColor = isSelected ? "#E56363" : "#241E52";

    return (
        <button className={`GenInteractiveButton ${name}`} onClick={handleOnClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path fill={fillColor} d={svgPath} />
            </svg>
        </button>
    );
};

export default GenInteractiveButton;
