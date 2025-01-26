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
      className={`${noBg ? '' : 'rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'} flex-1 xl:max-w-8xl mb-8`}
    >
      <div className="w-full p-6 sm:p-8 flex flex-col gap-8">
        {title && <h3 className="text-lg">{title}</h3>}
        {children}
      </div>
    </div>
  );
};
