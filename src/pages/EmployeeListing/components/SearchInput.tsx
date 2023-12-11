export default function SearchInput({ onChange }: { onChange?: (text: string) => void }) {
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
      />
    );
  }
  