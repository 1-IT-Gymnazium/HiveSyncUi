import { createContext } from "react";

export interface DocumentMetaContextInterface {
  setDetailName: (name: string | null) => void;
  setSectionName: (name: string | null) => void;
}

const DocumentMetaContext
  = createContext<DocumentMetaContextInterface | null>(null);

export default DocumentMetaContext;
