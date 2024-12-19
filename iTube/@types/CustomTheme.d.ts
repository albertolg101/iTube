import "styled-components";
import { CustomTheme } from "@/CustomTheme";

type CustomThemeType = typeof CustomTheme;

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends CustomThemeType {}
}
