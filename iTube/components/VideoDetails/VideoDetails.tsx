import type * as youtube from "@/hooks/youtube";
import { SWRResponse } from "swr";
import { Box, Typography } from "@/components/Theme";
import { CustomTheme } from "@/libs/CustomTheme.ts";
import { numberToShortFormat, toTimeAgoString } from "@/hooks/youtube";

export interface VideoDetailsProps {
  video: SWRResponse<youtube.Video | youtube.ErrorResponse>;
}

export function VideoDetails({ video }: VideoDetailsProps) {
  return video.isLoading ? (
    <>
      <Box
        animate={{ opacity: [0.6, 0.2, 0.6] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        $height={CustomTheme.font.sizes.h4}
        $width="40rem"
        $background="gray"
        $backgroundSize={`300% 300%`}
        $margin="1rem 0 0 0"
        $borderRadius="5px"
      />
      <Box
        animate={{ opacity: [0.6, 0.2, 0.6] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        $height={CustomTheme.font.sizes.h6}
        $width="20rem"
        $background="gray"
        $margin={CustomTheme.font.margin.h6}
        $borderRadius="5px"
      />
    </>
  ) : (
    video.data !== undefined && !("status" in video.data) && (
      <>
        <Typography as="h1" $size="h4" $weight="bold" $margin="1rem 0 0 0">
          {video.data.title}
        </Typography>
        <Typography as="h2" $size="h6" $weight="medium">
          {video.data.owner}
        </Typography>
        <Box
          $margin="10px 0 10px 10px"
          $padding="1px 20px"
          $background={CustomTheme.palette.primary.main}
          $borderRadius="12px"
        >
          <Typography as="p"></Typography>
          <Typography as="p" $margin="1rem 0" $weight="medium">
            <Typography as="span" $size="subtitle1" $weight="bold">
              {`${numberToShortFormat(video.data.views)} views`}
              {" • "}
              {toTimeAgoString(video.data.datePublished)}
              <br />
              {video.data.genre}
            </Typography>
            <br />
            {video.data.description}
          </Typography>
        </Box>
      </>
    )
  );
}
