import { useEffect, useState } from "react";

export const useGetPropertyData = () => {
  const [params, setParams] = useState<{ url: string }>();
  const [data, setData] = useState<{
    listingPrice: number;
    postCode: string;
  }>();
  const [error] = useState();

  useEffect(() => {

    if (!params) {
        return;
    }

    const getData = async () => {
      setData(undefined);
      return new Promise(() => {
        setTimeout(
          () => setData({ listingPrice: 350_000, postCode: "CR6 9RR" }),
          3000
        );
      });
    };
    getData();
  }, [params]);
  return {
    doGet: setParams,
    data,
    isLoading: !!(!data && params)
  }
};
