import styled from "styled-components";
import Search from "@/assets/search.svg";
import { useForm } from "react-hook-form";
import { Button, FlexBox } from "@/components/Theme";

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
  padding: 0 0.3em;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  border-radius: 0 1em 1em 0;
`;

const Icon = styled.img`
  width: 1em;
  filter: invert(1);
  transform: translate(-0.1em, 0.1em);
`;

export interface SearchBarProps {
  onSearch(query: string): void;
  defaultValue?: string;
  wide?: boolean;
}
export function SearchBar({ onSearch, defaultValue, wide }: SearchBarProps) {
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
          <Icon src={Search} alt="Search" />
        </SubmitButton>
      </FlexBox>
    </form>
  );
}
