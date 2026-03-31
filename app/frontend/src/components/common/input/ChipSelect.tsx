import {
  useCallback, useMemo, useRef, useState,
} from "react";
import {
  ChipProps,
  Popover,
  Stack,
} from "@mui/material";
import {
  ArrowDropDown, ArrowDropUp, Close,
} from "@mui/icons-material";
import ColorChip from "../chip/ColorChip";
import ChipSelectOption from "../chip/ChipSelectOption";

interface SelectChipProps {
  clearable?: boolean;
  color?: ChipProps["color"];
  disabled?: ChipProps["disabled"];
  fullWidth?: boolean;
  icon?: ChipProps["icon"];
  invertOptionColor?: boolean;
  onChange: (state: ChipSelectOption | null) => unknown;
  options: ChipSelectOption[];
  size?: ChipProps["size"];
  value: ChipSelectOption | null;
  label: ChipProps["label"];
  loading?: boolean;
}

const ChipSelect = ({
  clearable,
  color,
  disabled,
  fullWidth,
  icon,
  invertOptionColor,
  label,
  loading,
  onChange,
  options,
  size,
  value,
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
    if (value && clearable) {
      onChange(null);
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
    value,
  ]);

  const handleSelect = useCallback((option: ChipSelectOption) => {
    onChange(option);
    setAnchorEl(null);
  }, [onChange]);

  const chipIcon = useMemo(() => {
    if (value && clearable) {
      return <Close />;
    }
    if (anchorEl) {
      return <ArrowDropUp />;
    }
    return <ArrowDropDown />;
  }, [
    anchorEl,
    clearable,
    value,
  ]);

  return (
    <>
      <ColorChip
        color={color ?? "default"}
        customColor={value?.color}
        deleteIcon={chipIcon}
        disabled={isDisabled}
        fullWidth={fullWidth}
        icon={icon ?? undefined}
        label={value?.label ?? label}
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
          {options.map((option) => (
            <ColorChip
              customColor={option.color}
              fullWidth
              icon={option.icon ?? icon}
              inverted={invertOptionColor}
              key={option.value}
              label={option.label}
              onClick={() => { handleSelect(option); }}
            />
          ))}
        </Stack>
      </Popover>
    </>
  );
};

export default ChipSelect;
