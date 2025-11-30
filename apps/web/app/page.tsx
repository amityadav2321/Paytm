"use client";

import { useAppDispatch, useAppSelector, increment } from "@repo/store";

export default function Page() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>
        Increment
      </button>
    </div>
  );
}
