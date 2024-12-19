import type { BoxProps } from "./Box.tsx";

import styled from "styled-components";
import { Box } from "./Box.tsx";

export interface GridProps extends BoxProps {
  $gridTemplateColumns: string;
  $gridGap?: string;
  $alignItems?: string;
}

export const Grid = styled(Box)<GridProps>`
  display: grid;
  grid-template-columns: ${({ $gridTemplateColumns }) => $gridTemplateColumns};
  ${({ $gridGap }) => $gridGap && `grid-gap: ${$gridGap}`};
  ${({ $alignItems }) => $alignItems && `align-items: ${$alignItems}`};
`;
