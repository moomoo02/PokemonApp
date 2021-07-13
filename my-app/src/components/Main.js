import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  position: relative;
  width: 2712px;
  height: 1080px;

  /* Blue Tint */

  background: #699bf7;
  /* Secondary / Black */

  border: 4px solid #000000;
  box-sizing: border-box;
`;
const Title = styled.title`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  width: 820.88px;
  height: 335px;
  left: 200px;
  top: calc(50% - 335px / 2 - 231.5px);
`;
const TitleName = styled.title`
  position: static;
  width: 672px;
  left: 0px;
  top: 0px;
  bottom: 181px;

  /* Playground/Intro Heading */

  font-family: Whyte Inktrap;
  font-style: normal;
  font-weight: 800;
  font-size: 128px;
  line-height: 120%;
  color: #000000;
  /* identical to box height, or 154px */

  display: flex;
  align-items: center;
`;
function Main() {
  return (
    <div>
      <Wrapper />
      <Title><TitleName>Resources</TitleName></Title>
    </div>
  );
}

export default Main;
