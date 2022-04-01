import {
  UPLOAD_GET,
  UPLOAD_RESET,
  UPLOAD_SUCCESS_TOGGLE,
  UPLOAD_FAILURE_TOGGLE,
  UPLOAD_PROGRESS_TOGGLE,
  PREVIEW_ROWS_COLUMNS,
  CLEAR_UPLOAD,
} from "../actions/types";

const initialState = {
  success: false,
  failure: false,
  showProgress: false,
  uploadLocation: "",
  uploadFileCols: [],
  dataPreview: [],
  previewRows: [],
  previewCols: [],
  errorMessage: "",
};

export default function uploadReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_RESET:
      return { state };
    case UPLOAD_SUCCESS_TOGGLE:
      let success = state.success;
      let newSuccess = !success;
      return { ...state, success: newSuccess };
    case UPLOAD_FAILURE_TOGGLE:
      let failure = state.failure;
      let errorMessage = action.payload.errorMessage; 
      let newFailure = !failure;
      return { ...state, errorMessage: errorMessage, failure: newFailure };
    case UPLOAD_PROGRESS_TOGGLE:
      let showProgress = state.showProgress;
      let newShowProgress = !showProgress;
      return { ...state, showProgress: newShowProgress };
    case UPLOAD_GET:
      return {
        ...state,
        uploadFileCols: action.payload.columns,
        dataPreview: action.payload.preview,
        uploadLocation: action.payload.url,
        showDataPreview: true,
      };
    case PREVIEW_ROWS_COLUMNS:
      return {
        ...state,
        previewRows: action.payload.rows,
        previewCols: action.payload.columns,
      };
    case CLEAR_UPLOAD:
      return {
        ...state,
        success: false,
        failure: false,
        uploadFileCols: [],
        previewRows: [],
        previewCols: [],
        dataPreview: [],
      };
    default:
      return state;
  }
}
