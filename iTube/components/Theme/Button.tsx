import styled from "styled-components";

type buttonVariant = "contained" | "outlined";

export interface ButtonProps {
  $variant: buttonVariant;
}

export const Button = styled.button<ButtonProps>`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.sizes.button};
  color: ${({ $variant, theme }) =>
    $variant === "contained"
      ? theme.palette.text.primary
      : theme.palette.primary.main};
  background-color: ${({ $variant, theme }) =>
    $variant === "contained"
      ? theme.palette.primary.main
      : theme.palette.background.primary};
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  height: fit-content;
  padding: 0.5em 0.6em;
  border-radius: 2em;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ $variant, theme }) =>
      $variant === "contained"
        ? theme.palette.text.primary
        : theme.palette.primary.light};
    background-color: ${({ $variant, theme }) =>
      $variant === "contained"
        ? theme.palette.primary.light
        : theme.palette.background.primary};
    border-color: ${({ theme }) => theme.palette.primary.light};
  }

  &:active {
    color: ${({ $variant, theme }) =>
      $variant === "contained"
        ? theme.palette.text.primary
        : theme.palette.primary.dark};
    background-color: ${({ $variant, theme }) =>
      $variant === "contained"
        ? theme.palette.primary.dark
        : theme.palette.background.primary};
    border-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;
