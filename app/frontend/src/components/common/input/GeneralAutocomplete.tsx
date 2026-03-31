import {
  Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason,
} from "@mui/material";
import {
  useCallback,
} from "react";
import RoundTextField from "./RoundTextField";

export interface AutocompleteOption {
  label: string;
  value: string;
  default?: boolean;
}

interface GeneralAutocompleteProps {
  label: string;
  loading?: boolean;
  options: AutocompleteOption[];
  value: AutocompleteOption | null;
  onChange: React.Dispatch<React.SetStateAction<AutocompleteOption | null>>;
  name?: string;
}

const GeneralAutocomplete = ({
  options, name, loading, label, value, onChange,
}: GeneralAutocompleteProps) => {
  const handleChange: (
    event: React.SyntheticEvent,
    value: AutocompleteOption | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<AutocompleteOption>) => void = useCallback((_, val) => {
    onChange(val);
  }, [onChange]);

  return (
    <Autocomplete
      fullWidth
      getOptionKey={(opt) => opt.value}
      getOptionLabel={(opt) => opt.label}
      isOptionEqualToValue={(opt, value) => opt.value === value.value}
      loading={loading}
      onChange={handleChange}
      options={options}
      renderInput={(props) => <RoundTextField {...props} label={label} name={name} />}
      value={value}
    />
  );
};

export default GeneralAutocomplete;
