import { useContext } from 'react';
import { ProteoContext } from '../contexts/ProteoContext';

export const useProteo = () => useContext(ProteoContext);