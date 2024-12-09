const REGEX = {
 EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
 ERROR_CODE: /^[4][0-9][0-9]$/,
 SUCCESS_CODE: /^[^2]*/,
 SERIAL_NO: /^\d{5}$/,
 PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/
}

export default REGEX
