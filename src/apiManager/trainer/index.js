import { BASE_URL } from '../../utils/Constants';

const ALL_TRAINER_ENDPOINT = 'client/trainer/all';
const GETTRAINERBY_ID = 'client/trainer/view/';
const TRAINER_DETAIL_ENDPOINT = 'client/trainer/view/';
const PACKAGE_LIST_ENDPOINT = 'client/package/all?'
const TRAINER_FEEDS_ENDPOINT = 'client/community/trainer-posts/';
const FOLLOW_ENDPOINT = 'client/follow/add/';
const Rate_N_REVIEW = 'client/rating/add';
const GET_TRAINER_REVIEW_ENDPOINT = 'client/rating/trainer/';
const GET_PACKAGE_DETAIL_ENDPOINT = 'client/package/get/';
const FOLLOW_TRAINER_ENDPOINT = 'client/follow/add/';
const UNFOLLOW_TRAINER_ENDPOINT = 'client/follow/remove/'
const MY_TRAINER_ENDPOINT = 'client/trainer/my-trainers';
const SEARCH_ENDPOINT = 'client/trainer/search-all-trainers';
const SEARCH_MYTRAINER_ENDPOINT = 'client/trainer/search-my-trainers';
const PACKAGE_BY_TRAINERID_ENDPOINT = 'client/package/get-packages/';
const USER_PACKAGE_ENDPOINT = 'client/package/my';
const BUYPACKAGE_ENDPOINT = 'client/package/checkout/'
export const Get_All_Trainer = async () => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);
  myHeaders.append('Accept', 'application/json');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(BASE_URL + ALL_TRAINER_ENDPOINT, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
};

export const Get_My_TrainerList = async () => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(BASE_URL + MY_TRAINER_ENDPOINT, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
}

export const RateTrainer = async (raw) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  };
  return fetch(BASE_URL + Rate_N_REVIEW, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
}
export const Get_Trainer_Detail_ByID = async id => {
  var myHeaders = new Headers();
  console.log('TrainerrrId==============>', id);
  myHeaders.append('Authorization', 'Bearer ' + global.Token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(BASE_URL + TRAINER_DETAIL_ENDPOINT + id, requestOptions,)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
};

export const PackageAllDetails = async () => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(BASE_URL + PACKAGE_LIST_ENDPOINT, requestOptions,)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
};

export const Package_By_TrainerId = async (id) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(BASE_URL + PACKAGE_BY_TRAINERID_ENDPOINT + id, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
}

export const TrainerFeeds = async (id) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(BASE_URL + TRAINER_FEEDS_ENDPOINT + id, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
};

export const FollowTrainer = async (trainerId) => {
  console.log('trainer id=============>', trainerId);
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(BASE_URL + FOLLOW_TRAINER_ENDPOINT + trainerId, requestOptions,)
    .then(response => response.json())
    .then(result => {
      console.log('my foloow result===========>', result);
      return result;
    })
    .catch(error => {
      return error;
    });
};

export const UnFollowTrainer = async (trainerId) => {
  console.log('trainer id=============>', trainerId);
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(BASE_URL + UNFOLLOW_TRAINER_ENDPOINT + trainerId, requestOptions,)
    .then(response => response.json())
    .then(result => {
      console.log('my foloow result===========>', result);
      return result;
    })
    .catch(error => {
      return error;
    });
};


export const TrainerReview = async TrainerId => {
  console.log('Trainer Id for review=========', TrainerId);
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(BASE_URL + GET_TRAINER_REVIEW_ENDPOINT + TrainerId, requestOptions,)
    .then(response => response.json())
    .then(result => {
      console.log('my Allfoloow result===========>', result);
      return result;
    })
    .catch(error => {
      return error;
    });
};

export const PackageDetaislByid = async packageid => {
  console.log('my pacakgeID============>', packageid);
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(BASE_URL + GET_PACKAGE_DETAIL_ENDPOINT + packageid, requestOptions,)
    .then(response => response.json())
    .then(result => {
      console.log('my Allfoloow result===========>', result);
      return result;
    })
    .catch(error => {
      return error;
    });
};

export const Search_Trainer = async (raw) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  return fetch(BASE_URL + SEARCH_ENDPOINT, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
}

export const Search_My_Trainer = async (raw) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };

  return fetch(BASE_URL + SEARCH_MYTRAINER_ENDPOINT, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
}

export const Buy_Package = async (packageId, trainerId) => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  return fetch(BASE_URL + BUYPACKAGE_ENDPOINT + packageId + '/' + trainerId, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
}

export const MyPackages = async () => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(BASE_URL + USER_PACKAGE_ENDPOINT, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
}