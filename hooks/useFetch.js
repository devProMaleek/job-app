import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const rapidApiKey = Constants.manifest.extra.RAPID_API_KEY;
const rapidApiHost = Constants.manifest.extra.RAPID_API_HOST;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = useMemo(() => {
    return {
      method: 'GET',
      url: `https://jsearch.p.rapidapi.com/${endpoint}`,
      params: {
        ...query,
      },
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': rapidApiHost,
      },
    };
  }, [endpoint, rapidApiHost, rapidApiKey]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  }

  return { data, isLoading, error, refetch };
};

export default useFetch;
