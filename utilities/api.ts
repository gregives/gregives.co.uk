import { Page } from "@/types";
import { useEffect, useState } from "react";

export function useAPI(path: string, increment?: boolean) {
  const [data, setData] = useState<Page>();

  useEffect(() => {
    (async () => {
      const data = await fetch(`/api/${path}`, {
        method: increment ? "POST" : "GET",
      }).then((response) => response.json());

      setData(data);
    })();
  }, [increment, path]);

  return data;
}
