import { useWindowDimensions } from 'react-native';

export const useDimensions = () => {
  const { height, width } = useWindowDimensions();

  const wp = (percentage: number) => {
    return (percentage * width) / 100;
  };

  const hp = (percentage: number) => {
    return (percentage * height) / 100;
  };

  return {
    wp,
    hp
  };
};