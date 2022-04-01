import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import clsx from "clsx";
import { green, red } from "@material-ui/core/colors";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { getLocation } from "./RestPath";
import {
  UPLOAD_GET,
  UPLOAD_SUCCESS_TOGGLE,
  UPLOAD_FAILURE_TOGGLE,
  UPLOAD_PROGRESS_TOGGLE,
  UPLOAD_TOGGLE,
  CLEAR_UPLOAD,
} from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
    verticalAlign: "initial",
  },
  buttonFailure: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
    verticalAlign: "initial",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "30%",
    left: "30%",
    marginTop: -15,
    marginLeft: -15,
  },
}));

export default function UploadButton(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const success = useSelector((state) => state.upload.success);
  const failure = useSelector((state) => state.upload.failure);
  const selectedFile = useSelector((state) => state.browse.selectedFile);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonFailure]: failure,
  });

  class Upload {
    constructor(url, data) {
      this.url = url;
      this.data = data;
    }
  }

  // Upload the file given in `file`, updating progress state using `setProgress`.
  async function upload(file, setProgress) {
    // Start the upload.
    const uploadUrl = await startUpload(file.name);

    // Upload each chunk.
    // TODO: Retry failed chunks.
    const fileSize = file.size;
    const chunkSize = 1e6; // 1 MB;
    var chunkStart = 0;
    var chunkEnd = chunkSize;
    var i = 0;
    while (chunkStart < fileSize) {
      const chunk = file.slice(chunkStart, chunkEnd);
      await uploadChunk(chunk, i, uploadUrl);
      chunkStart = chunkEnd;
      chunkEnd = chunkStart + chunkSize;
      setProgress(Math.min(1, chunkStart / fileSize));
    }

    // Finish the upload.
    await finishUpload(uploadUrl);

    // Get the upload info.
    const uploadData = await getUpload(uploadUrl);

    return new Upload(uploadUrl, uploadData);
  }

  // Start an upload and return its URL, to be used in `uploadChunk` and `finishUpload`.
  async function startUpload(fileName) {
    const response = await fetch("api/upload", {
      method: "POST",
      headers: {
        fileName: fileName,
      },
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    return getLocation(response);
  }

  // Upload a chunk with chunk number `index` for the upload at `url`.
  async function uploadChunk(chunk, index, url) {
    var formData = new FormData();
    formData.append("file", chunk);
    const response = await fetch(url, {
      method: "PUT",
      body: formData,
      mode: "cors",
      headers: {
        index: index,
      },
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    return;
  }

  // Tell the server that all chunks have been uploaded for upload `url`.
  async function finishUpload(url) {
    const response = await fetch(url, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    return;
  }

  async function getUpload(url) {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = response.json();
    return data;
  }

  // Upload the selected file (in `props.selectedFile`) in chunks.
  async function uploadHandler() {
    dispatch({ type: CLEAR_UPLOAD });
    dispatch({ type: UPLOAD_TOGGLE });
    dispatch({ type: UPLOAD_PROGRESS_TOGGLE });

    var result;
    var errorCheck = false;
    try {
      result = await upload(selectedFile, props.setProgress);
      // If we get an error code on the back-end, trigger front-end error catching and pass the error code.
      if (result.data.uploadFailureReason != null) {
        errorCheck = true;
      }
      /* Below code should be commented IN to test without backend and then commented OUT when deploying for build */
      // result = await fetch("upload.json", {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }).then((response) => response.json());
    } catch (err) {
      if (err) {
        // Add default error message.
        result = {
          data: {
            uploadFailureReason: "Try again."
          }
        }
        errorCheck = true;
      }
    }

    if (errorCheck) {
      dispatch({
        type: UPLOAD_FAILURE_TOGGLE,
        payload: {
          errorMessage: result.data.uploadFailureReason,
        },
      });
      dispatch({ type: UPLOAD_TOGGLE });
      dispatch({ type: UPLOAD_PROGRESS_TOGGLE });
    } else {
      // Update state.
      dispatch({
        type: UPLOAD_GET,
        payload: {
          columns: result.data.columns,
          preview: result.data.preview,
          url: result.url,
        },
      });
      // Update the UI.
      dispatch({ type: UPLOAD_TOGGLE });
      dispatch({ type: UPLOAD_SUCCESS_TOGGLE });
      dispatch({ type: UPLOAD_PROGRESS_TOGGLE });
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="default"
          value={props.value}
          className={buttonClassname}
          disabled={props.disabled}
          onClick={uploadHandler}
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}
