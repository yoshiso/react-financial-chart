
export const isString = (s) => {
  return typeof s === 'string' || s instanceof String
}

export const isArray = (a) => {
  return Object.prototype.toString.call(a) == '[object Array]';
}
