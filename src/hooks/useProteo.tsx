import { useContext } from 'react';
import ProteoContext from '../contexts/ProteoProvider';

const useProteo = () => {
  return useContext(ProteoContext);
};

export default useProteo;