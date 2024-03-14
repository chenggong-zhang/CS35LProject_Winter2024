import axios from 'axios';

async function refreshAccessToken() {
    try {
        const refreshToken = localStorage.getItem('refreshToken');

        // check if user is logged in (refresh token exists) in local storage
        if (!refreshToken) {
            throw new Error('No refresh token found in local storage - User is not logged in');
        }

        // send refresh token to server to get new access token
        const response = await axios.get(`http://localhost:4000/auth/token?refreshToken=${refreshToken}`);

        // check if server response fails
        if (response.status == 500) {
            // log local user out if server response is 500
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            throw new Error(response.data.error);
        }

        // save new access token in local storage
        localStorage.setItem('accessToken', response.data.accessToken);
        
    } catch (error) {
        console.log('Error refreshing access token:', error);
    }
}

async function logout() {
    try {
        const API_key = localStorage.getItem('accessToken');
        if(API_key == null) {
            throw new Error('User is not logged in')
        }

        const response = await fetch(`http://localhost:4000/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization':`bearer ${API_key}`
            }
        });

        // check if server response fails
        if (response.status == 500) {
            // log local user out if server response is 500
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            throw new Error(response.data.error);
        }

        if(response.status == 401) {
            console.log('trying to refresh access token...');
            // try to refresh access token if server response is 401
            await refreshAccessToken();
            logout();
            return;
        }

        // remove access and refresh tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    } catch (error) {
        console.log('Error logging out:', error);
    }
}   

export {
    refreshAccessToken,
    logout
}