import { useContext } from 'react';
import EditModeContext from '../contexts/EditModeContext';

const useEditMode = () => {
  return useContext(EditModeContext);
};

export default useEditMode;
