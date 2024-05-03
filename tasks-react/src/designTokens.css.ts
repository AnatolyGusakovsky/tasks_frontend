import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  space: {
    small: '8px',
    medium: '16px',
    large: '32px',
  },
  color: {
    primary: '#007bff',
    danger: '#dc3545',
    text: '#212529',
    lightGrey: '#e6e8ec',
    lightBlue: '#d9e5ff',
    grey: '#c7c7c7'
  },
  borderRadius: '4px'
});
