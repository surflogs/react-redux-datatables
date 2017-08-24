export default (state = [], action) => {
  console.log(JSON.stringify(action));
  switch (action.type) {
    case 'PURCHASE_SKU_DATA':
      return {
        ...state,
        rows : action.purchaseSKUs
      };
    case 'PM_DATA':
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
    default:
      return state;
  }
};
