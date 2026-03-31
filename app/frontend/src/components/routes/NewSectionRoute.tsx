import { useLayoutEffect } from "react";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";
import NewSection from "../pages/settings/NewSection";

const NewSectionRoute = () => {
  const { setSectionName } = useDocumentMeta();

  useLayoutEffect(() => {
    setSectionName("New section");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  return (
    <NewSection />
  );
};

export default NewSectionRoute;
