import { BASE_URL } from '../../utils/Constants';

const GET_COMMENT_LIST_ENDPOINT = 'client/community-comments/all/';
const GET_REPLIES_LIST_ENDPOINT = 'client/community-replies/all/';
const DELETE_COMMENT_ENDPOINT = 'client/community-comments/delete/';
const DELETE_REPLIES_ENDPOINT = 'client/community-replies/delete/';
const ADD_REPLIES_ENDPOINT = 'client/community-replies/add/';
const ADD_COMMENT_ENDPOINT = 'client/community-comments/add/';
const GET_ALL_LIKES_ENDPOINT = 'client/community-likes/all/';
const POST_LIKE_ENDPOINT = 'client/community-likes/like/';
const POST_DISLIKE_ENDPOINT = 'client/community-likes/disLike/';
export const Get_Comment_List = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + GET_COMMENT_LIST_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_Replies_By_CommentId = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + GET_REPLIES_LIST_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const deleteComment = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
    };

    return fetch(BASE_URL + DELETE_COMMENT_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const delete_Replies = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
    };

    return fetch(BASE_URL + DELETE_REPLIES_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Post_Replies = async (id, raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + ADD_REPLIES_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Post_Comment = async (id, raw) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };

    return fetch(BASE_URL + ADD_COMMENT_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Get_All_Likes = async(id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };

    return fetch(BASE_URL + GET_ALL_LIKES_ENDPOINT + id, requestOptions)
    .then(response => response.json())
    .then(result => {
        return result
    }).catch(error => {
        return error
    });
}

export const Post_like_Api = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
    };

    return fetch(BASE_URL + POST_LIKE_ENDPOINT + id, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result
        }).catch(error => {
            return error
        });
}

export const Dislike_Post_Api = async(id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + global.Token);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
    };

    return fetch(BASE_URL + POST_DISLIKE_ENDPOINT + id, requestOptions)
    .then(response => response.json())
    .then(result => {
        return result
    }).catch(error => {
        return error
    });
}