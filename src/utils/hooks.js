import { useState, useEffect } from "react";
import Axios from "axios";

export function useAxios(url, shouldLoad) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(shouldLoad);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await Axios.get(url);
        console.log("loading");
        setData(data[0].meaning);
        setLoading(false);
      } catch {
        setError(true);
      }
    };
    if (shouldLoad) loadData();
  }, [url, shouldLoad]);

  return [data, loading, error];
}
