import { style } from '@vanilla-extract/css';
import { vars } from '../../designTokens.css';

export const styles = {
  taskItem: style({
    display: 'flex',
    alignItems: 'center',
    padding: vars.space.medium,
    borderBottom: `1px solid ${vars.color.text}`,
  }),
  inputText: style({
    flexGrow: 1,
    marginRight: vars.space.small,
  }),
  button: style({
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
  }),
  deleteButton: style({
    background: vars.color.danger
  })
};
