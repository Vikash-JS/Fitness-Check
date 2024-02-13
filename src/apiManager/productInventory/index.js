import {BASE_URL, data} from '../../utils/Constants';

const GET_ALL_PRODUCT_LIST = 'client/productInventory/product/list-products';
const PRODUCT_DETAILS = 'client/productInventory/product/get-product/';
const POST_ENQUIRY =
  'client/productInventory/productEnquiry/create-productEnquiry';

export const Get_Products = async name => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);
  myHeaders.append('Content-Type', 'application/json');

  let data = {
    name: name,
  };

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
  };

  return fetch(BASE_URL + GET_ALL_PRODUCT_LIST, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
};

export const Product_Details = async ProId => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  return fetch(BASE_URL + PRODUCT_DETAILS + ProId, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
};

export const Post_Enquiry = async data => {
  
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + global.Token);
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(data),
  };

  return fetch(BASE_URL + POST_ENQUIRY, requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => {
      return error;
    });
};
