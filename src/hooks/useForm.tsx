import { useState } from 'react';

export const useForm = <T extends Record<string, any>>(initState: T) => {
  const [state, setState] = useState(initState);

  const changeValue = <K extends keyof T>(field: K, value: T[K]) => {
    setState({
      ...state,
      [field]: value
    });
  };

  return {
    ...state,
    form: state,
    changeValue
  };
};
