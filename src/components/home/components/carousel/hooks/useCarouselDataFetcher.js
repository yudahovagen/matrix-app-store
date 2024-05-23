import { useEffect, useState } from "react";

export const useCarouselDataFetcher = (horizontalAlignment) => {
  const [dataContainer, setDataContainer] = useState({ data: [], title: "" });

  useEffect(() => {
    const getData = async () => {
      if (horizontalAlignment === true || horizontalAlignment === false) {
        let url = "";
        if (horizontalAlignment) {
          url = "/api/v2/us/apps/top-free/10/apps.json";
        } else {
          url = "/api/v2/us/apps/top-paid/25/apps.json";
        }
        try {
          const request = await fetch(url);
          const response = await request.json();
          
          if (response.feed && response.feed.results) {
            setDataContainer({
              data: response.feed.results,
              title: response.feed.title,
            });
          }
        } catch (e) {
          console.log("failed to fetch data from API", e);
        }
      }
    };
    getData();
  }, [horizontalAlignment]);

  return { dataContainer };
};
