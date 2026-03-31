import { useContext } from "react";
import DocumentMetaContext, {
  DocumentMetaContextInterface,
} from "./DocumentMetaContext";

const useDocumentMeta = (): DocumentMetaContextInterface => {
  const context = useContext<DocumentMetaContextInterface | null>(
    DocumentMetaContext,
  );
  if (!context) {
    throw new Error(
      "useDocumentMeta must be used within a DocumentMetaContext",
    );
  }

  return context;
};

export default useDocumentMeta;
