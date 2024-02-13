import { BASE_URL } from '../../utils/Constants';
const COMMUNITYLIST_ENDPOINT = 'client/community/all';
const COMMUNITYDETAIL_ENDPOINT = 'client/community/get/';
const GET_FEEDS_ENDPOINT = 'client/community/community-feeds';
const GET_MEMBER_ENDPOINT = 'client/community/getMembers/';
const REPORT_POST_ENDPOINT = 'client/community/reportPost/';
const POPULAR_COMMUNITY_ENDPOINT = 'client/community/popular';
const GET_BOOKMARK_ENDPOINT = 'client/bookmark/getSavedPosts';
const ADD_BOOKMARK_ENDPOINT = 'client/bookmark/savePost/';
const REMOVE_BOOKMARK_ENDPOINT = 'client/bookmark/removeSavePost/';

export const Get_Community_List = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    return fetch(BASE_URL + COMMUNITYLIST_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}
export const Get_Community_Detail = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + COMMUNITYDETAIL_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_Feeds = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + GET_FEEDS_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_Community_Member = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + GET_MEMBER_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Report_Post_Api = async (id, raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + REPORT_POST_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Popular_Communities = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + POPULAR_COMMUNITY_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_Bookmark_Post = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + GET_BOOKMARK_ENDPOINT, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Add_Bookmark_Post = async(postId, trainerId) => {
    console.log("post1Id,Trainer1Id========",postId, trainerId)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var formdata = new FormData();
    formdata.append("trainerId", trainerId);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
    };

    return fetch(BASE_URL + ADD_BOOKMARK_ENDPOINT + postId, requestOptions)
    .then(response => response.json())
    .then(result => {
        return result
    }).catch(error => {
        return error
    });
}

export const Remove_Bookmark_Post = async(id)=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  
};

return fetch(BASE_URL + REMOVE_BOOKMARK_ENDPOINT + id, requestOptions)
.then(response => response.json())
.then(result => {
    return result
}).catch(error => {
    return error
});
}

