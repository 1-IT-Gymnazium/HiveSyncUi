import {
  ExpandLess, ExpandMore,
  MoreVert,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  ListItem, ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material";
import {
  PropsWithChildren, ReactElement, useCallback, useState,
} from "react";
import ColorChip from "../chip/ColorChip";
import RoundedButton from "../button/RoundedButton";

interface EditableListItemProps {
  color?: string;
  icon?: ReactElement;
  id: string;
  label: string;
  onDelete?: (id: string) => Promise<boolean>;
  onEdit?: (id: string) => Promise<void>;
  onSearch?: (id: string) => Promise<void>;
  renderChip?: boolean;
}

const AccordionListItem = ({
  color,
  icon,
  id,
  label,
  onDelete,
  onEdit,
  onSearch,
  children,
  renderChip,
}: PropsWithChildren<EditableListItemProps>) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleClick: React.MouseEventHandler<unknown> = useCallback((e) => {
    e.stopPropagation();
    setOpen((prevState) => !prevState);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!onDelete) {
      return;
    }
    const success = await onDelete(id);
    if (success) {
      setShowDeleteDialog(false);
      setOpen(false);
    }
  }, [id, onDelete]);

  const handleSearch = useCallback(async () => {
    if (!onSearch) {
      return;
    }
    await onSearch(id);
    setShowDeleteDialog(false);
    setOpen(false);
  }, [id, onSearch]);

  const handleEdit = useCallback(async () => {
    if (!onEdit) {
      return;
    }
    await onEdit(id);
    setShowDeleteDialog(false);
    setOpen(false);
  }, [id, onEdit]);

  return (
    <>
      <ListItem>
        {children && (
          <ListItemIcon>
            <IconButton onClick={handleClick} size="small">
              {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
            </IconButton>
          </ListItemIcon>
        )}
        {renderChip
          ? <ListItemText primary={<ColorChip customColor={color} icon={icon} label={label} onClick={children ? handleClick : undefined} />} />
          : (
            <>
              {icon && (
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
              )}
              <ListItemText primary={label} />
            </>
          )}
        {onSearch && (
          <IconButton onClick={handleSearch} size="small">
            <Search fontSize="small" />
          </IconButton>
        )}
        {(onEdit ?? onDelete) && (
          <>
            <IconButton aria-label="settings" onClick={(e) => { setAnchorEl((prev) => (!prev ? e.currentTarget : null)); }} size="small">
              <MoreVert fontSize="small" />
            </IconButton>
            <Menu anchorEl={anchorEl} onClose={() => { setAnchorEl(null); }} open={!!anchorEl}>
              <MenuList dense>
                {onEdit && (
                  <MenuItem onClick={handleEdit}>
                    Edit
                  </MenuItem>
                )}
                {onDelete && (
                  <MenuItem onClick={() => { setShowDeleteDialog(true); }}>
                    Remove
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </>
        )}
      </ListItem>
      {children && (
        <>
          <Divider />
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box bgcolor="#00000015" pl={8}>
              {children}
            </Box>
          </Collapse>
          <Divider />
        </>
      )}
      {showDeleteDialog && (
        <Dialog
          onClose={() => { setShowDeleteDialog(false); }}
          open={showDeleteDialog}
        >
          <DialogTitle>
            {`Delete ${label}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Do you really want to delete ${label}? This action is irreversible.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <RoundedButton onClick={() => { setShowDeleteDialog(false); }}>Cancel</RoundedButton>
            <RoundedButton autoFocus onClick={handleDelete} variant="contained">
              Continue
            </RoundedButton>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
export default AccordionListItem;
