import { 
  convertCentToDollar,
  createIntArray,
  convertAttrToString,
} from "../scripts/utils.js";

const elementRoot = document.getElementById('tests');

const newElement = (content, isGrouped = false) => {
  const element = document.createElement('div');
  if (isGrouped) {
    element.classList.add('test-group');
    element.innerHTML = `<h3>${content}</h3>`;
  } else {
    element.textContent = content;
  }
  return element;
};

/* Test case convertCentToDollar */
const elementTestGroup1 = newElement('"convertCentToDollar" should return value in dollar equivalent', true);
elementRoot.append(elementTestGroup1);

if (convertCentToDollar(0) === '0.00') {
  elementTestGroup1.append( newElement('"convertCentToDollar(0) = 0.00" passed ✅') );
} else {
  elementTestGroup1.append( newElement('"convertCentToDollar(0) = 0.00" failed ❌') );
}

if (convertCentToDollar(0.1) === '0.00') {
  elementTestGroup1.append( newElement('"convertCentToDollar(0.1) = 0.00" passed ✅') );
} else {
  elementTestGroup1.append( newElement('"convertCentToDollar(0.1) = 0.00" failed ❌') );
}

if (convertCentToDollar(2000.5) === '20.01') {
  elementTestGroup1.append( newElement('"convertCentToDollar(2000.5) = 20.01" passed ✅') );
} else {
  elementTestGroup1.append( newElement('"convertCentToDollar(2000.5) = 20.01" failed ❌') );
}

/* Test case createIntArray */
const elementTestGroup2 = newElement('"createIntArray" should return new Array created from the inputed number value', true);
elementRoot.append(elementTestGroup2);

if (createIntArray(0).length === 0 && [].length === 0) {
  elementTestGroup2.append( newElement(`"createIntArray(0) is [].length = 0" passed ✅`) );
} else {
  elementTestGroup2.append( newElement(`"createIntArray(0) is NOT [].length = 0" failed ❌`) );
}

if (createIntArray(5).length === 5 && [1,2,3,4,5].length === 5) {
  elementTestGroup2.append( newElement(`"createIntArray(0) is [].length = 5" passed ✅`) );
} else {
  elementTestGroup2.append( newElement(`"createIntArray(0) is NOT [].length = 5" failed ❌`) );
}

/* Test case convertAttrToString */
const elementTestGroup3 = newElement('"convertAttrToString" should return string of attributes', true);
elementRoot.append(elementTestGroup3);

if (convertAttrToString('') === undefined) {
  elementTestGroup3.append( newElement(`"convertAttrToString('') is undefined" passed ✅`) );
} else {
  elementTestGroup3.append( newElement(`"convertAttrToString(0) is NOT undefined" failed ❌`) );
}

const convertAttrListTest = {
  'data-test': 'test value',
};
const convertedAttrStringTest = "data-test=\"test value\"";
if (convertAttrToString(convertAttrListTest) === convertedAttrStringTest) {
  elementTestGroup3.append( newElement(`"convertAttrToString(${convertAttrListTest}) is ${convertedAttrStringTest}" passed ✅`) );
} else {
  elementTestGroup3.append( newElement(`"convertAttrToString(${convertAttrListTest}) is NOT ${convertedAttrStringTest}" failed ❌`) );
}
