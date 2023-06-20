import { showValidity } from '../utils/showValidity';

/** @deprecated */
export const hierarchyDate = (hierarchy) => {
  return showValidity(hierarchy.startDate, hierarchy.endDate);
};

/*
Flatten the tree structure for treeSearch component
The input must be array
*/
export const flattenTree = (input, res = []) => {
  input
    ? input.map((obj) => {
        if (!obj.children) {
          res.push(obj);
        } else {
          const modObj = Object.assign({}, obj);
          modObj.children = [];
          res.push(modObj);
          flattenTree(obj.children, res);
        }
      })
    : '';
  return res;
};

export const filterNodeDuplicates = (historyArray, futureArray) => {
  const isSameHierarchy = (a, b) => {
    return Object.keys(a).every((property) => a[property] === b[property]);
  };

  const result = historyArray ? [...historyArray] : [];
  if (futureArray && historyArray) {
    futureArray.map((elem) => {
      const found = historyArray.find(
        (historyElem) => historyElem.node.id === elem.node.id
      );
      if (found) {
        elem.hierarchies.forEach((a) => {
          const alreadyExists = found.hierarchies.find((b) =>
            isSameHierarchy(a, b)
          );
          if (!alreadyExists) {
            found.hierarchies.push(a);
          }
        });
      } else {
        result.push(elem);
      }
    });
  }
  return result;
};

export const filterAttributeDuplicates = (historyArray, futureArray) => {
  const result = historyArray ? [...historyArray] : [];
  if (historyArray && futureArray) {
    futureArray.map((elem) => {
      const found = historyArray.find((historyElem) =>
        deepEqual(historyElem, elem)
      );
      if (!found) {
        result.push(elem);
      }
    });
  }
  return result;
};

export const datesOverlap = (a, b, overlapper) => {
  return (
    (!a || a.getTime() <= overlapper.getTime()) &&
    (!b || b.getTime() >= overlapper.getTime())
  );
};

export const deepEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
};

const isObject = (object) => {
  return object !== null && typeof object === 'object';
};

export const containsAll = (a, b) => {
  return a.length > b.length
    ? a.every((ai) => b.includes(ai))
    : b.every((bi) => a.includes(bi));
};
