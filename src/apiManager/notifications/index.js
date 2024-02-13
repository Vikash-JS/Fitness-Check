import { BASE_URL } from '../../utils/Constants';

const Fetch_Notification = 'client/notification/get-notifications'; //get
const Remove_Notification = 'client/notification/delete-notification/'; //get
const Remove_All_Notification = 'client/notification/delete-all-notifications'; //get
const Mark_As_Read = 'client/notification/update-notification/'; //put

export const GET_Notification = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    try {
        const response = await fetch(BASE_URL + Fetch_Notification, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('API Request Error:', error);
        return { error: 'API request failed' };
    }
}

export const Delete_Notification = async (val) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
    };
    try {
        const response = await fetch(BASE_URL + Remove_Notification + val, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('API remove notif', error);
        return { error: 'API request failed' };
    }
}
export const Delete_ALL_Notification = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
    };
    try {
        const response = await fetch(BASE_URL + Remove_All_Notification, requestOptions);
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('API remove notif', error);
        return { error: 'API request failed' };
    }
}

export const Mark_Notification_As_Read = async (item) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    var formdata = new FormData();
    formdata.append("isCompleted", true);
    formdata.append("notificationId", item?._id);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: formdata,
    };
    try {
        const response = await fetch(BASE_URL + Mark_As_Read, requestOptions);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('API remove notif', error);
        return { error: 'API request failed' };
    }
}