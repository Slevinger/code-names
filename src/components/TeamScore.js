import React from "react";
import styled from "styled-components";

const Continer = styled.div`
  flex-direction: column;
  display: flex;
  border: 1px gray dashed;
`;

const TeamColor = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  font-size: 32px;
  font-weight: 600;
  color: ${({ teamColor }) => teamColor};
`;

export default ({ teamColor, score }) => {
  return (
    <Continer>
      <TeamColor teamColor={teamColor}>{teamColor.toUpperCase()}</TeamColor>
      <TeamColor>{score}</TeamColor>
    </Continer>
  );
};
