import { style } from '@vanilla-extract/css';
import { vars } from '../../designTokens.css';

export const taskItem = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: vars.space.medium,
  borderBottom: `1px solid ${vars.color.text}`,
  fontSize: '15px',
  width: '600px',
});

export const completedTask = style({
  opacity: 0.3,
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
  button,
  {
    background: vars.color.danger // Overrides the 'background' property
  }
]);

export const inputText = style({
  flexGrow: 1,
  padding: '3px',
  border: `1px solid ${vars.color.lightGrey}`,
  borderRadius: vars.borderRadius,
  fontSize: '12px',
  color: vars.color.text,
  background: 'white',
  outline: 'none',

  // Subtle transition for border and background changes
  transition: 'border-color 0.2s, background-color 0.2s',

  '::placeholder': {
    color: vars.color.grey
  }
});

const baseTextStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'pre-wrap',
  overflowWrap: 'break-word',
  width: '100%',
  display: '-webkit-box',
  '-webkit-box-orient': 'vertical',
};

export const inputTextReadonly = style({
  ...baseTextStyle,
  '-webkit-line-clamp': '3' as any,
} as any);

export const expandedTextStyle = style({
  ...baseTextStyle,
  '-webkit-line-clamp': 'initial' as any,
} as any);

export const checkbox = style({
  margin: '0 10px',
  position: 'relative',
  transform: 'scale(2)'
})

export const checkboxAndTextContainer = style({
  display: 'flex',
  alignItems: 'center',
});

export const buttonsContainer = style({
  display: 'flex',
  alignItems: 'center',
});