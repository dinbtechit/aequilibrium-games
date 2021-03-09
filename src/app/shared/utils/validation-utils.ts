
export function validate(object: any, schema: any): boolean {
  const valid = true;
  const invalid = false;
  const errors = Object.keys(schema).filter((key) => {
    return !schema[key](object[key]);
  }).map((key) => {
    return new Error(key + ' is invalid.');
  });

  if (errors.length > 0) {
    /*errors.forEach((error: any) => {
      /!*console.log(error.message);*!/
    });*/
    return invalid;
  } else {
    // valid
    return valid;
  }
}

export function checkIfValidNumber(val: any): boolean {
  return !isNaN(val) && Number(val) === val;
}
