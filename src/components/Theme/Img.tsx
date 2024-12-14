import styled from "styled-components";

export interface ImgProps {
  $objectFit?: "cover" | "contain";
}

export const Img = styled.img<ImgProps>`
  ${({ $objectFit }) => $objectFit && `object-fit: ${$objectFit}`};
`;
