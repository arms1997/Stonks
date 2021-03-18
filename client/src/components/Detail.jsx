import axios from "axios";
import { useEffect, useState } from "react";

export default function Detail({ symbol }) {
  const [companyData, setCompanyData] = useState({});

  useEffect(() => {
    axios
      .get(`/api/tickers/company/${symbol}`)
      .then((data) => setCompanyData(data.data))
      .catch((error) => console.error(error));
  }, [symbol]);

  return <div>{companyData.name}</div>;
}
