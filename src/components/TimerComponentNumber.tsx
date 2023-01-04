import { useEffect, useState } from "react";

const TimerComponentNumber = ({ newValue }: { newValue: string }) => {
  const [value, setValue] = useState<string>("");
  const [animate, setAnimate] = useState<boolean>(false);
  const shouldAnimate = newValue && newValue !== value;

  // Hide value (animation opacity 1 -> 0) and set to newValue when newValue changes
  useEffect(() => {
    if (shouldAnimate) {
      setAnimate(false);
      setTimeout(() => {
        setValue(newValue);
      }, 200);
    }
  }, [newValue]);

  // Show value again (animation opacity 0 -> 1) when value changes
  useEffect(() => {
    if (!animate) setTimeout(() => setAnimate(true), 200);
  }, [value]);

  return (
    <div className={`timer-card${animate ? " animate" : ""}`}>
      <div className="timer-card-inner">
        <div className={`timer-card-front${animate ? " active" : ""}`}>
          <h2>{value}</h2>
        </div>
      </div>
    </div>
  );
};

export default TimerComponentNumber;
