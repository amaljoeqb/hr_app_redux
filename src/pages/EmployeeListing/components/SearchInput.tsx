export interface SearchInputProps {
  onChange?: (text: string) => void;
  value: string;
}

export default function SearchInput({ onChange, value }: SearchInputProps) {
  return (
    <input
      type="text"
      name="key"
      className="search-input"
      placeholder="Search employees..."
      autoComplete="off"
      onInput={(e) => {
        onChange && onChange(e.currentTarget.value.trim().toLowerCase());
      }}
      value={value}
    />
  );
}
