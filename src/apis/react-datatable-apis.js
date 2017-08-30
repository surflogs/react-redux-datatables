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
    { method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        clientid:'394',
        dtname : 'productmaster'
      }),
      headers: {
        'content-type' : 'application/json; charset=utf-8'
      },
      cache: 'default' }).then((response) => {
        return response.json();
      }).catch((error) => {
        return error;
      });
};

const GET_LM_TOTAL_RECORDS_API = (filters = '{}') => {
  return fetch(getTotalRecordsListingMaster,
    { method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        clientid:'394',
        filter:filters
      }),
      headers: {
        'content-type' : 'application/json; charset=utf-8'
      },
      cache: 'default'
    }).then((response) => {
      return response.json();
    }).catch((error) => {
      return error;
    });
};

const GET_LM_DATA_API = (pageNo, limitReco, sortField = '{"afid" : 1}', filters = '{}') => {
  console.log(JSON.stringify({
    clientid:'396',
    page:pageNo,
    limit:limitReco
  }));
  return fetch('http://node-demo-wa.azurewebsites.net/pm/pmdata',
    {
      method : 'POST',
      mode : 'cors',
      body: JSON.stringify({
        clientid:'396',
        page:pageNo,
        limit:limitReco
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

const GET_PM_DATA_API = (pageNo, limitReco, sortField = '{"afid" : 1}', filters='{}') => {
  console.log(" pageNo " + pageNo + " limitReco " + limitReco + " sort fields " + sortField + " filter " );
  return fetch(getListingRowData,
    {
      method : 'POST',
      mode : 'cors',
      body: JSON.stringify({
        clientid:'394',
        page:pageNo,
        limit:limitReco,
        sort : sortField,
        filter : filters
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
