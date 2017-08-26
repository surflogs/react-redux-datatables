import fetch from 'isomorphic-fetch';
import { getListingHeaders, getTotalRecordsListingMaster, getListingRowData } from '../constants/ApiConstants';
// for all saved data and new scanned Data...
const getSkuDetailFromPM = (skuname) => {
  return fetch('http://dsyh.in/test_react.php?skuname='+skuname).then((response) => {
    return response.json();
  }).catch((error) => {
    return error;
  });
};

const GET_LM_HEADERS_API = () => {
  console.log(getListingHeaders);
  return fetch(getListingHeaders,
    { method: 'GET',
      mode: 'cors',
      cache: 'default' }).then((response) => {
        return response.json();
      }).catch((error) => {
        return error;
      });
};

const GET_LM_TOTAL_RECORDS_API = () => {
  return fetch(getTotalRecordsListingMaster,
    { method: 'GET',
      mode: 'cors',
      cache: 'default' }).then((response) => {
        return response.json();
      }).catch((error) => {
        return error;
      });
};

const GET_PM_DATA_API = () => {
  return fetch('http://myexpress-wa.azurewebsites.net/pmdata',
    {
      method : 'POST',
      mode : 'cors',
      body: JSON.stringify({
        clientid:'396',
        systemmode:'pm',
        term:'wh',
        shipmode:'pm',
        page:0,
        skip:5,
        search:''
      }),
      headers: {
        'content-type' : 'application/json; charset=utf-8'
      }
    }).then((response) => {
      return response.json();
    }).catch((error) => {
      return error;
    });
};

const GET_LM_DATA_API = (pageNo, limitReco, sortField = '{"afid" : 1}') => {
  console.log(" pageNo " + pageNo + " limitReco " + limitReco + " sort fields " + sortField); 
  return fetch(getListingRowData,
    {
      method : 'POST',
      mode : 'cors',
      body: JSON.stringify({
        clientid:'394',
        page:pageNo,
        limit:limitReco,
        sort : sortField
      }),
      headers: {
        'content-type' : 'application/json; charset=utf-8'
      }
    }).then((response) => {
      return response.json();
    }).catch((error) => {
      return error;
    });
};


export {
  getSkuDetailFromPM,
  GET_PM_DATA_API,
  GET_LM_HEADERS_API,
  GET_LM_TOTAL_RECORDS_API,
  GET_LM_DATA_API
};
