import { useQuery } from "@tanstack/react-query";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import fetchTime from "../interfaces/fetchTime";
import { TimeAPIResponse } from "../interfaces/TimeAPIResponse";

const Search = ({
  regions,
  setNewTimezone,
}: {
  regions: string[];
  setNewTimezone: Dispatch<SetStateAction<TimeAPIResponse | null | undefined>>;
}) => {
  const [region, setRegion] = useState<string>("");

  // Refetching every second
  const results = useQuery(["timezone", region], fetchTime, {
    refetchInterval: 1000,
  });

  // Set timezone when results change
  useEffect(() => {
    setNewTimezone(results?.data);
  }, [results]);

  return (
    <div className="search">
      <select onChange={(e) => setRegion(e.target.value)}>
        <option />
        {regions.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
    </div>
  );
};

export default Search;
