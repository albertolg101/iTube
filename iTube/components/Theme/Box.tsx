import styled from "styled-components";
import { motion } from "framer-motion";

export interface BoxProps {
  $position?: "absolute" | "relative" | "fixed";
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $width?: string;
  $maxWidth?: string;
  $height?: string;
  $maxHeight?: string;
  $padding?: string;
  $margin?: string;
  $flexGrow?: boolean;
  $overflow?: string;
  $scrollbarWidth?: "auto" | "thin" | "none";
  $gridColumn?: string;
  $gridRow?: string;
  $transform?: string;
  $fontSize?: string;
  $border?: string;
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
  ${({ $maxWidth }) => $maxWidth && `max-width: ${$maxWidth}`};
  ${({ $height }) => $height && `height: ${$height}`};
  ${({ $maxHeight }) => $maxHeight && `max-height: ${$maxHeight}`};
  ${({ $padding }) => $padding && `padding: ${$padding}`};
  ${({ $margin }) => $margin && `margin: ${$margin}`};
  ${({ $flexGrow }) => $flexGrow && "flex-grow: 1"};
  ${({ $overflow }) => $overflow && `overflow: ${$overflow}`};
  ${({ $scrollbarWidth }) =>
    $scrollbarWidth && `scrollbar-width: ${$scrollbarWidth}`};
  ${({ $gridColumn }) => $gridColumn && `grid-column: ${$gridColumn}`};
  ${({ $gridRow }) => $gridRow && `grid-row: ${$gridRow}`};
  ${({ $transform }) => $transform && `transform: ${$transform}`};
  ${({ $fontSize }) => $fontSize && `font-size: ${$fontSize}`};
  ${({ $background }) => $background && `background: ${$background}`};
  ${({ $backgroundSize }) =>
    $backgroundSize && `background-size: ${$backgroundSize}`};
  ${({ $border }) => $border && `border: ${$border}`};
  ${({ $borderRadius }) => $borderRadius && `border-radius: ${$borderRadius}`};
  box-sizing: border-box;
`;
