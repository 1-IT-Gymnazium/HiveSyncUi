import {
  useCallback,
  useMemo, useRef, useState,
} from "react";
import {
  ChipProps,
  Popover,
  Stack,
} from "@mui/material";
import {
  ArrowDropDown, ArrowDropUp, Close,
  RadioButtonUnchecked,
  TaskAlt,
} from "@mui/icons-material";
import ColorChip from "../chip/ColorChip";
import ChipSelectOption from "../chip/ChipSelectOption";

interface SelectChipProps {
  clearable?: boolean;
  color?: ChipProps["color"];
  disabled?: ChipProps["disabled"];
  fullWidth?: boolean;
  icon: ChipProps["icon"];
  invertOptionColor?: boolean;
  onChange: React.Dispatch<React.SetStateAction<ChipSelectOption[]>>;
  options: ChipSelectOption[];
  value: ChipSelectOption[];
  label: ChipProps["label"];
  loading?: boolean;
  size?: ChipProps["size"];
}

const ChipMultiselect = ({
  clearable, color, disabled, fullWidth, icon, invertOptionColor, label, onChange, options, value, loading, size,
}: SelectChipProps) => {
  const chipRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const isDisabled = options.length < 1 || (disabled ?? loading);

  const handleClick = useCallback(() => {
    if (isDisabled) {
      return;
    }
    setAnchorEl((prev) => (prev ? null : chipRef.current));
  }, [isDisabled]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleDelete = useCallback(() => {
    if (isDisabled) {
      return;
    }
    if (value.length > 0 && clearable) {
      onChange([]);
      handleClose();
    }
    else {
      handleClick();
    }
  }, [
    clearable,
    handleClick,
    handleClose,
    isDisabled,
    onChange,
    value.length,
  ]);

  const handleSelect = useCallback((option: ChipSelectOption) => {
    onChange((prev) => (prev.some((item) => item.value === option.value)
      ? prev.filter((item) => item.value !== option.value)
      : [...prev, option]));
  }, [onChange]);

  const getDisplayText = useMemo(() => {
    if (value.length > 0) {
      const displayItem = value[0];
      const remainingCount = value.length - 1;
      return `${displayItem.label}${
        remainingCount > 0 ? `, +${remainingCount.toString()}` : ""
      }`;
    }
    return label;
  }, [label, value]);

  const chipIcon = useMemo(() => {
    if (value.length > 0 && clearable) {
      return <Close />;
    }
    if (anchorEl) {
      return <ArrowDropUp />;
    }
    return <ArrowDropDown />;
  }, [
    anchorEl,
    clearable,
    value.length,
  ]);

  return (
    <>
      <ColorChip
        color={color ?? "default"}
        customColor={value.length > 0 ? value[0]?.color : undefined}
        deleteIcon={chipIcon}
        disabled={isDisabled}
        fullWidth={fullWidth}
        icon={icon}
        label={getDisplayText}
        onClick={handleClick}
        onDelete={handleDelete}
        ref={chipRef}
        size={size}
        variant="filled"
      />
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        slotProps={{
          paper: {
            sx: (theme) => ({
              background: theme.palette.grey[900],
              boxShadow: "none",
              maxHeight: "270px",
              maxWidth: "250px",
              padding: "0.75rem",
            }),
          },
        }}
        transformOrigin={{
          horizontal: "center",
          vertical: -10,
        }}
      >
        <Stack spacing={1}>
          {options.map((option) => {
            const selected = !!value.find((val) => val.value === option.value);
            return (
              <ColorChip
                customColor={option.color}
                fullWidth
                icon={selected ? <TaskAlt /> : <RadioButtonUnchecked />}
                inverted={invertOptionColor}
                key={option.value}
                label={option.label}
                onClick={() => { handleSelect(option); }}
              />
            );
          })}
        </Stack>
      </Popover>
    </>
  );
};

export default ChipMultiselect;
