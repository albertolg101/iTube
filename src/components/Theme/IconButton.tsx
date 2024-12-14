import styled from "styled-components";

export interface IconButtonProps {
  $userSelect?: "none" | "text";
}

export const IconButton = styled.button<IconButtonProps>`
  color: #2c302e;
  padding: 0;
  font-size: inherit;
  font-weight: inherit;
  text-decoration: inherit;
  background-color: transparent;
  border: none;
  display: contents;
  cursor: pointer;
  ${({ $userSelect }) => $userSelect && `user-select: ${$userSelect}`};
`;
