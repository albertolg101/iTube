import { useForm } from "react-hook-form";

export interface SearchBarProps {
  onSearch(query: string): void;
}
export function SearchBar({ onSearch }: SearchBarProps) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => onSearch(data.search))}>
      <input
        type="text"
        placeholder="Search..."
        {...register("search", { required: true })}
      />
      <button type="submit">Search</button>
    </form>
  );
}
