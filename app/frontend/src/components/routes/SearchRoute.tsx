import { useLayoutEffect } from "react";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";
import Search from "../pages/task/Search";

const SearchRoute = () => {
  const { setSectionName } = useDocumentMeta();

  useLayoutEffect(() => {
    setSectionName("Search");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  return (<Search />);
};

export default SearchRoute;
