// Function to check for an error in the three Checkbox components for
// In-Network values, Inpatient values, Adjudication Pass Status values,
// and MOOP values

export default function CheckErrorCheckbox(data, variable) {
  var arr = data
    .filter(({ setting }) => setting === variable)
    .map((option) => option.error);

  return arr[0];
}
