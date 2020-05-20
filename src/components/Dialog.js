import styled from "styled-components";

export default styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  input {
    padding: 10px;
    font-size: 22px;
  }
  .select-method-buttons {
    justify-content: space-around;
    display: flex;
  }
`;
