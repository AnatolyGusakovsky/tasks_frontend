import {style} from "@vanilla-extract/css";
import {vars} from "../../designTokens.css";

export const taskList = style({
  padding: 0,
  margin: 0
});

export const addField = style({
  display: 'center',
  alignItems: 'center',
  padding: vars.space.medium,
  borderBottom: `1px solid ${vars.color.text}`,
  fontSize: '16px',
});

export const addButton = style({
  marginLeft: vars.space.small,
  padding: `${vars.space.small} ${vars.space.medium}`,
  borderRadius: vars.borderRadius,
  background: vars.color.green,
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  ':hover': {
    opacity: 0.8
  }
});