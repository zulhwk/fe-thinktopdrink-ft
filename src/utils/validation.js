export function isNegative(value) {
  let number = typeof value == 'string' ? parseFloat(value) : typeof value == 'number' ? value : 0;
  if (Math.sign(number) === -1) return true;
  else return false;
};

export function isNotNumberValue(value) {
  let regex = /[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g;
  if (regex.test(value)) return true;
  else return false;
};

export function isEmailValid(value) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};