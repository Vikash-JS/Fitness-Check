import { BASE_URL } from '../../utils/Constants';

const GET_EVENT_ENDPOINT = 'client/events/getEvents';

export const Get_Events = async(raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + GET_EVENT_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}