import styled from "styled-components";
import { Box } from "@/components/Theme/Box.tsx";

export const List = styled(Box).attrs({ as: "ul" })`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;
