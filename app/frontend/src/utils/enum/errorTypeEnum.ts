import isEnumGenerator from "./isEnumGenerator";

enum ErrorType {
  BAD_REQUEST = 400,
  FOUND = 302,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_EARLY = 425,
  INTERNAL_SERVER_ERROR = 500,
  UNKNOWN = 999,
}

const isErrorType = isEnumGenerator(ErrorType);

export {
  ErrorType, isErrorType,
};
