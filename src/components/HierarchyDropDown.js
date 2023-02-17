import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const HierarchyDropDown = (props) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('-');
  const [selectedHierarchies, setSelectedHierarchies] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
    props.onHierarchyChange(event.target.value);
  };

  useEffect(() => {
    const arr = props.selectedHierarchy.split(',');
    setSelectedHierarchies(arr);
  }, [props.selectedHierarchy]);

  useEffect(() => {
    if (props.hierarchySelection) {
      setValue(props.hierarchySelection);
    }
  }, [props.hierarchySelection]);

  return (
    <div>
      {selectedHierarchies && (
        <>
          <select value={value} onChange={handleChange}>
            <option value="">-</option>
            {selectedHierarchies.map((option) => (
              <option key={option} value={option}>
                {t(option)}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedHierarchy: state.tree.selectedHierarchy,
});

export default connect(mapStateToProps, null)(HierarchyDropDown);
