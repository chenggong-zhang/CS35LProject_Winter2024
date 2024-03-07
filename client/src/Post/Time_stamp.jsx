import React, { useState, useEffect } from 'react';
import './Time_stamp.css';

const TimeStamp = ({ createdAt }) => {
  const [timeStamp, setTimeStamp] = useState([]);

  const updateTimeStamp = () => {
    const postDate = new Date(createdAt);
    const now = new Date();
    const differenceInHours = Math.floor((now - postDate) / (1000 * 60 * 60));

    setTimeStamp(`• ${differenceInHours}`);
  };

  useEffect(() => {
    updateTimeStamp(); // Initial update

    // Set an interval to update the time every hour
    const intervalId = setInterval(updateTimeStamp, 3600000); // 3600000ms = 1 hour

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [createdAt]); // Only rerun if createdAt changes

  return <span className="TimeStamp">{timeStamp}</span>;
};

export default TimeStamp;