import { useEffect, useState } from "react";
import TimerComponentNumber from "./TimerComponentNumber";

const TimerComponent = ({
  value,
  abbreviation = "",
}: {
  value: string;
  abbreviation: string;
}) => {
  const [first, setFirst] = useState<string>("");
  const [second, setSecond] = useState<string>("");

  // Splitting the time component (hour/minute/second) into two parts to rerender only the one changing number
  useEffect(() => {
    const parts = [...value];
    if (parts.length === 2) {
      if (parts[0] !== first) setFirst(parts[0]);
      if (parts[1] !== second) setSecond(parts[1]);
    }
  }, [value]);

  return (
    <div className="timer-component" key={`time-${abbreviation}`}>
      <div className="time">
        <TimerComponentNumber key={`time-${abbreviation}-0`} newValue={first} />
        <TimerComponentNumber
          key={`time-${abbreviation}-1`}
          newValue={second}
        />
      </div>
      <div className="abbreviation" key={`time-${abbreviation}-abbreviation`}>
        {abbreviation}
      </div>
    </div>
  );
};

export default TimerComponent;
