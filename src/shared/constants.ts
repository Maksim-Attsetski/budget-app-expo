import { Dimensions } from 'react-native';

export const colors = {
  dark: '#333',
  darkBlock: '#454545',
  white: '#f1f1f1',
  whiteBlock: '#fff',
  transparent: 'transparent',
  purple: '#5460FE',
  green: '#3A984D',
  red: '#cf4343',
};
export type TColors = typeof colors;

export const screen = {
  height: Dimensions.get('screen').height,
  width: Dimensions.get('screen').width,
};
