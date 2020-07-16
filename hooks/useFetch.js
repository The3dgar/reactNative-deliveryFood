import React, { useState, useEffect } from "react";

const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  async function fetchData() {
    let response = await fetch(url).catch(console.log);
    response = await response.json().catch(console.log);
    setData(response);
    setLoading(false);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data };
};

export default useFetch;
