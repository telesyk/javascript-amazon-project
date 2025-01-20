export function createArr(count) {
  if (!count) return Error('Func "createArr" get uncorrect "count"');
  let newArr = [];

  for (let i = 0; i < count; i++) {
    newArr.push('' + (i + 1));
  }

  return newArr;
}

/**
 * @param {Array} attrList array of object-list attributes for button
 */
export function getStringAttributes(attrList) {
  if (!(attrList instanceof Array)) return Error('"attrList" is not an Array.');

  let attrString = '';

  attrList.forEach(obj => {
    for (const [key, value] of Object.entries(obj)) {
      attrString += ` ${key}="${value}"`;
    }
  });
  /* 
  arrList = [{
    "data-attr": "some-data",
    "more-attr": "another-attr"
  }]
  */

  return attrString;
}
