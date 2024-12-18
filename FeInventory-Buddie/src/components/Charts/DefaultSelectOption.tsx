import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface DefaultSelectOptionProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

const DefaultSelectOption: React.FC<DefaultSelectOptionProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DefaultSelectOption;