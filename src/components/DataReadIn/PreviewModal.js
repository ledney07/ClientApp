import React from "react";
import { useSelector } from "react-redux";
// import makeStyles from "@material-ui/core/styles/makeStyles";
import { DataGrid } from "@material-ui/data-grid";

export default function PreviewModal(props) {
  const previewRows = useSelector((state) => state.upload.previewRows);
  const previewCols = useSelector((state) => state.upload.previewCols);

  return (
    <React.Fragment>
      <h5 style={{ color: "#177BAD" }}>Data Preview</h5>
      {previewCols && previewRows && (
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid rows={previewRows} columns={previewCols} />
        </div>
      )}
    </React.Fragment>
  );
}
