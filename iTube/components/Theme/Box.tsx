import styled from "styled-components";
import { motion } from "framer-motion";

export interface BoxProps {
  $position?: "absolute" | "relative" | "fixed";
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $width?: string;
  $height?: string;
  $padding?: string;
  $margin?: string;
  $flexGrow?: boolean;
  $overflow?: string;
  $scrollbarWidth?: "auto" | "thin" | "none";
  $transform?: string;
  $fontSize?: string;
  $borderRadius?: string;
  $background?: string;
  $backgroundSize?: string;
}

export const Box = styled(motion.div)<BoxProps>`
  ${({ $position }) => $position && `position: ${$position}`};
  ${({ $top }) => $top && `top: ${$top}`};
  ${({ $left }) => $left && `left: ${$left}`};
  ${({ $right }) => $right && `right: ${$right}`};
  ${({ $bottom }) => $bottom && `bottom: ${$bottom}`};
  ${({ $width }) => $width && `width: ${$width}`};
  ${({ $height }) => $height && `height: ${$height}`};
  ${({ $padding }) => $padding && `padding: ${$padding}`};
  ${({ $margin }) => $margin && `margin: ${$margin}`};
  ${({ $flexGrow }) => $flexGrow && "flex-grow: 1"};
  ${({ $overflow }) => $overflow && `overflow: ${$overflow}`};
  ${({ $scrollbarWidth }) =>
    $scrollbarWidth && `scrollbar-width: ${$scrollbarWidth}`};
  ${({ $transform }) => $transform && `transform: ${$transform}`};
  ${({ $fontSize }) => $fontSize && `font-size: ${$fontSize}`};
  ${({ $background }) => $background && `background: ${$background}`};
  ${({ $backgroundSize }) =>
    $backgroundSize && `background-size: ${$backgroundSize}`};
  ${({ $borderRadius }) => $borderRadius && `border-radius: ${$borderRadius}`};
  box-sizing: border-box;
`;
