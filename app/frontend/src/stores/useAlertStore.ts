import { create } from "zustand";
import { capitalize } from "@mui/material";
import { ResponseError } from "../context/api";
import { ErrorType } from "../utils/enum/errorTypeEnum";

const alertTimeout = 5000;

interface ApiError {
  field: string | null;
  messages: string[];
}

interface ErrorData {
  message: string;
  type: ErrorType;
  serverErrors?: ApiError[];
}

const getErrorMessage = (errors: ApiError[]) => {
  const messages = errors.map((err) => {
    const errMessages = [...err.messages];
    if (err.field) {
      errMessages.unshift(capitalize(err.field));
      return errMessages.join("\n• ");
    }
    return err.messages.join("\n");
  });

  return messages.join("\n\n");
};

export const handleError = async (
  res: unknown,
): Promise<ErrorData> => {
  if (res instanceof ResponseError || res instanceof Response) {
    const response = res instanceof ResponseError ? res.response.clone() : res.clone();
    let responseData: ErrorData["serverErrors"];

    try {
      const data: unknown = await response.json();
      if (
        !!data
        && data instanceof Object
        && "errors" in data
        && Array.isArray(data.errors)) {
        responseData = data.errors;
      }
    }
    catch {
      // noop
    }

    const serverMessage = responseData
      && responseData.length > 0
      ? getErrorMessage(responseData)
      : undefined;

    if (response.status === 302) {
      return {
        message: serverMessage ?? "Found",
        serverErrors: responseData,
        type: ErrorType.FOUND,
      };
    }

    if (response.status === 400) {
      return {
        message: serverMessage ?? "Bad request",
        serverErrors: responseData,
        type: ErrorType.BAD_REQUEST,
      };
    }

    if (response.status === 401) {
      return {
        message: serverMessage ?? "Unauthorized",
        serverErrors: responseData,
        type: ErrorType.UNAUTHORIZED,
      };
    }

    if (response.status === 403) {
      return {
        message: serverMessage ?? "Forbidden",
        serverErrors: responseData,
        type: ErrorType.FORBIDDEN,
      };
    }

    if (response.status === 404) {
      return {
        message: serverMessage ?? "Not found",
        serverErrors: responseData,
        type: ErrorType.NOT_FOUND,
      };
    }
    if (response.status === 409) {
      return {
        message: serverMessage ?? "Conflict",
        serverErrors: responseData,
        type: ErrorType.CONFLICT,
      };
    }

    if (response.status === 500) {
      return {
        message: serverMessage ?? "Internal server error",
        serverErrors: responseData,
        type: ErrorType.INTERNAL_SERVER_ERROR,
      };
    }
  }

  return Promise.resolve({
    message: "Unknown error",
    type: ErrorType.UNKNOWN,
  });
};

export interface AlertData {
  error?: ErrorData;
  id: string;
  message: string;
  persist?: boolean;
  time: number;
  type: "success" | "error";
}

interface State {
  alerts: AlertData[];
}

type AlertParams =
  | {
    id: string;
    message: string;
    persist?: boolean;
    type: "success";
  }
  | {
    error: unknown;
    id: string;
    message?: string;
    persist?: boolean;
    type: "error";
  };

interface Actions {
  processAlert: (params: AlertParams) => Promise<AlertData>;
  removeAlert: (id: string) => void;
  resetAlerts: () => void;
  setAlert: (data: AlertData) => void;
}

const addAlert = (get: () => State & Actions, data: AlertData) => {
  const {
    alerts, removeAlert,
  } = get();

  const newAlerts = [...alerts, data];

  if (!data.persist) {
    setTimeout(() => {
      removeAlert(data.id);
    }, alertTimeout);
  }

  return { alerts: newAlerts };
};

const useAlert = create<State & Actions>()((set, get) => ({
  alerts: [],
  processAlert: async (props) => {
    const alertTime = Date.now();
    if (props.type === "error") {
      const converted = await handleError(props.error);
      return {
        error: converted,
        id: `${alertTime.toString()}_${props.id}_${props.type}`,
        message: props.message ?? converted.message,
        persist: props.persist ?? converted.type === ErrorType.INTERNAL_SERVER_ERROR,
        time: alertTime,
        type: "error",
      };
    }
    return {
      id: `${alertTime.toString()}_${props.id}`,
      message: props.message,
      persist: props.persist,
      time: alertTime,
      type: "success",
    };
  },
  removeAlert: (id: string) => {
    const alerts = [...get().alerts].filter((a) => a.id !== id);
    set(() => ({ alerts }));
  },
  resetAlerts: () => {
    set((state) => ({
      ...state,
      alerts: [],
    }));
  },
  setAlert: (message) => {
    const { alerts } = addAlert(get, message);
    set((state) => ({
      ...state,
      alerts,
    }));
  },
}));

export default useAlert;
