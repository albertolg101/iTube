import styled from "styled-components";

export interface BoxProps {
  $position?: "absolute" | "relative";
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $width?: string;
  $height?: string;
  $padding?: string;
  $margin?: string;
  $overflow?: "scroll" | "hidden" | "auto";
  $transform?: string;
  $fontSize?: string;
  $borderRadius?: string;
  $backgroundColor?: string;
}

export const Box = styled.div<BoxProps>`
  ${({ $position }) => $position && `position: ${$position}`};
  ${({ $top }) => $top && `top: ${$top}`};
  ${({ $left }) => $left && `left: ${$left}`};
  ${({ $right }) => $right && `right: ${$right}`};
  ${({ $bottom }) => $bottom && `bottom: ${$bottom}`};
  ${({ $width }) => $width && `width: ${$width}`};
  ${({ $height }) => $height && `height: ${$height}`};
  ${({ $padding }) => $padding && `padding: ${$padding}`};
  ${({ $margin }) => $margin && `margin: ${$margin}`};
  ${({ $overflow }) => $overflow && `overflow: ${$overflow}`};
  ${({ $transform }) => $transform && `transform: ${$transform}`};
  ${({ $fontSize }) => $fontSize && `font-size: ${$fontSize}`};
  ${({ $backgroundColor }) =>
    $backgroundColor && `background-color: ${$backgroundColor}`};
  ${({ $borderRadius }) => $borderRadius && `border-radius: ${$borderRadius}`};
  box-sizing: border-box;
`;
