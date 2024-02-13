// import {BASE_URL} from '../../utils/Constants';

// const SAVE_BMR = 'client/bmrHistory/saveBmrHistory';
// const GETBMR_HISTORYLIST = 'client/bmrHistory/getSavedBmrHistories';
// const REMOVE_HISTORY = 'client/bmrHistory/removeBmrHistory/';

// const SAVE_BMI = 'client/bmiHistory';
// const SAVE_BODY_FAT = 'client/bodyFatHistory';
// const SAVE_MACRO_NUTRIENTS = 'client/macronutrientHistory';
// const SAVE_1RM = 'client/oneRMHistory';

// export const Save_1RM = async value => {
//   const raw = {
//     reps: value.reps,
//     weightLifted: value.weightLifted,
//     exercise: value.selectExercise,
//   };

//   console.log('raw:----------- ', raw);

//   const myHeaders = new Headers();
//   myHeaders.append('Authorization', 'Bearer ' + global.Token);
//   myHeaders.append('Content-Type', 'application/json');
//   const requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: JSON.stringify(raw),
//   };

//   return fetch(BASE_URL + SAVE_1RM, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       return result;
//     })
//     .catch(error => {
//       return error;
//     });
// };

// export const Save_macroNutrients = async value => {
//   const raw = {
//     height: value.height,
//     weight: value.weight,
//     age: value.age,
//     gender: value.gender,
//   };

//   console.log('raw:----------- ', raw);

//   const myHeaders = new Headers();
//   myHeaders.append('Authorization', 'Bearer ' + global.Token);
//   myHeaders.append('Content-Type', 'application/json');
//   const requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: JSON.stringify(raw),
//   };

//   return fetch(BASE_URL + SAVE_MACRO_NUTRIENTS, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       return result;
//     })
//     .catch(error => {
//       return error;
//     });
// };

// export const Save_bodyFat = async value => {
//   const raw = {
//     height: value.height,
//     weight: value.weight,
//     age: value.age,
//     gender: value.gender,
//   };

//   console.log('raw:----------- ', raw);

//   const myHeaders = new Headers();
//   myHeaders.append('Authorization', 'Bearer ' + global.Token);
//   myHeaders.append('Content-Type', 'application/json');
//   const requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: JSON.stringify(raw),
//   };

//   return fetch(BASE_URL + SAVE_BODY_FAT, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       return result;
//     })
//     .catch(error => {
//       return error;
//     });
// };

// export const Save_BMI = async value => {
//   const raw = {
//     height: value.height,
//     weight: value.weight,
//     age: value.age,
//     gender: value.gender,
//   };

//   console.log('raw:----------- ', raw);

//   const myHeaders = new Headers();
//   myHeaders.append('Authorization', 'Bearer ' + global.Token);
//   myHeaders.append('Content-Type', 'application/json');
//   const requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: JSON.stringify(raw),
//   };

//   return fetch(BASE_URL + SAVE_BMI, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       return result;
//     })
//     .catch(error => {
//       return error;
//     });
// };

// // post method for saving bmr report

// export const Save_BMR = async value => {
//   const form_data = new FormData();
//   form_data.append('height', 65);
//   form_data.append('weight', 65);
//   form_data.append('age', 77);
//   form_data.append('gender', value?.gender);
//   form_data.append('bmrValue', 76);
//   form_data.append('exercise', value?.exercise);

//   console.log('raw:----------- ', form_data);
//   var myHeaders = new Headers();
//   myHeaders.append('Authorization', 'Bearer ' + global.Token);
//   myHeaders.append('Content-Type', 'application/json');
//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     // body: JSON.stringify(raw),
//     body: form_data,
//   };
//   console.log(BASE_URL + SAVE_BMR);
//   return fetch(BASE_URL + SAVE_BMR, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       return result;
//     })
//     .catch(error => {
//       return error;
//     });
// };

// // get method for brm history list

// export const getBmrHistoryList = async () => {
//   var myHeaders = new Headers();
//   myHeaders.append('Authorization', 'Bearer ' + global.Token);

//   var requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//   };

//   return fetch(BASE_URL + GETBMR_HISTORYLIST, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       return result;
//     })
//     .catch(error => {
//       return error;
//     });
// };

// export const Remove_BMR = async id => {
//   var myHeaders = new Headers();
//   myHeaders.append('Authorization', 'Bearer ' + global.Token);
//   var requestOptions = {
//     method: 'DELETE',
//     headers: myHeaders,
//   };

//   return fetch(BASE_URL + REMOVE_HISTORY + id, requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       return result;
//     })
//     .catch(error => {
//       return error;
//     });
// };

import {BASE_URL} from '../../utils/Constants';

const commonHeaders = {
  Authorization: 'Bearer ' + global.Token,
  'Content-Type': 'application/json',
};

const SAVE_BMI = 'client/bmiHistory/saveBmiHistory';
const SAVE_BODY_FAT = 'client/bodyFatHistory/saveBodyFatHistory';
const SAVE_MACRO_NUTRIENTS =
  'client/macronutrientHistory/saveMacronutrientHistory';
const SAVE_1RM = 'client/oneRMHistory/saveOneRMHistory';
const SAVE_BMR = 'client/bmrHistory/saveBmrHistory';

const makeApiRequest = async (url, method, body) => {
  const requestOptions = {
    method,
    headers: new Headers({
      ...commonHeaders,
      'Content-Type': 'multipart/form-data',
    }),
    body,
  };

  try {
    const response = await fetch(BASE_URL + url, requestOptions);
    return await response.json();
  } catch (error) {
    return error;
  }
};

const createCommonFormData = value => {
  const commonData = new FormData();
  commonData.append('height', value.height);
  commonData.append('weight', value.weight);
  commonData.append('age', value.age);
  commonData.append('gender', value.gender);
  return commonData;
};

export const Save_1RM = async value => {
  const raw = new FormData();
  raw.append('reps', value.reps);
  raw.append('weightLifted', value.weightLifted);
  raw.append('exercise', value.selectExercise);

  return makeApiRequest(SAVE_1RM, 'POST', raw);
};

export const Save_macroNutrients = async value => {
  const raw = createCommonFormData(value);
  raw.append('goal', value.goal);
  raw.append('activity', value.activity);
  raw.append('macro', value.macro);
  raw.append('macronutrientValue', value.macronutrientValue);
  return makeApiRequest(SAVE_MACRO_NUTRIENTS, 'POST', raw);
};

export const Save_bodyFat = async value => {
  const raw = createCommonFormData(value);

  return makeApiRequest(SAVE_BODY_FAT, 'POST', raw);
};

export const Save_BMI = async value => {
  const raw = createCommonFormData(value);

  return makeApiRequest(SAVE_BMI, 'POST', raw);
};

export const Save_BMR = async value => {
  const raw = createCommonFormData(value);
  raw.append('bmrValue', value.bmrValue);
  raw.append('exercise', value.exercise);
  raw.append('brmValue', value.bmrValue);
  return makeApiRequest(SAVE_BMR, 'POST', raw);
};
