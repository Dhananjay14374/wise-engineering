import * as ReactCountUp from "react-countup";

// react-countup's CJS build gets double-wrapped by Vite's dep interop
// (mod.default.default holds the actual component) — unwrap defensively.
const CountUp =
  typeof ReactCountUp.default === "function"
    ? ReactCountUp.default
    : ReactCountUp.default?.default ?? ReactCountUp;

export default function Counter({ value, suffix = "", duration = 2.4, className }) {
  return (
    <CountUp
      end={value}
      duration={duration}
      suffix={suffix}
      enableScrollSpy
      scrollSpyOnce
      className={className}
    />
  );
}
