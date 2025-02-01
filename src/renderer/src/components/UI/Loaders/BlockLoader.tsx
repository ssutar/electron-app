import { Spinner } from './Spinner';

export const BlockLoader = () => {
  return (
    <div className="grid place-items-center p-4 gap-4">
      <Spinner />
      <p>{'Loading...'}</p>
    </div>
  );
};
