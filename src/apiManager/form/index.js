import { BASE_URL } from '../../utils/Constants';

const ALL_FORM_ENDPOINT = 'client/form/all';
const FORM_DETAIL_ENDPOINT = 'client/form/get/';
const SUBMIT_FORM_ENDPOINT = 'client/submission-history/add-answer'


export const Get_All_Forms = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + ALL_FORM_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_Form_Detail = async(id,raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + FORM_DETAIL_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Submit_Form = async(raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    console.log("requestOption=====",requestOptions)
    console.log("Baseurl============",BASE_URL + SUBMIT_FORM_ENDPOINT)

    return fetch(BASE_URL + SUBMIT_FORM_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}