import React from "react";
import styled, { css } from "styled-components";

const StyledCard = styled.div`
  background-color: ${({ showColor, color }) => {
    return showColor ? color : "rgba(0,0,0,0.2)";
  }};
  width: 17%;
  height: 80px;
  border-radius: 14px;
  border: solid thin;
  flex-direction: column;
  font-size: 1vw;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 720px) {
    font-size: 3vw;
  }
  ${({ disabled }) => {
    return (
      disabled &&
      css`
        opacity: 0.5;

        pointer-events: none;
      `
    );
  }}
  &:hover {
    cursor: pointer;
    background-color: lightgrey;
  }
`;

const ColorBox = styled.div`
  position: relative;
  width: 80%;
  height: 25px;
  background-color: white;
  border: 1px solid;
  .word {
    position: absolute;
    z-index: 1;
    font-weight: 600;
    height: 100%;
    width: 100%;
    text-align: center;
    opacity: 1 !important;
  }
`;

const ProgressBar = styled.div`
  position: relative;
  height: 100%;
  ${({ teamColor, flipTeam, clickCount, playersCount }) => {
    let backgroundColor = "white";
    let pcnt = 100;
    if (flipTeam) {
      backgroundColor = flipTeam;
    } else {
      if (clickCount > 0) {
        backgroundColor = teamColor;
        pcnt = Math.round((clickCount / playersCount) * 100);
      }
    }
    return css`
      background-color: ${backgroundColor};
      width: ${pcnt}%;
    `;
  }}
`;

export default ({ indexes, onClick, teamColor, word, disabled, ...card }) => {
  return (
    <StyledCard key={indexes} {...card} disabled={disabled} onClick={onClick}>
      <ColorBox {...card}>
        <div className={"word"}>{word}</div>
        <ProgressBar teamColor={teamColor} {...card} />
      </ColorBox>
    </StyledCard>
  );
};
