import styled from "styled-components";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span"
  | "p"
  | "button"
  | "subtitle1"
  | "subtitle2";
type FontWeight = "light" | "regular" | "medium" | "bold";

export interface TypographyProps {
  as?: TypographyVariant;
  $color?: string;
  $size?: TypographyVariant;
  $textAlign?: "left" | "center" | "right" | "start" | "end";
  $weight?: FontWeight;
  $italic?: boolean;
  $underline?: boolean;
  $margin?: string;
  $maxLines?: number;
  $whiteSpace?: "normal" | "nowrap" | "pre-wrap";
  $wordWrap?: "break-word";
  $hoverColor?: string;
  $underlinedOnHover?: boolean;
}

export const Typography = styled.p<TypographyProps>`
  font-family: ${({ theme }) => theme.font.family};
  color: ${({ theme, $color }) => $color || theme.palette.text.primary};
  font-size: ${({ theme, $size, as }) => theme.font.sizes[$size || as || "p"]};
  text-align: ${({ $textAlign }) => $textAlign || "left"};
  font-weight: ${({ theme, $weight }) =>
    theme.font.weights[$weight || "regular"]};
  font-style: ${({ $italic }) => ($italic ? "italic" : "normal")};
  text-decoration: ${({ $underline }) => ($underline ? "underline" : "none")};
  cursor: ${({ $underlinedOnHover }) =>
    $underlinedOnHover ? "pointer" : "inherit"};
  margin: ${({ $margin, theme, $size, as }) =>
    $margin || theme.font.margin[$size || as || "p"]};
  ${({ $maxLines }) =>
    $maxLines &&
    `display: -webkit-box;` +
      `-webkit-line-clamp: ${$maxLines};` +
      `-webkit-box-orient: vertical;` +
      `overflow: hidden;`};
  ${({ $whiteSpace }) => $whiteSpace && `white-space: ${$whiteSpace}`};
  ${({ $wordWrap }) => $wordWrap && `word-wrap: ${$wordWrap}`};

  &:hover {
    color: ${({ $hoverColor, $color }) => $hoverColor || $color};
    text-decoration: ${({ $underlinedOnHover }) =>
      $underlinedOnHover ? "underline" : "none"};
  }
`;
