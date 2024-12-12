import type { BoxProps } from "./Box.tsx";

import styled from "styled-components";
import { Box } from "./Box.tsx";

export interface FixedBoxProps extends Omit<BoxProps, "$position"> {
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
}

export const FixedBox = styled(Box)<FixedBoxProps>`
  position: fixed;
  ${({ $top }) => $top && `top: ${$top}`};
  ${({ $left }) => $left && `left: ${$left}`};
  ${({ $right }) => $right && `right: ${$right}`};
  ${({ $bottom }) => $bottom && `bottom: ${$bottom}`};
`;
