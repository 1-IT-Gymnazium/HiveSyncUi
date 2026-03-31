import {
  DateTimePicker as MuiDateTimePicker, DateTimePickerProps,
} from "@mui/x-date-pickers";
import { forwardRef } from "react";
import { DEFAULT_DATE_TIME_FORMAT } from "../../../utils/formatDate";
import RoundTextField from "./RoundTextField";

const DateTimePicker = forwardRef((props: DateTimePickerProps, ref: React.Ref<HTMLDivElement>) => {
  return (
    <MuiDateTimePicker
      ampm={false}
      enableAccessibleFieldDOMStructure={false}
      format={DEFAULT_DATE_TIME_FORMAT}
      ref={ref}
      {...props}
      slotProps={{
        textField: {
          fullWidth: true,
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

DateTimePicker.displayName = "DateTimePicker";

export default DateTimePicker;
