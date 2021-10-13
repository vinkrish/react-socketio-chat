export const required = (value) => (value ? undefined : "Required");

export const minLength = (max) => (value) =>
  value && value.length < max
    ? `Must be ${max} characters or more`
    : undefined;

export const maxLength = (max) => (value) =>
  value && value.length > max
    ? `Must be ${max} characters or less`
    : undefined;

export const number = (value) =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;

export const minValue = (min) => (value) =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

export const passwordRule = (value) =>
  value && !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/.test(value)
    ? "Must contain at least one number and one uppercase and lowercase letter and one symbol, and at least 8 or more characters"
    : undefined;

export const noSpaceAllowed = (value) => {
  if(value && typeof value === "string") {
    return value.trim() ? undefined : "Enter a valid text. Only space is not allowed.";
  } else {
    return undefined;
  }
}

export const url = (value) => {
  const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(value && !urlPattern.test(value)) {
    return "URL is invalid."
  } else {
    return undefined;
  }
}