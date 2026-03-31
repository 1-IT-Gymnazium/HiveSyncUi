import {
  DatePicker as MuiDatePicker,
  DatePickerProps,
} from "@mui/x-date-pickers";
import { forwardRef } from "react";
import { DEFAULT_DATE_FORMAT } from "../../../utils/formatDate";
import RoundTextField from "./RoundTextField";

const DatePicker = forwardRef((props: DatePickerProps, ref: React.Ref<HTMLDivElement>) => {
  return (
    <MuiDatePicker
      enableAccessibleFieldDOMStructure={false}
      format={DEFAULT_DATE_FORMAT}
      ref={ref}
      {...props}
      slotProps={{
        field: {
          clearable: true,
        },
        textField: {
          fullWidth: true,
          size: "small",
        },
        ...props.slotProps,
      }}
      slots={{
        ...props.slots,
        textField: RoundTextField,
      }}
    />
  );
});

DatePicker.displayName = "DateTimePicker";

export default DatePicker;
