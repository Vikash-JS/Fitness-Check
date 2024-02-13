import React from 'react';
import { BASE_URL } from '../../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginConstants } from '../../screens/auth/authConstants';

const ALL_WORKOUT_ENDPOINT = 'client/workout/all';
const WORKOUT_DETAIL_ENDPOINT = 'client/workout/get/';
const MYWORKOUT_ENDPOINT = 'client/workout/my-workout';
const WORKOUT_ASSIGNY = 'client/workout/assign/';
const MYWORKOUT_DETAIL_ENDPOINT = 'client/workout/get/';
const MARK_DONE_ENDPOINT = 'client/workout/mark';
const INITIATE_CHAT = 'client/chat/create';
const GETALLCHAT_ENDPOINT = 'client/chat/getAllChats';
const UPLOAD_S3_ENDPOINT = 'client/chat/addFile';
const SEARCH_ALL_WORKOUT_ENDPOINT = 'client/workout/filter-all-workouts';
const SEARCH_MY_WORKOUT_ENDPOINT = 'client/workout/filter-my-workouts';
const EXPORT_PDF_ENDPOINT = 'client/workout/pdf/';
const WORKOUT_PROGRESS = "client/workout/get-my-workout-progress";

export const Get_All_Workouts = async () => {
    console.log("USER_TOKEN======", global.Token)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + ALL_WORKOUT_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("AllWorkoutResp----------", result)
            return result
        }).catch(error => {
            console.log('AllWorkoutError-------', error)
            return error
        });
}

export const Get_WorkoutDetail_ById = async (id) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,

    };
    return fetch(BASE_URL + WORKOUT_DETAIL_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("WorkoutDetail------------", result)
            return result
        }).catch(error => {
            console.log("WorkoutDetailErr------------", error)
            return error
        });
}

export const MyWorkout_Detail = async (id, type) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + MYWORKOUT_DETAIL_ENDPOINT + id + '/' + type, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("MyWorkOut------------", result)
            return result
        }).catch(error => {
            console.log("MyWorkOutErr------------", error)
            return error
        });
}

export const Get_My_Workout_List = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + MYWORKOUT_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("MyWorkOut------------", result)
            return result
        }).catch(error => {
            console.log("MyWorkOutErr------------", error)
            return error
        });
}

export const Get_Workout_Assigny = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + WORKOUT_ASSIGNY + id, requestOptions)
        .then(response => response.json())
        .then(result => {

            return result
        }).catch(error => {

            return error
        });
}

export const mark_as_done = async (data) => {
    console.log("finalData=======", data)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
    };

    return fetch(BASE_URL + MARK_DONE_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {

            return result
        }).catch(error => {

            return error
        });
}

export const GenerateId = async (raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    return fetch(BASE_URL + INITIATE_CHAT, requestOptions)
        .then(response => response.json())
        .then(result => {

            return result
        }).catch(error => {

            return error
        });
}

export const Get_All_ChatList = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + GETALLCHAT_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const UploadAllFiles_To_s3Bucket = async (data) => {
    console.log("s3RequestBody=========",data)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "multipart/form-data");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
    };

    return fetch(BASE_URL + UPLOAD_S3_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Search_All_Workouts = async (raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + SEARCH_ALL_WORKOUT_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Search_My_Workout = async (urlencoded) => {
    console.log("urlEncoded========",urlencoded)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };

    return fetch(BASE_URL + SEARCH_MY_WORKOUT_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Export_Pdf = async (id) => {
    console.log("exportPDFID=======",id)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
    };

    return fetch(BASE_URL + EXPORT_PDF_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

//Check workout weekly progress

export const CheckWorkoutWeeklyProgress = async (id) =>
{
    let form_data = new FormData()
    form_data.append("workoutId",id)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: form_data,
    };

    return fetch(BASE_URL + WORKOUT_PROGRESS, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log('result: ', result);
            return result
        }).catch(error => {
            return error
        });
}