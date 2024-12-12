import styled from "styled-components";

export interface BoxProps {
  $position?: "absolute" | "relative";
  $width?: string;
  $height?: string;
  $padding?: string;
  $margin?: string;
  $overflow?: "scroll" | "hidden" | "auto";
  $transform?: string;
}

export const Box = styled.div<BoxProps>`
  ${({ $position }) => $position && `position: ${$position}`};
  ${({ $width }) => $width && `width: ${$width}`};
  ${({ $height }) => $height && `height: ${$height}`};
  ${({ $padding }) => $padding && `padding: ${$padding}`};
  ${({ $margin }) => $margin && `margin: ${$margin}`};
  ${({ $overflow }) => $overflow && `overflow: ${$overflow}`};
  ${({ $transform }) => $transform && `transform: ${$transform}`};
  box-sizing: border-box;
`;
