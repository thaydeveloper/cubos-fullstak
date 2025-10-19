export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  value?: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  menuMaxHeight?: number;
};
