import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { fi } from 'date-fns/locale';
import i18n from '../i18n';

const { t } = i18n;

const formatDate = (date) => format(parseISO(date), 'P', { locale: fi });

export const showValidity = (startDate, endDate) => {
  const lang = i18n.language;
  if (startDate && endDate) {
    return formatDate(startDate) + ' - ' + formatDate(endDate);
  }
  if (startDate) {
    switch (lang) {
      case 'fi':
        return formatDate(startDate) + ' ' + t('from_date_react');

      default:
        return t('from_date_react') + ' ' + formatDate(startDate);
    }
  }

  if (endDate) {
    switch (lang) {
      case 'fi':
        return formatDate(endDate) + ' ' + t('until_date_react');

      default:
        return t('until_date_react') + ' ' + formatDate(endDate);
    }
  }

  return t('not_specified');
};

export const selectNameVersion = (i18n, item) => {
  switch (i18n.language) {
    case 'en':
      return item.nameEn;
    case 'fi':
      return item.nameFi;
    case 'sv':
      return item.nameSv;
    default:
      return item.nameFi;
  }
};

export const hierarchyDate = (hierarchy) => {
  return showValidity(hierarchy.startDate, hierarchy.endDate, i18n, t);
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
