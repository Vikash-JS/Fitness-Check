import { BASE_URL } from "../../utils/Constants";
const GET_ADS_ENDPOINT = 'client/getAdds';
const GET_FILES_ENDPOINT = 'client/file/getClientFiles'
export const Get_Home_Adds = async (raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + GET_ADS_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_Files = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    return fetch(BASE_URL + GET_FILES_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}