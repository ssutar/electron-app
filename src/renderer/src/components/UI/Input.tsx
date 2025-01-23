import React, { ComponentProps, ReactNode, Ref } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

export interface InputProps extends ComponentProps<'input'> {
  htmlType?: string;
  label: string;
  errorMessage?: string;
  placeholder?: string;
  rows?: number;
  rIcon?: ReactNode;
}

// export const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   (
//     {
//       label,
//       rIcon,
//       errorMessage,
//       hasError = false,
//       htmlType = 'text',
//       placeholder,
//       ...inputProps
//     }: InputProps,
//     ref: Ref<HTMLInputElement>
//   ) => {
//     return (
//       <>
//         <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>
//         <div className="relative pb-1">
//           <input
//             {...inputProps}
//             ref={ref}
//             type={htmlType}
//             aria-invalid={hasError ? 'true' : 'false'}
//             placeholder={placeholder}
//             className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//           />

//           {rIcon && <span className="absolute right-4 top-4">{rIcon}</span>}
//         </div>
//         {hasError && <p className="text-danger text-sm">{errorMessage}</p>}
//       </>
//     );
//   }
// );

export const Input = ({
  htmlType,
  label,
  errorMessage,
  rIcon,
  rows,
  ...props
}: UseControllerProps & InputProps) => {
  const { field, fieldState } = useController(props);
  return (
    <>
      <label className="mb-2.5 block font-medium text-black dark:text-white">{label}</label>
      <div className="relative pb-1 flex-1">
        {rows && rows > 0 ? (
          // @ts-expect-error
          <textarea
            {...field}
            {...props}
            aria-invalid={fieldState.error ? 'true' : 'false'}
            rows={rows}
            placeholder={props.placeholder}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          ></textarea>
        ) : (
          <input
            {...field}
            {...props}
            type={htmlType || 'text'}
            aria-invalid={fieldState.error ? 'true' : 'false'}
            placeholder={props.placeholder}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        )}
        {rIcon && <span className="absolute right-4 top-4">{rIcon}</span>}
      </div>
      {fieldState.error && <p className="text-danger text-sm">{errorMessage}</p>}
    </>
  );
};
