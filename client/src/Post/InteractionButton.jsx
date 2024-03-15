import React from "react";
import './InteractionButton.css'
import './GenInteractiveButton'
import GenInteractiveButton from "./GenInteractiveButton";
import { refreshAccessToken } from '../authUtil.js';

/**
* A subcomponent to the post, a collection of 6 different interaction buttons
*
* @param {Object} inters a state variable that is passed from the post to record the counts of the corresponding interactions
* @param {function} setInters a state function setter from useState hook that is passed from the post to update dynamically the interaction counts
* @param {string} PID a string that represents the ID of the Post; used to retrieve backend data
* @param {string} userID a string that represents the id of the user, to mark the current user's interaction in server record
* @returns a string that represents the intial of the username
*/
const InteractionButton = ({inters, setInter, PID , userID}) => {

  /**
  * interact with the server data base to update user's request to interact with a post
  *
  * @param type a string that indicates which button was clicked
  * @returns this method does not return anything besides updating backend data
  */
  const updateBackend = async (type) => {
    const payload = JSON.stringify({reaction: type});
    try {
        const API_key = localStorage.getItem('accessToken');
        if(API_key == null) {
            throw new Error('User is not logged in')
        }
        const response = await fetch(`http://localhost:4000/post/${PID}/reaction`, {
            method: 'POST',
            headers:{
              'Authorization': `bearer ${API_key}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: payload
        });
        if (!response.ok) {
          if (response.status == 401) {
            console.log('trying to refresh access token...');
            await refreshAccessToken();
            updateBackend();
            return;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const data = await response.json();
        // access userID
        setInter({
          like: { count: data.post.like_by.length, isSelected: data.post.like_by.includes(userID)},
          handshake: { count: data.post.handshake_by.length, isSelected: data.post.handshake_by.includes(userID)},
          fire: { count: data.post.fire_by.length, isSelected: data.post.fire_by.includes(userID)},
          sad: { count: data.post.sad_by.length, isSelected: data.post.sad_by.includes(userID)},
          lol: { count: data.post.lol_by.length, isSelected: data.post.lol_by.includes(userID)},
          gg: { count: data.post.gg_by.length, isSelected: data.post.gg_by.includes(userID)}
        });

        if (!response.ok) {
          if (response.status == 401)
          {
              console.log('trying to refresh access token...');
              await refreshAccessToken();
              updateBackend();
              return;
          } else {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
      }
    } catch (error) {
        console.error('Failed to update interaction:', error);
    };
  };

/**
* Defined as a method to generate interaction button by taking prop specification
*
* @param type a string of the user Public name
* @param svgPath a string that manipulates the shape of the button
* @returns a Generic interactive button with specified features dictated by the props
*/
const renderButton = (type, svgPath) => (
  <GenInteractiveButton
      name={`${type}Button`}
      svgPath={svgPath}
      onClick={() => updateBackend(type)}
      isSelected={inters[type].isSelected}
  />
);


  return (
    <div className="InteractionButton">
        {renderButton('like', 'M16 23.3333C17.5111 23.3333 18.8833 22.9056 20.1166 22.05C21.35 21.1944 22.2444 20.0667 22.8 18.6667H9.19996C9.75552 20.0667 10.65 21.1944 11.8833 22.05C13.1166 22.9056 14.4888 23.3333 16 23.3333ZM10.4 14.6667L11.8666 13.2667L13.2666 14.6667L14.6666 13.2667L11.8666 10.4L8.99996 13.2667L10.4 14.6667ZM18.7333 14.6667L20.1333 13.2667L21.6 14.6667L23 13.2667L20.1333 10.4L17.3333 13.2667L18.7333 14.6667ZM16 29.3333C14.1555 29.3333 12.4222 28.9833 10.8 28.2833C9.17774 27.5833 7.76663 26.6333 6.56663 25.4333C5.36663 24.2333 4.41663 22.8222 3.71663 21.2C3.01663 19.5778 2.66663 17.8444 2.66663 16C2.66663 14.1556 3.01663 12.4222 3.71663 10.8C4.41663 9.17778 5.36663 7.76666 6.56663 6.56666C7.76663 5.36666 9.17774 4.41666 10.8 3.71666C12.4222 3.01666 14.1555 2.66666 16 2.66666C17.8444 2.66666 19.5777 3.01666 21.2 3.71666C22.8222 4.41666 24.2333 5.36666 25.4333 6.56666C26.6333 7.76666 27.5833 9.17778 28.2833 10.8C28.9833 12.4222 29.3333 14.1556 29.3333 16C29.3333 17.8444 28.9833 19.5778 28.2833 21.2C27.5833 22.8222 26.6333 24.2333 25.4333 25.4333C24.2333 26.6333 22.8222 27.5833 21.2 28.2833C19.5777 28.9833 17.8444 29.3333 16 29.3333ZM16 26.6667C18.9777 26.6667 21.5 25.6333 23.5666 23.5667C25.6333 21.5 26.6666 18.9778 26.6666 16C26.6666 13.0222 25.6333 10.5 23.5666 8.43333C21.5 6.36666 18.9777 5.33333 16 5.33333C13.0222 5.33333 10.5 6.36666 8.43329 8.43333C6.36663 10.5 5.33329 13.0222 5.33329 16C5.33329 18.9778 6.36663 21.5 8.43329 23.5667C10.5 25.6333 13.0222 26.6667 16 26.6667Z')}
        {renderButton('handshake', 'M15.8333 26.6667C15.9222 26.6667 16.0111 26.6444 16.0999 26.6C16.1888 26.5556 16.2555 26.5111 16.2999 26.4667L27.2333 15.5333C27.4999 15.2667 27.6944 14.9667 27.8166 14.6333C27.9388 14.3 27.9999 13.9667 27.9999 13.6333C27.9999 13.2778 27.9388 12.9389 27.8166 12.6167C27.6944 12.2944 27.4999 12.0111 27.2333 11.7667L21.5666 6.1C21.3222 5.83333 21.0388 5.63889 20.7166 5.51666C20.3944 5.39444 20.0555 5.33333 19.6999 5.33333C19.3666 5.33333 19.0333 5.39444 18.6999 5.51666C18.3666 5.63889 18.0666 5.83333 17.7999 6.1L17.4333 6.46666L19.8999 8.96666C20.2333 9.27777 20.4777 9.63333 20.6333 10.0333C20.7888 10.4333 20.8666 10.8556 20.8666 11.3C20.8666 12.2333 20.5499 13.0167 19.9166 13.65C19.2833 14.2833 18.4999 14.6 17.5666 14.6C17.1222 14.6 16.6944 14.5222 16.2833 14.3667C15.8722 14.2111 15.5111 13.9778 15.1999 13.6667L12.6999 11.2L6.86661 17.0333C6.79995 17.1 6.74995 17.1722 6.71661 17.25C6.68328 17.3278 6.66661 17.4111 6.66661 17.5C6.66661 17.6778 6.73328 17.8389 6.86661 17.9833C6.99995 18.1278 7.1555 18.2 7.33328 18.2C7.42217 18.2 7.51106 18.1778 7.59995 18.1333C7.68883 18.0889 7.7555 18.0444 7.79995 18L12.3333 13.4667L14.1999 15.3333L9.69995 19.8667C9.63328 19.9333 9.58328 20.0056 9.54995 20.0833C9.51661 20.1611 9.49995 20.2444 9.49995 20.3333C9.49995 20.5111 9.56661 20.6667 9.69995 20.8C9.83328 20.9333 9.98883 21 10.1666 21C10.2555 21 10.3444 20.9778 10.4333 20.9333C10.5222 20.8889 10.5888 20.8444 10.6333 20.8L15.1666 16.3L17.0333 18.1667L12.5333 22.7C12.4666 22.7444 12.4166 22.8111 12.3833 22.9C12.3499 22.9889 12.3333 23.0778 12.3333 23.1667C12.3333 23.3444 12.3999 23.5 12.5333 23.6333C12.6666 23.7667 12.8222 23.8333 12.9999 23.8333C13.0888 23.8333 13.1722 23.8167 13.2499 23.7833C13.3277 23.75 13.3999 23.7 13.4666 23.6333L17.9999 19.1333L19.8666 21L15.3333 25.5333C15.2666 25.6 15.2166 25.6722 15.1833 25.75C15.1499 25.8278 15.1333 25.9111 15.1333 26C15.1333 26.1778 15.2055 26.3333 15.3499 26.4667C15.4944 26.6 15.6555 26.6667 15.8333 26.6667ZM15.7999 29.3333C14.9777 29.3333 14.2499 29.0611 13.6166 28.5167C12.9833 27.9722 12.6111 27.2889 12.4999 26.4667C11.7444 26.3556 11.1111 26.0444 10.5999 25.5333C10.0888 25.0222 9.77772 24.3889 9.66661 23.6333C8.91106 23.5222 8.28328 23.2056 7.78328 22.6833C7.28328 22.1611 6.97772 21.5333 6.86661 20.8C6.02217 20.6889 5.33328 20.3222 4.79995 19.7C4.26661 19.0778 3.99995 18.3444 3.99995 17.5C3.99995 17.0556 4.08328 16.6278 4.24995 16.2167C4.41661 15.8056 4.6555 15.4444 4.96661 15.1333L12.6999 7.43333L17.0666 11.8C17.1111 11.8667 17.1777 11.9167 17.2666 11.95C17.3555 11.9833 17.4444 12 17.5333 12C17.7333 12 17.8999 11.9389 18.0333 11.8167C18.1666 11.6944 18.2333 11.5333 18.2333 11.3333C18.2333 11.2444 18.2166 11.1556 18.1833 11.0667C18.1499 10.9778 18.0999 10.9111 18.0333 10.8667L13.2666 6.1C13.0222 5.83333 12.7388 5.63889 12.4166 5.51666C12.0944 5.39444 11.7555 5.33333 11.3999 5.33333C11.0666 5.33333 10.7333 5.39444 10.3999 5.51666C10.0666 5.63889 9.76661 5.83333 9.49995 6.1L4.79995 10.8333C4.59995 11.0333 4.43328 11.2667 4.29995 11.5333C4.16661 11.8 4.07772 12.0667 4.03328 12.3333C3.98884 12.6 3.98884 12.8722 4.03328 13.15C4.07772 13.4278 4.16661 13.6889 4.29995 13.9333L2.36661 15.8667C1.98884 15.3556 1.71106 14.7944 1.53328 14.1833C1.3555 13.5722 1.28884 12.9556 1.33328 12.3333C1.37772 11.7111 1.53328 11.1056 1.79995 10.5167C2.06661 9.92777 2.43328 9.4 2.89995 8.93333L7.59995 4.23333C8.13328 3.72222 8.72772 3.33333 9.38328 3.06666C10.0388 2.8 10.7111 2.66666 11.3999 2.66666C12.0888 2.66666 12.7611 2.8 13.4166 3.06666C14.0722 3.33333 14.6555 3.72222 15.1666 4.23333L15.5333 4.6L15.8999 4.23333C16.4333 3.72222 17.0277 3.33333 17.6833 3.06666C18.3388 2.8 19.0111 2.66666 19.6999 2.66666C20.3888 2.66666 21.0611 2.8 21.7166 3.06666C22.3722 3.33333 22.9555 3.72222 23.4666 4.23333L29.0999 9.86666C29.6111 10.3778 29.9999 10.9667 30.2666 11.6333C30.5333 12.3 30.6666 12.9778 30.6666 13.6667C30.6666 14.3556 30.5333 15.0278 30.2666 15.6833C29.9999 16.3389 29.6111 16.9222 29.0999 17.4333L18.1666 28.3333C17.8555 28.6444 17.4944 28.8889 17.0833 29.0667C16.6722 29.2444 16.2444 29.3333 15.7999 29.3333Z')}
        {renderButton('fire', 'M7.99998 18.6667C7.99998 19.8222 8.23331 20.9167 8.69998 21.95C9.16665 22.9833 9.83331 23.8889 10.7 24.6667C10.6778 24.5556 10.6666 24.4556 10.6666 24.3667V24.0667C10.6666 23.3556 10.8 22.6889 11.0666 22.0667C11.3333 21.4444 11.7222 20.8778 12.2333 20.3667L16 16.6667L19.7666 20.3667C20.2778 20.8778 20.6666 21.4444 20.9333 22.0667C21.2 22.6889 21.3333 23.3556 21.3333 24.0667V24.3667C21.3333 24.4556 21.3222 24.5556 21.3 24.6667C22.1666 23.8889 22.8333 22.9833 23.3 21.95C23.7666 20.9167 24 19.8222 24 18.6667C24 17.5556 23.7944 16.5056 23.3833 15.5167C22.9722 14.5278 22.3778 13.6444 21.6 12.8667C21.1555 13.1556 20.6889 13.3722 20.2 13.5167C19.7111 13.6611 19.2111 13.7333 18.7 13.7333C17.3222 13.7333 16.1278 13.2778 15.1166 12.3667C14.1055 11.4556 13.5222 10.3333 13.3666 9C12.5 9.73333 11.7333 10.4944 11.0666 11.2833C10.4 12.0722 9.83887 12.8722 9.38331 13.6833C8.92776 14.4944 8.58331 15.3222 8.34998 16.1667C8.11665 17.0111 7.99998 17.8444 7.99998 18.6667ZM16 20.4L14.1 22.2667C13.8555 22.5111 13.6666 22.7889 13.5333 23.1C13.4 23.4111 13.3333 23.7333 13.3333 24.0667C13.3333 24.7778 13.5944 25.3889 14.1166 25.9C14.6389 26.4111 15.2666 26.6667 16 26.6667C16.7333 26.6667 17.3611 26.4111 17.8833 25.9C18.4055 25.3889 18.6666 24.7778 18.6666 24.0667C18.6666 23.7111 18.6 23.3833 18.4666 23.0833C18.3333 22.7833 18.1444 22.5111 17.9 22.2667L16 20.4ZM16 4V8.4C16 9.15556 16.2611 9.78889 16.7833 10.3C17.3055 10.8111 17.9444 11.0667 18.7 11.0667C19.1 11.0667 19.4722 10.9833 19.8166 10.8167C20.1611 10.65 20.4666 10.4 20.7333 10.0667L21.3333 9.33333C22.9778 10.2667 24.2778 11.5667 25.2333 13.2333C26.1889 14.9 26.6666 16.7111 26.6666 18.6667C26.6666 21.6444 25.6333 24.1667 23.5666 26.2333C21.5 28.3 18.9778 29.3333 16 29.3333C13.0222 29.3333 10.5 28.3 8.43331 26.2333C6.36665 24.1667 5.33331 21.6444 5.33331 18.6667C5.33331 15.8 6.29442 13.0778 8.21665 10.5C10.1389 7.92222 12.7333 5.75556 16 4Z')}
        {renderButton('sad', 'M8.33335 21.3333H10.3334V21C10.3334 19.4222 10.8834 18.0833 11.9834 16.9833C13.0834 15.8833 14.4222 15.3333 16 15.3333C17.5778 15.3333 18.9167 15.8833 20.0167 16.9833C21.1167 18.0833 21.6667 19.4222 21.6667 21V21.3333H23.6667V21C23.6667 18.8667 22.9222 17.0556 21.4334 15.5667C19.9445 14.0778 18.1334 13.3333 16 13.3333C13.8667 13.3333 12.0556 14.0778 10.5667 15.5667C9.0778 17.0556 8.33335 18.8667 8.33335 21V21.3333ZM9.46669 12.3333C10.3778 12.2 11.3389 11.8444 12.35 11.2667C13.3611 10.6889 14.1667 10.0333 14.7667 9.3L13.2334 8.03333C12.7889 8.56666 12.1722 9.05555 11.3834 9.5C10.5945 9.94444 9.86669 10.2222 9.20002 10.3333L9.46669 12.3333ZM22.5334 12.3333L22.8 10.3333C22.1334 10.2222 21.4056 9.94444 20.6167 9.5C19.8278 9.05555 19.2111 8.56666 18.7667 8.03333L17.2334 9.3C17.8334 10.0333 18.6389 10.6889 19.65 11.2667C20.6611 11.8444 21.6222 12.2 22.5334 12.3333ZM16 29.3333C14.1556 29.3333 12.4222 28.9833 10.8 28.2833C9.1778 27.5833 7.76669 26.6333 6.56669 25.4333C5.36669 24.2333 4.41669 22.8222 3.71669 21.2C3.01669 19.5778 2.66669 17.8444 2.66669 16C2.66669 14.1556 3.01669 12.4222 3.71669 10.8C4.41669 9.17777 5.36669 7.76666 6.56669 6.56666C7.76669 5.36666 9.1778 4.41666 10.8 3.71666C12.4222 3.01666 14.1556 2.66666 16 2.66666C17.8445 2.66666 19.5778 3.01666 21.2 3.71666C22.8222 4.41666 24.2334 5.36666 25.4334 6.56666C26.6334 7.76666 27.5834 9.17777 28.2834 10.8C28.9834 12.4222 29.3334 14.1556 29.3334 16C29.3334 17.8444 28.9834 19.5778 28.2834 21.2C27.5834 22.8222 26.6334 24.2333 25.4334 25.4333C24.2334 26.6333 22.8222 27.5833 21.2 28.2833C19.5778 28.9833 17.8445 29.3333 16 29.3333ZM16 26.6667C18.9778 26.6667 21.5 25.6333 23.5667 23.5667C25.6334 21.5 26.6667 18.9778 26.6667 16C26.6667 13.0222 25.6334 10.5 23.5667 8.43333C21.5 6.36666 18.9778 5.33333 16 5.33333C13.0222 5.33333 10.5 6.36666 8.43335 8.43333C6.36669 10.5 5.33335 13.0222 5.33335 16C5.33335 18.9778 6.36669 21.5 8.43335 23.5667C10.5 25.6333 13.0222 26.6667 16 26.6667Z')}
        {renderButton('lol', 'M10.6667 16V18.6667C10.6667 20.1333 11.1889 21.3889 12.2334 22.4333C13.2778 23.4778 14.5334 24 16 24C17.4667 24 18.7222 23.4778 19.7667 22.4333C20.8111 21.3889 21.3334 20.1333 21.3334 18.6667V16H10.6667ZM16 22C15.0667 22 14.2778 21.6778 13.6334 21.0333C12.9889 20.3889 12.6667 19.6 12.6667 18.6667V18H19.3334V18.6667C19.3334 19.6 19.0111 20.3889 18.3667 21.0333C17.7222 21.6778 16.9334 22 16 22ZM11.3334 9.33333C10.4889 9.33333 9.73891 9.63889 9.08335 10.25C8.4278 10.8611 7.96669 11.7 7.70002 12.7667L9.63335 13.2333C9.76669 12.6556 9.98891 12.1944 10.3 11.85C10.6111 11.5056 10.9556 11.3333 11.3334 11.3333C11.7111 11.3333 12.0556 11.5056 12.3667 11.85C12.6778 12.1944 12.9 12.6556 13.0334 13.2333L14.9667 12.7667C14.7 11.7 14.2389 10.8611 13.5834 10.25C12.9278 9.63889 12.1778 9.33333 11.3334 9.33333ZM20.6667 9.33333C19.8222 9.33333 19.0722 9.63889 18.4167 10.25C17.7611 10.8611 17.3 11.7 17.0334 12.7667L18.9667 13.2333C19.1 12.6556 19.3222 12.1944 19.6334 11.85C19.9445 11.5056 20.2889 11.3333 20.6667 11.3333C21.0445 11.3333 21.3889 11.5056 21.7 11.85C22.0111 12.1944 22.2334 12.6556 22.3667 13.2333L24.3 12.7667C24.0334 11.7 23.5722 10.8611 22.9167 10.25C22.2611 9.63889 21.5111 9.33333 20.6667 9.33333ZM16 29.3333C14.1556 29.3333 12.4222 28.9833 10.8 28.2833C9.1778 27.5833 7.76669 26.6333 6.56669 25.4333C5.36669 24.2333 4.41669 22.8222 3.71669 21.2C3.01669 19.5778 2.66669 17.8444 2.66669 16C2.66669 14.1556 3.01669 12.4222 3.71669 10.8C4.41669 9.17778 5.36669 7.76666 6.56669 6.56666C7.76669 5.36666 9.1778 4.41666 10.8 3.71666C12.4222 3.01666 14.1556 2.66666 16 2.66666C17.8445 2.66666 19.5778 3.01666 21.2 3.71666C22.8222 4.41666 24.2334 5.36666 25.4334 6.56666C26.6334 7.76666 27.5834 9.17778 28.2834 10.8C28.9834 12.4222 29.3334 14.1556 29.3334 16C29.3334 17.8444 28.9834 19.5778 28.2834 21.2C27.5834 22.8222 26.6334 24.2333 25.4334 25.4333C24.2334 26.6333 22.8222 27.5833 21.2 28.2833C19.5778 28.9833 17.8445 29.3333 16 29.3333ZM16 26.6667C18.9778 26.6667 21.5 25.6333 23.5667 23.5667C25.6334 21.5 26.6667 18.9778 26.6667 16C26.6667 13.0222 25.6334 10.5 23.5667 8.43333C21.5 6.36666 18.9778 5.33333 16 5.33333C13.0222 5.33333 10.5 6.36666 8.43335 8.43333C6.36669 10.5 5.33335 13.0222 5.33335 16C5.33335 18.9778 6.36669 21.5 8.43335 23.5667C10.5 25.6333 13.0222 26.6667 16 26.6667Z')}
        {renderButton('gg', 'M16 18C14.4889 18 13.1167 18.4278 11.8834 19.2833C10.65 20.1389 9.75558 21.2667 9.20002 22.6667H22.8C22.2445 21.2667 21.35 20.1389 20.1167 19.2833C18.8834 18.4278 17.5111 18 16 18ZM10.4 16L11.8667 14.6L13.2667 16L14.6667 14.6L13.2667 13.2L14.6667 11.7333L13.2667 10.3333L11.8667 11.7333L10.4 10.3333L9.00002 11.7333L10.4 13.2L9.00002 14.6L10.4 16ZM18.7334 16L20.1334 14.6L21.6 16L23 14.6L21.6 13.2L23 11.7333L21.6 10.3333L20.1334 11.7333L18.7334 10.3333L17.3334 11.7333L18.7334 13.2L17.3334 14.6L18.7334 16ZM16 29.3333C14.1556 29.3333 12.4222 28.9833 10.8 28.2833C9.1778 27.5833 7.76669 26.6333 6.56669 25.4333C5.36669 24.2333 4.41669 22.8222 3.71669 21.2C3.01669 19.5778 2.66669 17.8444 2.66669 16C2.66669 14.1556 3.01669 12.4222 3.71669 10.8C4.41669 9.17778 5.36669 7.76666 6.56669 6.56666C7.76669 5.36666 9.1778 4.41666 10.8 3.71666C12.4222 3.01666 14.1556 2.66666 16 2.66666C17.8445 2.66666 19.5778 3.01666 21.2 3.71666C22.8222 4.41666 24.2334 5.36666 25.4334 6.56666C26.6334 7.76666 27.5834 9.17778 28.2834 10.8C28.9834 12.4222 29.3334 14.1556 29.3334 16C29.3334 17.8444 28.9834 19.5778 28.2834 21.2C27.5834 22.8222 26.6334 24.2333 25.4334 25.4333C24.2334 26.6333 22.8222 27.5833 21.2 28.2833C19.5778 28.9833 17.8445 29.3333 16 29.3333ZM16 26.6667C18.9778 26.6667 21.5 25.6333 23.5667 23.5667C25.6334 21.5 26.6667 18.9778 26.6667 16C26.6667 13.0222 25.6334 10.5 23.5667 8.43333C21.5 6.36666 18.9778 5.33333 16 5.33333C13.0222 5.33333 10.5 6.36666 8.43335 8.43333C6.36669 10.5 5.33335 13.0222 5.33335 16C5.33335 18.9778 6.36669 21.5 8.43335 23.5667C10.5 25.6333 13.0222 26.6667 16 26.6667Z')}
    </div>
  );
};

export default InteractionButton;

