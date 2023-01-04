import { QueryFunction } from "@tanstack/react-query";
import { TimeAPIResponse } from "./TimeAPIResponse";

const fetchTime: QueryFunction<TimeAPIResponse, ["timezone", string]> = async ({
  queryKey,
}) => {
  const timezone = queryKey[1];
  if (!timezone) {
    return null;
  }

  const apiRes = await fetch(
    `https://worldtimeapi.org/api/timezone/${timezone}/`
  );

  if (!apiRes.ok) {
    throw new Error(`Problem with fetching the time for timezone: ${timezone}`);
  }

  return apiRes.json();
};

export default fetchTime;
