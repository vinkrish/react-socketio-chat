export const saveValueInLocal = (key, value) => {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem(key, value);
  }
}
  
export const removeValueFromLocal = (key) => {
  if (typeof Storage !== 'undefined') {
    localStorage.removeItem(key);
  }
}
  
export const getValueFromLocal = (key) => {
  if (typeof Storage !== 'undefined') {
    return localStorage.getItem(key);
  }
}
  
export const destroyLocal = () => {
  if (typeof Storage !== 'undefined') {
    localStorage.clear();
  }
}
