/**
 *
 * Button
 *
 */
import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components/macro';

type Props = {
  children?: ReactNode | ReactNode[];
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  primary?: Boolean;
  secondary?: Boolean;
  active?: Boolean;
};

export function Button(props: Props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}

Button.primary = true;

const StyledButton = styled.button<Props>`
  margin: 4px;
  border: 0;
  cursor: pointer;
  padding: 12px 16px;
  text-transform: uppercase;
  &:hover {
    opacity: 0.8;
  }
  ${p =>
    p.primary &&
    css`
      color: white;
      background-color: #6ab6a9;
    `}
  ${p =>
    p.secondary &&
    css<Props>`
      background-color: ${p => (p.active ? '#6e6966' : 'white')};
      color: ${p => (p.active ? 'white' : 'black')};
      width: 75px;
      border: 2px solid black;
      &:hover {
        background-color: #6e6966;
        color: white;
      }
    `}
`;
