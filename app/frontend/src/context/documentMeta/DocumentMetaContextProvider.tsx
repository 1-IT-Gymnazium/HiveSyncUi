import {
  PropsWithChildren, useEffect, useMemo, useState,
} from "react";
import DocumentMetadataContext, {
  DocumentMetaContextInterface,
} from "./DocumentMetaContext";

const suffix = "Hivesync";

const DocumentMetaContextProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [detailName, setDetailName] = useState<string | null>(null);
  const [sectionName, setSectionName] = useState<string | null>(null);

  useEffect(() => {
    const name = [];
    const title = [];
    if (detailName) {
      name.push(detailName);
    }
    if (sectionName) {
      name.push(sectionName);
    }
    title.push(name.join(" - "));
    title.push(suffix);
    document.title = title.join(" | ");
  }, [detailName, sectionName]);

  const providerValue = useMemo<DocumentMetaContextInterface>(() => {
    return {
      setDetailName,
      setSectionName,
    };
  }, []);

  return (
    <DocumentMetadataContext.Provider value={providerValue}>
      {children}
    </DocumentMetadataContext.Provider>
  );
};

export default DocumentMetaContextProvider;
