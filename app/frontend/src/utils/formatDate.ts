import dayjs, { Dayjs } from "dayjs";

const DEFAULT_DATE_TIME_FORMAT = "DD.MM.YYYY HH:mm";
const DEFAULT_DATE_FORMAT = "DD.MM.YYYY";

const formatDateTime = (date: Date | Dayjs, format?: string) => dayjs(date).format(format ?? DEFAULT_DATE_TIME_FORMAT);
const formatDate = (date: Date | Dayjs, format?: string) => dayjs(date).format(format ?? DEFAULT_DATE_FORMAT);

export {
  DEFAULT_DATE_TIME_FORMAT,
  DEFAULT_DATE_FORMAT,
  formatDate,
  formatDateTime,
};
