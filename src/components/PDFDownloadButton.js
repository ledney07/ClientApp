import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import html2pdf from "html2pdf.js";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles(() => ({
  fab: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    "&:hover": {
      color: "#FFFFFF",
    },
    zIndex: 1e9,
  },
}));

export default function PDFDownloadButton(props) {
  const classes = useStyles();
  const reportName = props.reportName;
  const options = props.pdfOptions;
  const version = useSelector((state) => state.version.toolVersion);

  function printDocument() {
    // Returns a list of all html elements in the class "downloadableReport"
    let report = document.getElementsByClassName("downloadableReport");
    // Create an empty div and add each html element to it
    let reportElement = document.createElement("div");

    for (let i = 0; i < report.length; i++) {
      reportElement.appendChild(report[i].cloneNode(true));
    }

    // Output the pdf doc
    html2pdf()
      .from(reportElement)
      .set(options)
      .toPdf()
      .get("pdf")
      .then(
        // Function to add footers and headers to each page
        function (pdf) {
          let totalPages = pdf.internal.getNumberOfPages();
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(10);
            pdf.setTextColor(150);
            pdf.text(4.25, 10.5, i.toString());
            pdf.text(1, 0.5, `MHPAEA ${reportName} Results`);
            pdf.text(
              pdf.internal.pageSize.getWidth() - 1,
              0.5,
              `v ${version}`,
              {
                align: "right",
              }
            );
          }
        }
      )
      .save();
  }

  return (
    <Fab
      style={{ outline: "none" }}
      variant="extended"
      size="medium"
      color="primary"
      aria-label="add"
      className={classes.fab}
      onClick={printDocument}
    >
      <GetAppIcon className={classes.extendedIcon} />
      Download PDF Report
    </Fab>
  );
}
