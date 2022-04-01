import { configureStore } from "@reduxjs/toolkit";
import browseReducer from "./reducers/browseReducer";
import claimsColsReducer from "./reducers/claimsColsReducer";
import submitReducer from "./reducers/submitReducer";
import tabReducer from "./reducers/tabReducer";
import uploadReducer from "./reducers/uploadReducer";
import versionReducer from "./reducers/versionReducer";

export default configureStore({
  reducer: {
    tab: tabReducer,
    browse: browseReducer,
    upload: uploadReducer,
    claimsCols: claimsColsReducer,
    submit: submitReducer,
    version: versionReducer,
  },
});
