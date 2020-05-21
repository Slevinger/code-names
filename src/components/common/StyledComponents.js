import React from "react";
import styled, { css } from "styled-components";

export const Button = styled.div`
  display: inline-flex;
  height: 30px;
  background-color: ${({ bgColor }) => bgColor || "#2f78b9"};
  border: solid thin;
  color: ${({ color }) => color || "white"};
  padding: 5px 20px;
  display: inline-flex;
  align-items: center;
  border: none;
  margin: 5px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 7px;
  box-shadow: 1px 2px 5px black;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.7;
      pointer-events: none;
    `};
  ${({ style }) =>
    css`
      ${style}
    `}
  &:hover {
    cursor: pointer;
    transform: translateY(-4px);
    box-shadow: 1px 2px 9px black;
  }
`;
