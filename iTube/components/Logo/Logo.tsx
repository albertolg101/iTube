import iTubeLogoMark from "@/assets/itube-logo-mark.svg";
import iTubeLogoVertical from "@/assets/itube-logo-vertical.svg";
import iTubeLogoHorizontal from "@/assets/itube-logo-horizontal.svg";
import { Box, IconButton } from "@/components/Theme";

interface LogoProps {
  variant: "mark" | "horizontal" | "vertical";
}

const LOGO = {
  mark: {
    src: iTubeLogoMark,
    width: 150,
    height: 150,
  },
  vertical: {
    src: iTubeLogoVertical,
    width: 115,
    height: 150,
  },
  horizontal: {
    src: iTubeLogoHorizontal,
    width: 300,
    height: 95,
  },
};

export function Logo({ variant }: LogoProps) {
  const logo = LOGO[variant];
  return (
    <Box
      $width={`calc(${logo.width}em / 40)`}
      $height={`calc(${logo.height}em / 40)`}
    >
      <IconButton>
        <img src={logo.src} alt="Logo" />
      </IconButton>
    </Box>
  );
}
