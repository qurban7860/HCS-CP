/**
 * Compares two values to determine if they are deeply equal.
 *
 * @param {*} obj1 - The first value to compare.
 * @param {*} obj2 - The second value to compare.
 * @returns {boolean} - Returns true if the values are deeply equal, otherwise false.
 */
export const deepEqual = (obj1, obj2) => {
 if (obj1 === obj2) return true
 if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
  return false
 }
 if (Array.isArray(obj1) !== Array.isArray(obj2)) return false

 const keys1 = Object.keys(obj1)
 const keys2 = Object.keys(obj2)

 if (keys1.length !== keys2.length) return false

 return keys1.every(key => deepEqual(obj1[key], obj2[key]))
}
