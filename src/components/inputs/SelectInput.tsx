import { useField } from "formik";
import Select, { MultiValue, Props, SingleValue } from "react-select";
import { InputError } from "../";
import { selectStyle, selectTheme } from "../../config";

export interface SelectOption<T> {
  value: T;
  label: string;
}

export interface SelectInputProps<T> extends Props<SelectOption<T>> {
  label: string;
  name: string;
  options: SelectOption<T>[];
  optionId: keyof T;
}

export default function SelectInput<T>({
  label,
  options,
  optionId,
  name,
  isMulti,
  ...props
}: SelectInputProps<T>) {
  const [{ onChange: fieldOnChange, ...field }, meta] = useField(name);

  function getValue() {
    if (isMulti) {
      return field.value
        ? options.filter((option) =>
            field.value
              .map((v: T) => v[optionId])
              .includes(option.value[optionId])
          )
        : [];
    } else {
      if (field.value === undefined) {
        return undefined;
      }
      return options.find(
        (option) => option.value[optionId] === field.value[optionId]
      );
    }
  }

  return (
    <div id={`${name}-field`} className="field">
      <label htmlFor={name}>{`${label}${props.required ? " *" : ""}`}</label>
      <Select
        {...props}
        {...field}
        isMulti={isMulti}
        options={options}
        styles={selectStyle<T>(props.isDisabled)}
        menuPlacement={"auto"}
        value={getValue()}
        theme={selectTheme}
        onBlur={() => field.onBlur({ target: { name: name } })}
        onChange={(option) => {
          fieldOnChange({
            target: {
              name: name,
              value: isMulti
                ? (option as MultiValue<SelectOption<T>>).map(
                    (o: any) => o.value
                  )
                : (option as SingleValue<SelectOption<T>>)?.value,
            },
          });
        }}
      />
      <InputError
        message={meta.touched && meta.error ? meta.error : undefined}
      />
    </div>
  );
}
