import type { BoxProps } from "./Box.tsx";

import styled from "styled-components";
import { Box } from "./Box.tsx";

export interface FixedBoxProps extends Omit<BoxProps, "$position"> {}

export const FixedBox = styled(Box)<FixedBoxProps>`
  position: fixed;
`;
