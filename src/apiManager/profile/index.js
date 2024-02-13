import { BASE_URL } from "../../utils/Constants";

const USER_DETAIL_ENDPOINT = 'client/view-client';
const RESET_PASSWORD_ENDPOINT = 'client/reset-password/';
const PARK_QUESTION_ENDPOINT = 'client/parq/get';
const PARK_ANSWER_ENDPOINT = 'client/parq/answer';
const UPDATEPROFILE_ENDPOINT = 'client/update-client';
const UPDATEPROFILE_PHOTO_ENDPOINT = 'client/update-picture';
const GOALS_PREFERENCES_ENDPOINT = 'client/fitness/view';
const UPDATE_GOALS_PREFERENCE_ENDPOINT = 'client/fitness/update';
const GET_FOLLOWINGS_ENDPOINT = 'client/follow/all';
const GET_FOLLOWINGS_COUNT = 'client/view-follow-community-count';
const UNFOLLOW_TRAINER_ENDPOINT = 'client/follow/remove/';
const REMOVE_PROFILE_ENDPOINT = 'client/remove-picture';
const DELETE_ACCOUNT = 'client/delete-account';

export const Profile_Detail_Api = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    return fetch(BASE_URL + USER_DETAIL_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Reset_Password_Api = async (id, formdata) => {
    console.log("userId========", id, formdata)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
    };

    return fetch(BASE_URL + RESET_PASSWORD_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const PARQ_Question_Api = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + PARK_QUESTION_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const UPDATE_PARQ = async (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({ "questions": data });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + PARK_ANSWER_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const UpdateProfile = async (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,

    };

    return fetch(BASE_URL + UPDATEPROFILE_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const UpdateProilePhoto = async (formdata) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append('Content-Type', 'multipart/form-data')

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,

    };

    return fetch(BASE_URL + UPDATEPROFILE_PHOTO_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const GetGoalsPreference = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,

    };

    return fetch(BASE_URL + GOALS_PREFERENCES_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const UpdateGoalsPreference = async (raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + UPDATE_GOALS_PREFERENCE_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_Following_Count = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    return fetch(BASE_URL + GET_FOLLOWINGS_COUNT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}
export const Get_Following_List = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + GET_FOLLOWINGS_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const unFollowTrainer = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    // myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + UNFOLLOW_TRAINER_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Remove_Profile_Picture = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + REMOVE_PROFILE_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Delete_Account_Api = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
    };

    return fetch(BASE_URL + DELETE_ACCOUNT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}