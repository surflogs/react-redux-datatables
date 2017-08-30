export default (state = [], action) => {
  console.log(JSON.stringify(action));
  switch (action.type) {
    case 'PURCHASE_SKU_DATA':
      return {
        ...state,
        rows : action.purchaseSKUs
      };
    case 'LM_DATA':
      return {
        ...state,
        rows : action.pmdata
      };
    case 'PAGE':
      return {
        ...state,
        page : action.payload
      };
    case 'HEADERS':
      return {
        ...state,
        headers : action.payload
      };
    case 'PAGE_SIZE':
      return {
        ...state,
        pageSize : action.payload
      };
    case 'SHOW_MODAL':
      return {
        ...state,
        modalState : action.payload
      };
    case 'TOTAL_RECORDS':
      return {
        ...state,
        totalRecords : action.payload
      };
    case 'SORT_COLUMN':
      return {
        ...state,
        sortColumn : action.payload
      };
    case 'SORT_ORDER':
      return {
        ...state,
        sortOrder : action.payload
      };
    case 'FILTERS':
      return {
        ...state,
        filters : action.payload
      };
    default:
      return state;
  }
};
