import type * as youtube from "@/libs/youtube.d";
import styled from "styled-components";
import { Typography } from "@/components/Theme";
import { Link } from "react-router";

type VideosListVariant = "normal" | "mini";
type ULProps = { $variant: VideosListVariant };

const UL = styled.ul<ULProps>`
  font-size: ${({ $variant }) => ($variant === "normal" ? "1rem" : "0.75rem")};
`;

export interface VideosListProps {
  videos: youtube.VideosList;
  variant?: VideosListVariant;
}

export function VideosList({ videos, variant = "normal" }: VideosListProps) {
  return (
    <UL $variant={variant}>
      {videos.map((video) => (
        <li>
          <Link to={`/watch?v=${video.id.videoId}`}>
            <Typography as="a" $size="h5" $weight="medium">
              {video.title}
            </Typography>
          </Link>
        </li>
      ))}
    </UL>
  );
}
