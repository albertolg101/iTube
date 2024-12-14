import styled from "styled-components";
import { Box } from "@/components/Theme/Box.tsx";

export interface ImgProps {
  $objectFit?: "cover" | "contain";
}

export const Img = styled(Box).attrs({ as: "img" })<ImgProps>`
  ${({ $objectFit }) => $objectFit && `object-fit: ${$objectFit}`};
`;
