import { ComponentProps, ReactNode } from 'react';
import { ChevronDown } from 'react-feather';
import { useController, UseControllerProps } from 'react-hook-form';

type SelectOption = {
  value: string | number;
  label: string | number;
};

interface SelectProps extends ComponentProps<'select'> {
  label: string;
  lIcon?: ReactNode;
  errorMessage?: string;
  placeholder?: string;
  options: SelectOption[];
}

export const Select = ({
  label,
  lIcon,
  errorMessage,
  options,
  placeholder,
  ...selectProps
}: SelectProps & UseControllerProps) => {
  const { field, fieldState } = useController(selectProps);
  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">{label}</label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        {lIcon && <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">{lIcon}</span>}

        <select
          {...field}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3  outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${lIcon ? 'px-12' : 'pl-5 pr-12'}`}
        >
          <optgroup className="text-body dark:text-bodydark">
            <option value={0} className="text-gray-300">
              {placeholder}
            </option>
            {options.map(({ value, label }) => (
              <option key={value} value={value} className="text-body dark:text-bodydark">
                {label}
              </option>
            ))}
          </optgroup>
        </select>

        <ChevronDown
          size={24}
          className="text-gray-400 absolute top-1/2 right-4 z-10 -translate-y-1/2"
        />

        {/* <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span> */}
      </div>
      {fieldState.error && <p className="text-danger text-sm">{errorMessage}</p>}
    </div>
  );
};
