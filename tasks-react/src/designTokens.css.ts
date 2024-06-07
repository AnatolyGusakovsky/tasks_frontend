import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  space: {
    small: '6px',
    medium: '12px',
    large: '24px',
  },
  color: {
    primary: '#6798e2',
    danger: '#f84f5f',
    text: '#212529',
    lightGrey: '#e6e8ec',
    lightBlue: '#d9e5ff',
    grey: '#c7c7c7'
  },
  borderRadius: '4px'
});
