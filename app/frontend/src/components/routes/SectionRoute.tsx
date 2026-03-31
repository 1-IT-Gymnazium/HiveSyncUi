import { useLayoutEffect } from "react";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";
import SectionDetail from "../pages/settings/SectionDetail";

const SectionRoute = () => {
  const { setSectionName } = useDocumentMeta();

  useLayoutEffect(() => {
    setSectionName("Section");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  return (<SectionDetail />);
};

export default SectionRoute;
