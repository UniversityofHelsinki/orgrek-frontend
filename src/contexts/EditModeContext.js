import React, { useState } from 'react';
import { createContext } from 'react';

const EditModeContext = createContext();

export const EditModeProvider = ({ defaultModified, children }) => {
  const [editMode, setEditMode] = useState(false);
  const [modified, setModified] = useState(defaultModified);

  const edit = () => {
    setEditMode(true);
    setModified(false);
  };

  const close = () => {
    setEditMode(false);
    setModified(false);
  };

  return (
    <EditModeContext.Provider
      value={{
        editMode,
        modified,
        edit,
        close,
        setModified,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
};

export default EditModeContext;
