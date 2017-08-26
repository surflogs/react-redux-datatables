import { getSkuDetailFromPM, GET_LM_DATA_API, GET_LM_HEADERS_API, GET_LM_TOTAL_RECORDS_API } from '../apis/react-datatable-apis';

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


function loadLMData(alldata) {
  return {
    type : 'LM_DATA',
    pmdata : alldata
  };
}
function fetchLmDataAction(page, limit, sortData) {
  console.log('PM_DATA');
  return function(dispatch) {
    return GET_LM_DATA_API(page, limit, sortData).then((response) => {
      dispatch(loadLMData(response));
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

function loadTotalNumberOfRecords(total) {
  console.log("this is count to be" + total);
  return {
    type : 'TOTAL_RECORDS',
    payload : total
  };
}

function setTotalNumberOfRecords() {
  console.log(" here in action");
  return function(dispatch) {
    return GET_LM_TOTAL_RECORDS_API().then((response) => {
      dispatch(loadTotalNumberOfRecords(response));
    }).catch((error) => {
      throw (error);
    });
  };
}

function setSortColumnStateAction(column) {
  return {
    type : 'SORT_COLUMN',
    payload : column
  };
}

function setSortOrderStateAction(order) {
  return {
    type : 'SORT_ORDER',
    payload : order
  };
}

export {
  fetchSKUDataAction,
  fetchLmDataAction,
  setNewPageNumberAction,
  fetchHeadersAction,
  setNewPageSizeAction,
  setShowModalStateAction,
  setTotalNumberOfRecords,
  setSortColumnStateAction,
  setSortOrderStateAction
};
