// import { Link } from 'react-router-dom';
// interface BreadcrumbProps {
//   title: string;
//   className?: string;
// }
// const Breadcrumb = ({ title, className }: BreadcrumbProps) => {
//   return (
//     <div
//       className={`mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${className}`}
//     >
//       <h2 className="text-title-md2 font-semibold text-black dark:text-white">{title}</h2>

//       <nav className="hidden md:block">
//         <ol className="flex items-center gap-2">
//           <li>
//             <Link className="font-medium" to="/dashboard">
//               Dashboard /
//             </Link>
//           </li>
//           <li className="font-medium text-primary">{title}</li>
//         </ol>
//       </nav>
//     </div>
//   );
// };

// export default Breadcrumb;

import React, { useContext, useEffect, useMemo, useState } from 'react';

export interface IBreadcrumb {
  name: string;
  path: string;
}

export interface IBreadcrumbContext {
  breadcrumbs: IBreadcrumb[];
  setBreadcrumbs: (breadcrumbs: IBreadcrumb[]) => void;
}

const BreadcrumbContext = React.createContext<IBreadcrumbContext>({
  breadcrumbs: [],
  setBreadcrumbs: (_b) => {},
});

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb[]>([]);
  const value = useMemo(
    () => ({
      breadcrumbs,
      setBreadcrumbs,
    }),
    [breadcrumbs, setBreadcrumbs],
  );
  return <BreadcrumbContext.Provider value={value}>{children}</BreadcrumbContext.Provider>;
};

export const useBreadcrumbs = () => {
  return useContext(BreadcrumbContext);
};

export const useSetBreadcrumbs = (breadcrumbs: IBreadcrumb[]) => {
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, []);
};
