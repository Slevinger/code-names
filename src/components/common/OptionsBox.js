import React from "react";
import styled from "styled-components";

const OptionsBox = styled.div`
  padding: 20px 50px;
  border: solid thin lightgrey;
  position: relative;
  display: flex;
  flex-direction: row;
  ${({ style }) => style}
  .optionWrapper {
  }
`;

export default ({ children }) => {
  return <OptionsBox>{children}</OptionsBox>;
};
