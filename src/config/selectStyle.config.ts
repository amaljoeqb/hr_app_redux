import { GroupBase, StylesConfig, Theme, ThemeConfig } from "react-select";
import { SelectOption } from "../components/inputs/SelectInput";

export function selectStyle<T>(
  isView: boolean = false
): StylesConfig<SelectOption<T>, boolean, GroupBase<SelectOption<T>>> {
  return {
    control: (base, state) => ({
      ...base,
      ...(isView && {
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0)",
        border: "1px solid transparent",
      }),
      boxShadow: "var(--light-shadow)",
      border: `1px solid ${
        state.isFocused ? "var(--dark-grey)" : "var(--light-grey)"
      }`,
      backgroundColor: "transparent",
      borderRadius: "8px",
      minHeight: state.isMulti ? "40px" : "0",
      transition: "all 0.3s ease-in-out",
      ...(isView && {
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0)",
        border: "1px solid transparent",
      }),
      "&:hover": {
        border: `1px solid ${
          state.isFocused ? "var(--dark-grey)" : "var(--light-grey)"
        }`,
      },
    }),
    container: (base) => ({
      ...base,
      minHeight: "0",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      ...(isView && {
        opacity: "0",
      }),
      transition: "all 0.3s ease-in-out",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "6px 8px",
      transition: "all 0.3s ease-in-out",
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "6px 8px",
      transition: "all 0.3s ease-in-out",
    }),
    multiValueRemove: (base) => ({
      ...base,
      ...(isView && {
        opacity: "0",
      }),
      transition: "all 0.3s ease-in-out",
    }),
    multiValueLabel: (base) => ({
      ...base,
      ...(isView && {
        transform: "translateX(0.5rem)",
      }),
      paddingTop: "0.4rem",
      paddingBottom: "0.4rem",
      transition: "all 0.3s ease-in-out",
    }),
    valueContainer: (base) => ({
      ...base,
      ...(isView && {
        transform: "translateX(-8px)",
      }),
      transition: "all 0.3s ease-in-out",
    }),
    multiValue: (base) => ({
      ...base,
      ...(isView && {
        transform: "translateX(-2px)",
      }),
      borderRadius: "4px",
      transition: "all 0.3s ease-in-out",
    }),
    singleValue: (base) => ({
      ...base,
      color: "var(--text-color)",
      margin: "0",
      transition: "all 0.3s ease-in-out",
    }),
  };
}

export const selectTheme: ThemeConfig = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: "var(--primary-color)",
    primary25: "var(--primary-25)",
    primary50: "var(--primary-50)",
    danger: "var(--error-color)",
  },
});
