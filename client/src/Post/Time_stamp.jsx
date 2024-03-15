import React, { useState, useEffect } from 'react';
import './Time_stamp.css';

/**
 * Generates a time-stamp that represents the elapsed time in hours since the 'createdAt' moment.
 *
 * @param {Date} createdAt The original date and time when the content was created.
 * @returns a functional component called TimeStamp that displays the calculated time-stamp in hours.
 */

const TimeStamp = ({ createdAt }) => {
  const [timeStamp, setTimeStamp] = useState([]);
  /**
   * Calculates the time difference in hours between the current time and the post creation time.
   * Then, updates the timeStamp state with the formatted string displaying this difference.
   */
  const updateTimeStamp = () => {
    const postDate = new Date(createdAt);
    const now = new Date();
    const differenceInHours = Math.floor((now - postDate) / (1000 * 60 * 60));

    setTimeStamp(`• ${differenceInHours}`);
  };
  /**
   * Sets up an interval to periodically update the time stamp, reflecting the time elapsed since the creation of a post.
   * The interval is cleared when the component unmounts to prevent memory leaks.
   */
  useEffect(() => {
    updateTimeStamp(); 

    const intervalId = setInterval(updateTimeStamp, 3600000); 

    return () => clearInterval(intervalId);
  }, [createdAt]); 

  return <span className="TimeStamp">{timeStamp} h</span>;
};

export default TimeStamp;