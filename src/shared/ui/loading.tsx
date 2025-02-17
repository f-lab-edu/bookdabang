import { Spin } from './spin';

function Loading() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center">
      <Spin />
    </div>
  );
}

export { Loading };
