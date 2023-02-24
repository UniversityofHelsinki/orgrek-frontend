import { useSelector } from 'react-redux';
import { filterAttributeDuplicates } from '../actions/utilAction';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { codeAttributes as codes } from '../constants/variables';

const useAttributes = () => {
  const { t } = useTranslation();
  const {
    node,
    nodeAttributes,
    nodeAttributesHistory,
    nodeAttributesFuture,
    showHistory,
    showComing,
  } = useSelector((state) => ({
    node: state.nrd.node,
    nodeAttributes: state.nrd.nodeAttributes,
    nodeAttributesHistory: state.nrd.nodeAttributesHistory,
    nodeAttributesFuture: state.nrd.nodeAttributesFuture,
    showHistory: state.nvrd.showHistory,
    showComing: state.nvrd.showComing,
  }));

  let attributeData = nodeAttributes;

  if (showHistory && showComing && nodeAttributesHistory && nodeAttributes) {
    attributeData = filterAttributeDuplicates(
      nodeAttributesHistory,
      nodeAttributesFuture
    );
  } else if (showHistory && nodeAttributesHistory) {
    // History contains also current data
    attributeData = nodeAttributesHistory;
  } else if (showComing && nodeAttributesFuture) {
    // Future contains also current data
    attributeData = nodeAttributesFuture;
  }

  return useMemo(() => {
    const nameAttributes = attributeData
      ? attributeData.filter((elem) => /^name_(fi|sv|en)$/.test(elem.key))
      : [];

    const typeAttributes = attributeData
      ? attributeData.filter((elem) => elem.key === 'type')
      : [];

    const uniqueIdAttribute = node
      ? {
          key: 'unique_id',
          value: node.uniqueId,
          startDate: null,
          endDate: null,
        }
      : {
          key: 'unique_id',
          value: t('no_value'),
          startDate: null,
          endDate: null,
        };

    const codeAttributes = attributeData
      ? [
          uniqueIdAttribute,
          ...attributeData.filter((a) => codes.includes(a.key)),
        ].filter(
          (a) => !nameAttributes.includes(a) && !typeAttributes.includes(a)
        )
      : [];

    const otherAttributes = attributeData
      ? attributeData.filter((elem) => {
          return (
            !nameAttributes.includes(elem) &&
            !typeAttributes.includes(elem) &&
            !codeAttributes.includes(elem)
          );
        })
      : [];

    return { nameAttributes, typeAttributes, codeAttributes, otherAttributes };
  }, [attributeData]);
};

export default useAttributes;
