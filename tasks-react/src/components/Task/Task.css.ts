import { style } from '@vanilla-extract/css';
import { vars } from '../../designTokens.css';

export const taskItem = style({
  display: 'flex',
  alignItems: 'center',
  padding: vars.space.medium,
  borderBottom: `1px solid ${vars.color.text}`,
  fontSize: '16px',
});

export const button = style({
  marginLeft: vars.space.small,
  padding: `${vars.space.small} ${vars.space.medium}`,
  borderRadius: vars.borderRadius,
  background: vars.color.primary,
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.8
  }
});

export const deleteButton = style([
  button, // Reference 'button' directly since it's now a separate definition
  {
    background: vars.color.danger // Overrides the 'background' property
  }
]);

export const inputText = style({
  flexGrow: 1,
  padding: '3px',
  border: `1px solid ${vars.color.lightGrey}`, // Assuming 'lightGrey' is defined in your tokens
  borderRadius: vars.borderRadius,
  fontSize: '12px',
  color: vars.color.text,
  background: 'white',
  outline: 'none',

  // Subtle transition for border and background changes
  transition: 'border-color 0.2s, background-color 0.2s',

  // Placeholder styling
  '::placeholder': {
    color: vars.color.grey
  }
});

export const inputTextReadonly = style({
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
});

export const checkbox = style({
  margin: '0 10px',
  position: 'relative',
  transform: 'scale(2)'
})