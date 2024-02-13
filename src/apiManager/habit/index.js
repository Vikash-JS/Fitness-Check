import { BASE_URL } from '../../utils/Constants';

const ALL_HABITS_ENDPOINTS = 'client/habit/all';
const HABIT_DETAIL_BYID_ENDPOINT = 'client/habit/get/';
const ASSIGN_HABITS_ENDPOINTS = 'client/habit/assign/';
const MY_HABITS_ENDPOINTS = 'client/habit/my-habit';
const MY_HABITS_BYID_ENDPOINT = 'client/habit/get/';
const CREATE_HABIT_ENDPOINT = 'client/habit/add';
const DELETE_HABIT_ENDPOINT = 'client/habit/delete/';
const ARCHIVE_HABITS_ENDPOINT = 'client/habit/my-habit-archived';
const ASSIGNBY_TRAINER_ENDPOINT = 'client/habit/my-habit-trainers';
const DEACTIVATE_HABIT_ENDPOINT = 'client/habit/archive/';
const UNARCHIVE_HABIT_ENDPOINT = 'client/habit/unarchive/';
const MARK_AS_DONE_ENDPOINT = 'client/habit/mark/';
const MARK_AS_UNDONE_ENDPOINT = 'client/habit/unMark/'
const HABIT_GRAPH_ENDPOINT = 'client/habit/getHabitState';

export const Get_All_Habits = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + ALL_HABITS_ENDPOINTS, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_Habit_Detail_ById = async () => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,

    };

    return fetch(BASE_URL + HABIT_DETAIL_BYID_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_Assign_Habits = async () => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + ASSIGN_HABITS_ENDPOINTS, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_MyHabits = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,

    };

    return fetch(BASE_URL + MY_HABITS_ENDPOINTS, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_MyHabit_ById = async (id, type) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(BASE_URL + MY_HABITS_BYID_ENDPOINT + id + '/' + type, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Create_Habit = async (formdata) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
    };
    return fetch(BASE_URL + CREATE_HABIT_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Delete_Habit = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
    };

    return fetch(BASE_URL + DELETE_HABIT_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_AssignBy_Trainer = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,

    };

    return fetch(BASE_URL + ASSIGNBY_TRAINER_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_Archive_Habits = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + ARCHIVE_HABITS_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Archive_Habit_Api = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + DEACTIVATE_HABIT_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const UnArchive_Habit_Api = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + UNARCHIVE_HABIT_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Mark_As_Done = async (timeSlotId,habitId) => {
    console.log("markIds========",timeSlotId,habitId)
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Accept", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + MARK_AS_DONE_ENDPOINT + habitId +"/"+timeSlotId, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}
export const Mark_As_unDone = async (id) => {
    console.log("unmarkIds========",id)
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Accept", "application/json");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + MARK_AS_UNDONE_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Habit_Graph = async (FromDate, EndDate) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "fromDate": FromDate, "endDate": EndDate });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        
    };

    return fetch(BASE_URL + HABIT_GRAPH_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}