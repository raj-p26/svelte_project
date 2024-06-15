/**
 * @param {string} value
 * @returns {boolean}
 */
export function isEmpty(value) {
  return value.trim().length === 0;
}

/**
 * @param {string} value
 * @returns {boolean}
 */
export function isValidEmail(value) {
  return value.trim().includes("@");
}
