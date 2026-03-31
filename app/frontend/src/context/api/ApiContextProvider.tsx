// TODO: Resolve this problem instead of disabling it
/* eslint-disable react-hooks/refs */
import {
  PropsWithChildren, useCallback, useMemo, useRef,
} from "react";
import { API_ENDPOINT } from "../../env";
import ApiContext, {
  ApiCallMiddleware, ApiContextInterace,
} from "./ApiContext";
import {
  Configuration,
} from "./runtime";
import {
  AuthApi, ProjectApi, SectionApi, TodoApi,
} from "./apis";

const ApiContextProvider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
  const middlewares = useRef<ApiCallMiddleware[]>([]);

  const addMiddleware = useCallback((middleware: ApiCallMiddleware) => {
    middlewares.current.push(middleware);
  }, []);

  const removeMiddleware = useCallback((id: ApiCallMiddleware["id"]) => {
    middlewares.current = middlewares.current.filter(({ id: middlewareId }) => middlewareId !== id);
  }, []);

  const configuration = useMemo(() => new Configuration({
    basePath: API_ENDPOINT,
    credentials: "include",
    // TODO: Fix middleware calls so that we can mutate the context, not just react to it
    middleware: [{
      post: async (context) => {
        await Promise.allSettled(middlewares.current.map(({ middleware }) => {
          if (middleware.post) {
            return middleware.post(context);
          }
          return Promise.resolve();
        }));
      },
      pre: async (context) => {
        await Promise.allSettled(middlewares.current.map(({ middleware }) => {
          if (middleware.pre) {
            return middleware.pre(context);
          }
          return Promise.resolve();
        }));
      },
    }],
  }), []);

  const providerValue = useMemo<ApiContextInterace>(() => {
    return {
      addMiddleware,
      authApi: new AuthApi(configuration),
      projectApi: new ProjectApi(configuration),
      removeMiddleware,
      sectionApi: new SectionApi(configuration),
      todoApi: new TodoApi(configuration),
    };
  }, [
    addMiddleware,
    configuration,
    removeMiddleware,
  ]);

  return (
    <ApiContext.Provider value={providerValue}>{children}</ApiContext.Provider>
  );
};

export default ApiContextProvider;
