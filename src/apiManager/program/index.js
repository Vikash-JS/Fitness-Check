import { BASE_URL } from '../../utils/Constants';

const ALL_PROGRAMS_ENDPOINT = 'client/program/all';
const MY_PROGRAMS_ENDPOINT = 'client/program/my-program';
const PROGRAM_DETAIL_ENDPOINT = 'client/program/get/';
const MARK_AS_DONE_ENDPOINT = 'client/program/mark/';
const SEARCH_ALL_PROGRAMS_ENDPOINT = 'client/program/filter-all-programs';
const SEARCH_MY_PROGRAMS_ENDPOINT = 'client/program/filter-my-programs';

export const Get_All_Programs = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + ALL_PROGRAMS_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_My_Programs = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + MY_PROGRAMS_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_Program_Detail = async (id, type) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + PROGRAM_DETAIL_ENDPOINT + id + '/' + type, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Mark_As_Done = async (raw, id) => {
    console.log("rowDataMark========",raw, id)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + MARK_AS_DONE_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Search_All_Programs = async (raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + SEARCH_ALL_PROGRAMS_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Search_My_Program = async (raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + SEARCH_MY_PROGRAMS_ENDPOINT, requestOptions)
    .then(response => response.json())
    .then(result => {
        return result
    }).catch(error => {
        return error
    });
}