import { BASE_URL } from '../../utils/Constants';

const All_Nutrition_EndPoint = 'client/nutrition/all';
const NutritionDetailById_Endpoint = 'client/nutrition/get/';
const MyNutrition_EndPoint = 'client/nutrition/my-nutrition';
const NutritionAssigny_EndPoint = 'client/nutrition/assign/';
const MARK_AS_DONE_ENDPOINT = 'client/nutrition/mark';
const SEARCH_ALL_NUTRITION_ENDPOINT = 'client/nutrition/filter-all-nutritions';
const SEARCH_MY_NUTRITION_ENDPOINT = 'client/nutrition/filter-my-nutritions';
const EXPORT_PDF_ENDPOINT = 'client/nutrition/pdf/';
const NUTRITION_PROGRESS ='client/nutrition/get-my-nutrition-progress';
const NUTRITION_ACTIVITY ='client/nutrition/get-nutrition-activity/';

export const Get_All_Nutrition = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + All_Nutrition_EndPoint, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}
export const GetNutritionActivityById = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + NUTRITION_ACTIVITY + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_My_Nutrition_List = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + MyNutrition_EndPoint, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_NutritionDetail_ById = async (id, type) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + NutritionDetailById_Endpoint + id + '/' + type, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_User_Nutrition_Assign = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + NutritionAssigny_EndPoint + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Mark_as_Done = async (formData) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
    };

    return fetch(BASE_URL + MARK_AS_DONE_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });

}

export const Search_All_Nutrition = async (raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + SEARCH_ALL_NUTRITION_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Search_My_Nutrition = async (raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + SEARCH_MY_NUTRITION_ENDPOINT, requestOptions)
    .then(response => response.json())
    .then(result => {
        return result
    }).catch(error => {
        return error
    });
}

export const Export_Pdf = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(BASE_URL + EXPORT_PDF_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Nutrition_Progress_Weekly_Chart = async (id) => {
    
    let form_data = new FormData()
    form_data.append("nutritionId",id)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: form_data,
    };

    return fetch(BASE_URL + NUTRITION_PROGRESS, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log('result: ', result);
            return result
        }).catch(error => {
            return error
        });
}