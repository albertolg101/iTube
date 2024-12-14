import styled from "styled-components";
import { Box, BoxProps } from "@/components/Theme/Box.tsx";

export interface ListItemProps extends BoxProps {
  $listStyleType?: "disc" | "circle" | "none";
}
export const ListItem = styled(Box).attrs({ as: "li" })<ListItemProps>`
  list-style-type: ${({ $listStyleType }) =>
    $listStyleType ? $listStyleType : "none"};
`;
