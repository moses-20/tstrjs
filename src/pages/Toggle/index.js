import { useState } from "react";

export default function Toggle({ onChange }) {
  const [state, setState] = useState(false);

  return (
    <button
      onClick={function () {
        setState((prev) => !prev);
        onChange(!state);
      }}
      data-testid="toggle"
    >
      {state ? "Turn Off" : "Turn On"}
    </button>
  );
}
