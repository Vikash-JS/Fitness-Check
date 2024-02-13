import React from 'react';
import { BASE_URL } from '../../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGIN_ENDPOINT = "client/login";
const SIGNUP_ENDPOINT = "client/register-client";
const FORGET_PASSWORD_ENDPOINT = "client/forget-password-client";
const CLIENT_ONBOARDING = 'client/onboarding';
const TODAY_SCHEDULE = 'client/events/todaySchedule';
const GOOGLE_SIGNIN_ENDPOINT = 'client/google-login';
const VERIFY_OTP = 'client/reset-password-verify-email';

export const Login_Request = async (email, password) => {
    var myHeaders = new Headers();
    //  myHeaders.append("Authorization", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");
    let FCM
    await AsyncStorage.getItem('@FCM_TOKEN').then(val => {
        FCM = val
        console.log(FCM, 'FCM')
    })
    var formdata = new FormData();
    var lowerCaseemail = email.toLowerCase()
    formdata.append("email", lowerCaseemail);
    formdata.append("password", password);
    formdata.append("deviceToken", FCM);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
    };
    console.log(formdata, 'formdata')
    return fetch(BASE_URL + LOGIN_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("NewSignupResp----------", result)
            return result
        }).catch(error => {
            console.log('error', error)
            return error
        });
}

export const Signup_Request = (formdata) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "application/json");
    myHeaders.append("Content-Type", "multipart/form-data");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
    };
    return fetch(BASE_URL + SIGNUP_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("NewSignup----------", result)
            return result
        }).catch(error => {
            console.log('errorSignup', error)
            return error
        });
}

export const Forget_Password_Request = async (formdata) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
    };
    return fetch(BASE_URL + FORGET_PASSWORD_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("NewForgotResp----------", result)
            return result
        }).catch(error => {
            console.log('errorForGet', error)
            return error
        });
}

export const AddIntrest = async (data) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,

    };

    return fetch(BASE_URL + CLIENT_ONBOARDING, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("NewForgotResp----------", result)
            return result
        }).catch(error => {
            console.log('errorForGet', error)
            return error
        });
}

export const Today_Schedule = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + TODAY_SCHEDULE, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Google_SignIn_Api = async (raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + GOOGLE_SIGNIN_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}


//Verify OTP forgot password
export const Verify_OTP = async (formdata) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
    };
    return fetch(BASE_URL + VERIFY_OTP, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("Verify_OTP----------", result)
            return result
        }).catch(error => {
            console.log('errorVerify_OTP', error)
            return error
        });
}