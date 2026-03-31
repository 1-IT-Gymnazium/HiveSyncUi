import { createContext } from "react";
import {
  AuthApi, ProjectApi, SectionApi, TodoApi,
} from "./apis";
import { Middleware } from "./runtime";

export interface ApiCallMiddleware {
  id: string;
  middleware: Middleware;
}

export interface ApiContextInterace {
  addMiddleware: (middleware: ApiCallMiddleware) => void;
  authApi: AuthApi;
  projectApi: ProjectApi;
  sectionApi: SectionApi;
  removeMiddleware: (id: ApiCallMiddleware["id"]) => void;
  todoApi: TodoApi;
}

const ApiContext = createContext<ApiContextInterace | null>(null);

export default ApiContext;
