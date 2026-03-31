import { useContext } from "react";
import ApiContext, { ApiContextInterace } from "./ApiContext";

const useApiContext = (): ApiContextInterace => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used inside of the ApiContext");
  }

  return context;
};

export default useApiContext;
