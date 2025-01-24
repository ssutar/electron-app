import React from 'react';

export type CardProps = {
  noBg?: boolean;
  title?: string;
  isHidden?: boolean;
  children?: React.ReactNode;
};

export const Card = ({
  title = undefined,
  children = undefined,
  noBg = false,
  isHidden = false,
}: CardProps) => {
  if (isHidden) {
    return null;
  }
  return (
    <div
      className={`${noBg ? '' : 'rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'} flex-1 xl:max-w-7xl mb-8`}
    >
      <div className="w-full p-4 sm:p-12.5 xl:p-17.5 flex flex-col gap-8">
        {title && <h3 className="text-title-sm md:text-title-md2">{title}</h3>}
        {children}
      </div>
    </div>
  );
};
