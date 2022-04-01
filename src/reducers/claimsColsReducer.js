import {
  CLEAR_COLS,
  UPDATE_COLS,
  DELETE_COLS,
  SUBMIT_COLS,
  CHECKBOX_FILL,
  CHECKBOX_INITIALIZE,
  CHECKBOX_RETAIN,
} from "../actions/types";

const initialState = {
  claimsCols: [
    // Identifiers
    {
      setting: "claim_number",
      value: [],
      label: "Claim number",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "claim_line_number",
      value: [],
      label: "Claim line number",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    // Provider Information
    {
      setting: "network_status",
      value: [],
      label: "Network status",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    // Place of Service Information
    {
      setting: "place_of_service",
      value: [],
      label: "Place of service code",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "inpatient_outpatient",
      value: [],
      label: "Inpatient/Outpatient",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    // Service Information
    {
      setting: "diagnosis_code",
      value: [],
      label: "Diagnosis code",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "procedure_code",
      value: [],
      label: "Procedure code",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "ndc_code",
      value: [],
      label: "NDC code",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    {
      setting: "revenue_code",
      value: [],
      label: "Revenue code",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    {
      setting: "service_start_date",
      value: [],
      label: "Service start date",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    {
      setting: "procedure_code_modifier",
      value: [],
      label: "Procedure code modifier",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    // Payment Information
    {
      setting: "allowed_amt",
      value: [],
      label: "Allowed amount",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "copay_amt",
      value: [],
      label: "Copay amount",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "coinsurance_amt",
      value: [],
      label: "Coinsurance amount",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "deductible_amt",
      value: [],
      label: "Deductible amount",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    {
      setting: "moop_status",
      value: [],
      label: "Max out of pocket reached",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    // Adjudication
    {
      setting: "adjudication_status",
      value: [],
      label: "Approved status",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    // Checkboxes
    {
      setting: "network_values",
      value: [],
      label: "Network values",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "inpatient_values",
      value: [],
      label: "Inpatient values",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "approved_values",
      value: [],
      label: "Adjudication values",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    {
      setting: "mhsud_indicator",
      value: [],
      label: "MH/SUD Indicator",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    {
      setting: "medsurg_indicator",
      value: [],
      label: "Med/Surg Indicator",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    {
      setting: "mhsud_values",
      value: [],
      label: "MH/SUD Values",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    {
      setting: "medsurg_values",
      value: [],
      label: "Med/Surg Values",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    {
      setting: "moop_values",
      value: [],
      label: "Over MOOP values",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    {
      setting: "date_received",
      value: [],
      label: "Date received",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "date_processed",
      value: [],
      label: "Date processed",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "timeliness_days",
      value: [45],
      label: "Timeliness (Days)",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "date_received_format",
      value: ["m/d/yyyy"],
      label: "Date received format",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "date_processed_format",
      value: ["m/d/yyyy"],
      label: "Date processed format",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "service_start_date_format",
      value: ["m/d/yyyy"],
      label: "Service start date format",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    {
      setting: "moop_single",
      value: [],
      label: "Single MOOP limit",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "moop_family",
      value: [],
      label: "Family MOOP limit",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "moop_cum_single",
      value: [],
      label: "Cumulative single MOOP",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "moop_cum_family",
      value: [],
      label: "Cumulative family MOOP",
      number: "",
      name: "",
      required: true,
      error: false,
    },
    {
      setting: "applicable_copay",
      value: [],
      label: "Applicable copay",
      number: "",
      name: "",
      required: false,
      error: false,
    },
    {
      setting: "applicable_coinsurance",
      value: [],
      label: "Applicable coinsurance",
      number: "",
      name: "",
      required: false,
      error: false,
    },
  ],
  checkboxValues: [
    {
      setting: "network_values",
      options: [],
    },
    {
      setting: "inpatient_values",
      options: [],
    },
    {
      setting: "moop_values",
      options: [],
    },
    {
      setting: "approved_values",
      options: [],
    },
    {
      setting: "medsurg_values",
      options: [],
    },
    {
      setting: "mhsud_values",
      options: [],
    }
  ],
};

export default function claimsColsReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_COLS:
      let tmpClear = state.claimsCols;
      tmpClear = tmpClear.map((object) => {
        return {
          ...object,
          value: [],
          number: "",
          name: "",
          error: false,
        };
      });
      return { ...state, claimsCols: tmpClear };
    case UPDATE_COLS:
      let tmpUpdate = state.claimsCols;
      // Get an array of the moop calculation columns, and then determine how many are populated.
      let moopOptionalCols = [
        tmpUpdate.find((obj) => obj.setting === "moop_single").value.length !==
          0,
        tmpUpdate.find((obj) => obj.setting === "moop_family").value.length !==
          0,
        tmpUpdate.find((obj) => obj.setting === "moop_cum_single").value
          .length !== 0,
        tmpUpdate.find((obj) => obj.setting === "moop_cum_family").value
          .length !== 0,
      ];
      let moop = moopOptionalCols.filter(Boolean).length;
      let dataUpdate = action.payload;
      tmpUpdate = tmpUpdate.map((object) => {
        // Logic to update the text fields
        if (
          (action.payload.id === "timeliness_days" ||
            action.payload.id === "service_start_date_format" ||
            action.payload.id === "date_processed_format" ||
            action.payload.id === "date_received_format") &&
          object.setting === action.payload.id
        ) {
          return {
            ...object,
            value: [dataUpdate.number],
            error: dataUpdate.error,
          };
          // Logic to update all other fields
        } else if (action.payload.id === object.setting) {
          return {
            ...object,
            value: [dataUpdate.number],
            number: dataUpdate.number,
            name: dataUpdate.name,
            error: false,
          };
          // Conditional logic for updating Place of Service, Inpatient/Outpatient, or both
        } else if (
          action.payload.id === "place_of_service" &&
          (object.setting === "inpatient_outpatient" ||
            object.setting === "inpatient_values")
        ) {
          return {
            ...object,
            required: false,
            error: false,
          };
        } else if (
          action.payload.id === "inpatient_outpatient" &&
          object.setting === "place_of_service"
        ) {
          return {
            ...object,
            required: false,
            error: false,
          };
        } else if (
          action.payload.id === "inpatient_outpatient" &&
          object.setting === "inpatient_values" &&
          object.name === ""
        ) {
          return {
            ...object,
            required: true,
            error: false,
          };
          // Conditional logic for updating Copay Amt, Coinsurance Amt, or both
        } else if (
          action.payload.id === "copay_amt" &&
          object.setting === "coinsurance_amt"
        ) {
          return {
            ...object,
            required: false,
            error: false,
          };
        } else if (
          action.payload.id === "coinsurance_amt" &&
          object.setting === "copay_amt"
        ) {
          return {
            ...object,
            required: false,
            error: false,
          };
          // Conditional logic for updating MOOP Status and MOOP Values
        } else if (
          action.payload.id === "moop_status" &&
          object.setting === "moop_values" &&
          object.name === ""
        ) {
          return {
            ...object,
            required: true,
            error: false,
          };
          // Conditional logic for updating Adjudication Status and Approved Values
        } else if (
          action.payload.id === "adjudication_status" &&
          object.setting === "approved_values" &&
          object.name === ""
        ) {
          return {
            ...object,
            required: true,
            error: false,
          };
          // Conditional logic for making the Service Start Date Format field required
          // if Service Start Date is filled in
        } else if (
          action.payload.id === "service_start_date" &&
          object.setting === "service_start_date_format"
        ) {
          return {
            ...object,
            required: true,
          };
          // Conditional logic for updating moop status, OR the columns needed to calculate moop
        } else if (
          action.payload.id === "moop_status" &&
          (object.setting === "moop_single" ||
            object.setting === "moop_family" ||
            object.setting === "moop_cum_single" ||
            object.setting === "moop_cum_family")
        ) {
          return {
            ...object,
            required: false,
            error: false,
          };
          // Conditional logic for updating the columns needed to calculate moop or moop status
          // Check if at least 3 of the 4 selectors in the object are populated (and the 4th is in the action payload)
        } else if (
          (action.payload.id === "moop_single" ||
            action.payload.id === "moop_family" ||
            action.payload.id === "moop_cum_single" ||
            action.payload.id === "moop_cum_family") &&
          moop >= 3 &&
          object.setting === "moop_status"
        ) {
          return {
            ...object,
            required: false,
            error: false,
          };
        // Conditional logic for updating mhsud indicator and mhsud values
        } else if (
          action.payload.id === "mhsud_indicator" &&
          object.setting === "mhsud_values" &&
          object.name === ""
        ) {
          return {
            ...object,
            required: true,
            error: false,
          };
        // Conditional logic for updating medsurg indicator and medsurg values
        } else if (
          action.payload.id === "medsurg_indicator" &&
          object.setting === "medsurg_values" &&
          object.name === ""
        ) {
          return {
            ...object,
            required: true,
            error: false,
          };
        } else {
          return object;
        }
      });
      return { ...state, claimsCols: tmpUpdate };
    case DELETE_COLS:
      let tmpDelete = state.claimsCols;
      let optionalFields = [
        "copay_amt",
        "coinsurance_amt",
        "place_of_service",
        "inpatient_outpatient",
      ];
      let copay =
        tmpDelete.find((obj) => obj.setting === "copay_amt").name === "";
      let coinsurance =
        tmpDelete.find((obj) => obj.setting === "coinsurance_amt").name === "";
      let place =
        tmpDelete.find((obj) => obj.setting === "place_of_service").name === "";
      let inOut =
        tmpDelete.find((obj) => obj.setting === "inpatient_outpatient").name ===
        "";
      tmpDelete = tmpDelete.map((object) => {
        if (
          action.payload === object.setting &&
          object.required === true &&
          !optionalFields.includes(action.payload)
        ) {
          return {
            ...object,
            value: [],
            number: "",
            name: "",
            error: true,
          };
        } else if (
          action.payload === object.setting &&
          object.required === false &&
          !optionalFields.includes(action.payload)
        ) {
          return {
            ...object,
            value: [],
            number: "",
            name: "",
            error: false,
          };

          // Conditional logic for deleting Place of Service and/or Inpatient/Outpatient
        } else if (
          action.payload === "place_of_service" &&
          object.setting === "inpatient_outpatient" &&
          object.value.length === 0
        ) {
          return {
            ...object,
            required: true,
            error: true,
          };
        } else if (
          action.payload === "inpatient_outpatient" &&
          object.setting === "place_of_service" &&
          object.value.length === 0
        ) {
          return {
            ...object,
            required: true,
            error: true,
          };
        } else if (
          action.payload === "place_of_service" &&
          object.setting === "inpatient_outpatient" &&
          object.value.length !== 0
        ) {
          return {
            ...object,
            required: false,
            error: false,
          };
        } else if (
          action.payload === "inpatient_outpatient" &&
          object.setting === "place_of_service" &&
          object.value.length !== 0
        ) {
          return {
            ...object,
            required: false,
            error: false,
          };
        } else if (
          action.payload === "place_of_service" &&
          action.payload === object.setting &&
          inOut
        ) {
          return {
            ...object,
            value: [],
            number: "",
            name: "",
            required: true,
            error: true,
          };
        } else if (
          action.payload === "inpatient_outpatient" &&
          action.payload === object.setting &&
          place
        ) {
          return {
            ...object,
            value: [],
            number: "",
            name: "",
            required: true,
            error: true,
          };
        } else if (
          action.payload === "place_of_service" &&
          action.payload === object.setting &&
          !inOut
        ) {
          return {
            ...object,
            value: [],
            number: "",
            name: "",
            error: false,
          };
        } else if (
          action.payload === "inpatient_outpatient" &&
          action.payload === object.setting &&
          !place
        ) {
          return {
            ...object,
            value: [],
            number: "",
            name: "",
            error: false,
          };

          // Conditional logic for deleting Copay Amt and/or Coinsurance Amt
        } else if (
          action.payload === "copay_amt" &&
          object.setting === "coinsurance_amt" &&
          object.value.length === 0
        ) {
          return {
            ...object,
            required: true,
            error: true,
          };
        } else if (
          action.payload === "coinsurance_amt" &&
          object.setting === "copay_amt" &&
          object.value.length === 0
        ) {
          return {
            ...object,
            required: true,
            error: true,
          };
        } else if (
          action.payload === "copay_amt" &&
          object.setting === "coinsurance_amt" &&
          object.value.length !== 0
        ) {
          return {
            ...object,
            required: false,
            error: false,
          };
        } else if (
          action.payload === "coinsurance_amt" &&
          object.setting === "copay_amt" &&
          object.value.length !== 0
        ) {
          return {
            ...object,
            required: false,
            error: false,
          };
        } else if (
          action.payload === "copay_amt" &&
          action.payload === object.setting &&
          coinsurance
        ) {
          return {
            ...object,
            value: [],
            number: "",
            name: "",
            required: true,
            error: true,
          };
        } else if (
          action.payload === "coinsurance_amt" &&
          action.payload === object.setting &&
          copay
        ) {
          return {
            ...object,
            value: [],
            number: "",
            name: "",
            required: true,
            error: true,
          };
        } else if (
          action.payload === "copay_amt" &&
          action.payload === object.setting &&
          !coinsurance
        ) {
          return {
            ...object,
            value: [],
            number: "",
            name: "",
            error: false,
          };
        } else if (
          action.payload === "coinsurance_amt" &&
          action.payload === object.setting &&
          !copay
        ) {
          return {
            ...object,
            value: [],
            number: "",
            name: "",
            error: false,
          };
          // Conditional logic for deleting network values if network status is cleared
        } else if (
          action.payload === "network_status" &&
          object.setting === "network_values"
        ) {
          return {
            ...object,
            name: "",
            value: [],
            required: true,
            error: false,
          };
          // Conditional logic for deleting Inpatient Values if Inpatient/Outpatient is cleared
        } else if (
          action.payload === "inpatient_outpatient" &&
          object.setting === "inpatient_values"
        ) {
          return {
            ...object,
            name: "",
            value: [],
            required: false,
            error: false,
          };
          // Conditional logic for deleting MOOP Values if MOOP Status is cleared
        } else if (
          action.payload === "moop_status" &&
          object.setting === "moop_values"
        ) {
          return {
            ...object,
            name: "",
            value: [],
            required: false,
            error: false,
          };
          // Conditional logic for deleting MOOP Values if MOOP Status is cleared
        } else if (
          action.payload === "moop_status" &&
          (object.setting === "moop_single" ||
            object.setting === "moop_family" ||
            object.setting === "moop_cum_single" ||
            object.setting === "moop_cum_family")
        ) {
          return {
            ...object,
            name: "",
            value: [],
            required: true,
            error: false,
          };
          // Conditional logic for deleting Approved Values if Adjudication Status is cleared
        } else if (
          action.payload === "adjudication_status" &&
          object.setting === "approved_values"
        ) {
          return {
            ...object,
            name: "",
            value: [],
            required: false,
            error: false,
          };
          // Conditional logic for deleting mhsud values if mhsud indicator is cleared
        } else if (
          action.payload === "mhsud_indicator" &&
          object.setting === "mhsud_values"
        ) {
          return {
            ...object,
            name: "",
            value: [],
            required: false,
            error: false,
          };
          // Conditional logic for deleting medsurg values if medsurg indicator is cleared
        } else if (
          action.payload === "medsurg_indicator" &&
          object.setting === "medsurg_values"
        ) {
          return {
            ...object,
            name: "",
            value: [],
            required: false,
            error: false,
          };
          // Conditional logic for making Service Start Date Format not required if Service Start Date is cleared
        } else if (
          action.payload === "service_start_date" &&
          object.setting === "service_start_date_format"
        ) {
          return {
            ...object,
            required: false,
            error: false,
          };
        } else {
          return object;
        }
      });
      return { ...state, claimsCols: tmpDelete };
    case SUBMIT_COLS:
      let tmpSubmit = state.claimsCols;
      tmpSubmit = tmpSubmit.map((object) => {
        if (object.value.length === 0 && object.required === true) {
          return {
            ...object,
            error: true,
          };
        } else {
          return object;
        }
      });
      return { ...state, claimsCols: tmpSubmit };
    case CHECKBOX_FILL:
      let tmpCheck = state.claimsCols;
      let tmpName = !action.payload.checked ? "" : action.payload.checkboxName;

      tmpCheck = tmpCheck.map((object) => {
        if (
          object.setting === action.payload.setting &&
          action.payload.checked === true
        ) {
          let checkboxValues = [...object.value];
          checkboxValues.push(action.payload.checkboxName);
          return {
            ...object,
            name: tmpName,
            value: checkboxValues,
            error: false,
          };
        } else if (
          object.setting === action.payload.setting &&
          action.payload.checked === false
        ) {
          let checkboxValues = [...object.value];
          let removeResultIndex = checkboxValues.findIndex(
            (o) => o === action.payload.checkboxName
          );
          checkboxValues.splice(removeResultIndex, 1);
          return {
            ...object,
            name: tmpName,
            value: checkboxValues,
            error: checkboxValues.length === 0 ? true : false,
          };
        } else {
          return object;
        }
      });
      return { ...state, claimsCols: tmpCheck };
    case CHECKBOX_INITIALIZE:
      let tmpCheckbox = state.checkboxValues;

      tmpCheckbox = tmpCheckbox.map((object) => {
        if (
          action.payload.id === "network_status" &&
          action.payload.name !== "N/A - All In or Out of Network" &&
          object.setting === "network_values"
        ) {
          return {
            ...object,
            options: action.payload.checkboxValues,
          };
        } else if (
          action.payload.id === "network_status" &&
          action.payload.name === "N/A - All In or Out of Network" &&
          object.setting === "network_values"
        ) {
          return {
            ...object,
            options: [
              { value: "All in Network", checked: false },
              { value: "All Out of Network", checked: false },
            ]
          };
        } else if (
          action.payload.id === "inpatient_outpatient" &&
          action.payload.name !== "All Inpatient or Outpatient" &&
          object.setting === "inpatient_values"
        ) {
          return {
            ...object,
            options: action.payload.checkboxValues,
          };
        } else if (
          action.payload.id === "inpatient_outpatient" &&
          action.payload.name === "All Inpatient or Outpatient" &&
          object.setting === "inpatient_values"
        ) {
          return {
            ...object,
            options: [
              { value: "All Inpatient", checked: false },
              { value: "All Outpatient", checked: false },
            ],
          };
        } else if (
          (action.payload.id === "moop_status" && object.setting === "moop_values") ||
          (action.payload.id === "adjudication_status" && object.setting === "approved_values") ||
          (action.payload.id === "mhsud_indicator" && object.setting === "mhsud_values") ||
          (action.payload.id === "medsurg_indicator" && object.setting === "medsurg_values")
        ) {
          return {
            ...object,
            options: action.payload.checkboxValues,
          };
        } else {
          return { ...object, };
        }
      })

      return {...state, checkboxValues: tmpCheckbox};

    case CHECKBOX_RETAIN:
      let tmpRetain = state.checkboxValues;

      tmpRetain = tmpRetain.map((obj) => {
        if (obj.setting === action.payload.setting) {
          let options = obj.options;
          options = options.map((option) => {
            if (action.payload.value === option.value) {
              return {
                ...option, 
                checked: action.payload.checked,
              }
            } else {
              return {
                ...option,
              }
            }
          })
          return {
            ...obj,
            options: options,
          }
        } else {
          return {
            ...obj,
          }
        }
      })

      return {...state, checkboxValues: tmpRetain};
    default:
      return state;
  }
}
