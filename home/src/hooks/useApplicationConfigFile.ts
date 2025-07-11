import { useEffect, useState } from "react";
import { ApplicationConfig } from "../types/ApplicationConfig";

const fileName = "application-config.json";

export const useApplicationConfigFile = (): {
  applicationConfig: ApplicationConfig | undefined;
} => {
  const [applicationConfig, setData] = useState<
    ApplicationConfig | undefined
  >();
  const getData = () => {
    fetch(fileName, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((applicationConfig: ApplicationConfig) => {
        return setData(applicationConfig);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return { applicationConfig };
};
