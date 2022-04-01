// Format a number as a string with commas.
// By default, rounds to whole numbers.
// e.g. 123456.78 -> '123,456.78'
export function Comma(number, round = true) {
  var result = number;
  if (round) {
    result = Math.round(result);
  }
  return result.toLocaleString();
}

// Format a number as a string with commas and a dollar sign.
// By default, rounds to whole numbers.
// e.g. 123456.78 -> '$123,456'
export function Dollar(number, round = true) {
  return "$" + Comma(number, round);
}

// Format a number between 0 and 1 as a string with a percent sign.
// By default, rounds to whole numbers.
// e.g. 0.5 -> '50%'
export function Percent(number, round = true) {
  var result = 100 * number;
  if (round) {
    result = Math.round(result);
  }

  if (isNaN(result)){
    result = 0;
  }

  return result.toString() + "%";
}