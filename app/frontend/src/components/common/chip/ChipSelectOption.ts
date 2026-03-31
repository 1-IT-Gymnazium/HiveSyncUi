import { ChipProps } from "@mui/material";
import { AutocompleteOption } from "../input/GeneralAutocomplete";

export default interface ChipSelectOption extends AutocompleteOption {
  color?: string;
  icon?: ChipProps["icon"];
}
