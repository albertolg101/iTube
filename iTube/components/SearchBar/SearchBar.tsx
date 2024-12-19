import styled from "styled-components";
import Search from "@/assets/icons/search.svg?react";
import { useForm } from "react-hook-form";
import { Button, FlexBox } from "@/components/Theme";
import { CircularProgress } from "@rmwc/circular-progress";

type InputProps = { $wide?: boolean };

const Input = styled.input<InputProps>`
  font-size: 1em;
  width: ${({ $wide }) => ($wide ? "20em" : "11em")};
  padding: 0.2em 0.6em;
  border-radius: 1em 0 0 1em;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  caret-color: ${({ theme }) => theme.palette.secondary.main};
  outline: none;

  &:focus {
    border: 2px solid ${({ theme }) => theme.palette.secondary.light};
  }
`;

const SubmitButton = styled(Button)`
  width: 2em;
  padding: 0.3em 0.5em 0.1em 0.2em;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 0 1em 1em 0;
`;

export interface SearchBarProps {
  onSearch(query: string): void;
  defaultValue?: string;
  isLoading?: boolean;
  wide?: boolean;
}
export function SearchBar({
  onSearch,
  defaultValue,
  wide,
  isLoading,
}: SearchBarProps) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => onSearch(data.search))}>
      <FlexBox $direction="row">
        <Input
          type="text"
          placeholder="Search..."
          defaultValue={defaultValue}
          $wide={wide}
          {...register("search", { required: true })}
        />
        <SubmitButton type="submit" $variant="contained">
          {isLoading ? (
            <CircularProgress size="small" color="red" />
          ) : (
            <Search fill="currentColor" width="1em" height="1em" />
          )}
        </SubmitButton>
      </FlexBox>
    </form>
  );
}
