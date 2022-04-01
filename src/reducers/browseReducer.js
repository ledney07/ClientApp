import {
  BROWSE_FILE,
  BROWSE_POST,
  UPLOAD_TOGGLE,
  CLEAR_BROWSE,
} from "../actions/types";
import React from "react";

const initialState = {
  selectedFile: {},
  browseSuccess: false,
  browseFailure: false,
  showUploadButton: false,
  fileTypeFeedback: "",
};

export default function browseReducer(state = initialState, action) {
  switch (action.type) {
    case BROWSE_FILE:
      const file = action.payload;
      if (
        (file.type === ".csv") |
        (file.type === "application/vnd.ms-excel") |
        (file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
      )
        return {
          ...state,
          selectedFile: file,
          browseSuccess: true,
          browseFailure: false,
          showUploadButton: true,
          fileTypeFeedback: "",
        };
      else
        return {
          ...state,
          browseFailure: true,
          browseSuccess: false,
          showUploadButton: false,
          fileTypeFeedback: (
            <text
              style={{
                color: "red",
                marginLeft: 10,
                marginRight: 5,
              }}
            >
              Incorrect file type.
            </text>
          ),
        };
    case BROWSE_POST:
      return {
        ...state,
        showUploadButton: true,
      };
    case UPLOAD_TOGGLE:
      const { showUploadButton } = state;
      const uploadStatus = !showUploadButton;
      return {
        ...state,
        showUploadButton: uploadStatus,
      };
    case CLEAR_BROWSE:
      return {
        ...state,
        selectedFile: {},
        showUploadButton: false,
        fileTypeFeedback: "",
        browseSuccess: false,
        browseFailure: false,
      };
    default:
      return state;
  }
}
