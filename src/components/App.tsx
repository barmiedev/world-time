import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TimeAPIResponse } from "../interfaces/TimeAPIResponse";
import Search from "./Search";
import Timer from "./Timer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const [regions, setRegions] = useState<string[]>([]);

  // Actual timezone
  const [timezone, setTimezone] = useState<
    TimeAPIResponse | null | undefined
  >();

  // Proxy timezone (for nice rendering)
  const [newTimezone, setNewTimezone] = useState<
    TimeAPIResponse | null | undefined
  >();

  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone")
      .then((response) => response.json())
      .then((data) => setRegions(data));
  }, []);

  useEffect(() => {
    // Avoid displaying undefined timezone -> set timezone when fetched data arrive
    if (newTimezone?.datetime && newTimezone?.datetime !== timezone?.datetime) {
      setTimezone(newTimezone);
    }
    // Early return from fetchTime -> no timezone specified
    if (newTimezone === null) {
      setTimezone(newTimezone);
    }
  }, [newTimezone]);

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Timer timezone={timezone} />
        <Search regions={regions} setNewTimezone={setNewTimezone} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
