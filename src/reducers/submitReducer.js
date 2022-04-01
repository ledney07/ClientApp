import { REPORT_ID, SUBMIT_GET } from "../actions/types";

const initialState = {
  substantiallyAllResult: [],
  predominantResult: [],
  outOfNetworkResults: [],
  deniedClaimsResults: [],
  timelinessResults: [],
  reportId: [],
  fileSummaryData: {},
  fileName: [],
  reportDateTime: null,
  reportRunTimeMs: null,
};

export default function submitReducer(state = initialState, action) {
  switch (action.type) {
    case REPORT_ID:
      return { ...state, reportId: action.payload };
    case SUBMIT_GET:
      if (action.payload.analysis === "qtl") {
        return {
          ...state,
          substantiallyAllResult: action.payload.data.substantiallyAllTests,
          predominantResult: action.payload.data.predominantTests,
          fileSummaryData: action.payload.data.fileSummary,
          fileName: action.payload.data.fileName,
          reportDateTime: action.payload.data.lastUpdatedDate,
          reportRunTimeMs: action.payload.data.runTimeMs,
        };
      } else if (action.payload.analysis === "nqtl") {
        return {
          ...state,
          outOfNetworkResults: action.payload.data.outOfNetworkResults,
          deniedClaimsResults: action.payload.data.deniedClaimsResults,
          timelinessResults: action.payload.data.timelinessResults,
          fileSummaryData: action.payload.data.fileSummary,
          fileName: action.payload.data.fileName,
          reportDateTime: action.payload.data.lastUpdatedDate,
          reportRunTimeMs: action.payload.data.runTimeMs,
        };
      }
      break;
    default:
      return state;
  }
}
