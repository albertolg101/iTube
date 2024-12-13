import { FlexBox, Typography } from "@/components/Theme";

type ErrorCode = 404 | 500;

interface ErrorPageProps {
  errorCode: ErrorCode;
}

export function ErrorPage({ errorCode }: ErrorPageProps) {
  const message = {
    404: { title: "404", subtitle: "Page not found" },
    500: { title: "500", subtitle: "Internal server error" },
  };

  return (
    <FlexBox $centered $flexGrow>
      <Typography as="h1" $weight="bold">
        {message[errorCode].title}
      </Typography>
      <Typography as="h2" $size="p">
        {message[errorCode].subtitle}
      </Typography>
    </FlexBox>
  );
}
