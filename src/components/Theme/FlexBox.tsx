import type { BoxProps } from "./Box.tsx";

import styled from "styled-components";
import { Box } from "./Box.tsx";

export interface FlexBoxProps extends BoxProps {
  $direction?: "row" | "column";
  $flexShrink?: boolean;
  $flexWrap?: boolean;
  $gap?: string;
  $centered?: boolean;
  $justifyContent?: string;
  $alignItems?: string;
}

export const FlexBox = styled(Box)<FlexBoxProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction || "row"};
  ${({ $flexShrink }) => $flexShrink && "flex-shrink: 1"};
  ${({ $flexWrap }) => $flexWrap && "flex-wrap: wrap"};
  ${({ $gap }) => $gap && `gap: ${$gap}`};
  ${({ $centered, $justifyContent }) =>
    $centered && !$justifyContent && "justify-content: center"};
  ${({ $centered, $alignItems }) =>
    $centered && !$alignItems && "align-items: center"};
  ${({ $justifyContent }) =>
    $justifyContent && `justify-content: ${$justifyContent}`};
  ${({ $alignItems }) => $alignItems && `align-items: ${$alignItems}`};
`;
