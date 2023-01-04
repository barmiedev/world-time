import { useEffect, useState } from "react";
import TimerComponent from "./TimerComponent";
import { TimeAPIResponse } from "../interfaces/TimeAPIResponse";
import { leadingZero } from "../utils";

const Timer = ({
  timezone,
}: {
  timezone: TimeAPIResponse | null | undefined;
}) => {
  const [hour, setHour] = useState<string>("");
  const [minute, setMinute] = useState<string>("");
  const [second, setSecond] = useState<string>("");

  useEffect(() => {
    if (timezone?.datetime) {
      const dateToRender = new Date(
        // to parse this date we have to get rid of the offset
        // -> new Date(...) does not parse the +H:MM at the end
        timezone.datetime.replace(timezone.utc_offset, "")
      );
      setHour(leadingZero(dateToRender.getHours()));
      setMinute(leadingZero(dateToRender.getMinutes()));
      setSecond(leadingZero(dateToRender.getSeconds()));
    }
  }, [timezone]);

  return (
    <div className={`timer${timezone ? " visible" : ""}`}>
      <TimerComponent value={hour} abbreviation="h" />
      <TimerComponent value={minute} abbreviation="m" />
      <TimerComponent value={second} abbreviation="s" />
    </div>
  );
};

export default Timer;
