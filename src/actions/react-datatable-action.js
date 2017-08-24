import { getSkuDetailFromPM, GET_PM_DATA_API, GET_LM_HEADERS_API } from '../apis/react-datatable-apis';

function loadSkuData(allSKUs) {
  return {
    type : 'PURCHASE_SKU_DATA',
    purchaseSKUs : allSKUs
  };
}
function fetchSKUDataAction() {
  const skuname = 'kaushik';
  console.log('here');
  return function(dispatch) {
    return getSkuDetailFromPM(skuname).then((response) => {
      dispatch(loadSkuData(response));
    }).catch((error) => {
      throw (error);
    });
  };
}


function loadPMData(alldata) {
  return {
    type : 'PM_DATA',
    pmdata : alldata
  };
}
function fetchPmDataAction() {
  console.log('PM_DATA');
  return function(dispatch) {
    return GET_PM_DATA_API().then((response) => {
      dispatch(loadPMData(response));
    }).catch((error) => {
      throw (error);
    });
  };
}

function setNewPageNumberAction(pageNo) {
  console.log('here we are');
  return {
    type : 'PAGE',
    payload : pageNo
  };
}

function loadHeaders(headers) {
  return {
    type : 'HEADERS',
    payload : headers
  };
}

function fetchHeadersAction() {
  return function(dispatch) {
    return GET_LM_HEADERS_API().then((response) => {
      dispatch(loadHeaders(response));
    }).catch((error) => {
      throw (error);
    });
  };
}

function setNewPageSizeAction(pageSize) {
  return {
    type : 'PAGE_SIZE',
    payload : pageSize
  };
}

function setShowModalStateAction(modalState) {
  return {
    type : 'SHOW_MODAL',
    payload : modalState
  };
}

export {
  fetchSKUDataAction,
  fetchPmDataAction,
  setNewPageNumberAction,
  fetchHeadersAction,
  setNewPageSizeAction,
  setShowModalStateAction
};
