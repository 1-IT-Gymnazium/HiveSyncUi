import {
  Box,
  Dialog,
  DialogActions,
  dialogClasses,
  DialogContent,
  DialogTitle,
  Grid, IconButton, InputAdornment,
  Stack,
  styled,
} from "@mui/material";
import { useSearchParams } from "react-router";
import {
  useCallback, useEffect, useLayoutEffect, useRef,
  useState,
} from "react";
import {
  AllInbox,
  CalendarMonth,
  Clear,
  DateRange,
  FilterAlt,
  FilterAltOff,
  Inbox,
  Search,
} from "@mui/icons-material";
import dayjs, { Dayjs } from "dayjs";
import RoundTextField from "../../common/input/RoundTextField";
import RoundedButton from "../../common/button/RoundedButton";
import DatePicker from "../../common/input/DatePicker";
import ChipMultiselect from "../../common/input/ChipMultiselect";
import ChipSelectOption from "../../common/chip/ChipSelectOption";
import TaskStateIcon from "../../common/task/TaskStateIcon";
import TaskPriorityIcon from "../../common/task/TaskPriorityIcon";
import ColorChip from "../../common/chip/ColorChip";
import { DEFAULT_DATE_FORMAT } from "../../../utils/formatDate";
import useProjectOptions from "./hooks/useProjectOptions";
import useSectionOptions from "./hooks/useSectionOptions";
import {
  getTaskStateChipOption, isTaskStateEnum, TaskState, taskStateChipOptions,
} from "./utils/taskStateEnum";
import {
  getTaskPriorityChipOption, isTaskPriorityEnum, TaskPriority, taskPriorityChipOptions,
} from "./utils/taskPriorityEnum";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${dialogClasses.paper}`]: {
    background: theme.palette.grey[900],
  },
}));

export const projectQueryKey = "project";
export const sectionQueryKey = "section";
export const searchQueryKey = "search";
export const dateFromQueryKey = "dateFrom";
export const dateToQueryKey = "dateTo";
export const priorityQueryKey = "priority";
export const stateQueryKey = "state";

// TODO: Split into multiple components
const SearchFilter = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    data: projectOptions, getProjects, loading: projectOptionsLoading,
  } = useProjectOptions();
  const {
    data: sectionOptions, getSections, loading: sectionOptionsLoading,
  } = useSectionOptions();

  const [showDialog, setShowDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get(searchQueryKey);
  const dateFromValue = searchParams.get(dateFromQueryKey);
  const dateToValue = searchParams.get(dateToQueryKey);
  const stateValue = searchParams.getAll(stateQueryKey);
  const priorityValue = searchParams.getAll(priorityQueryKey);
  const projectValue = searchParams.getAll(projectQueryKey);
  const sectionValue = searchParams.getAll(sectionQueryKey);

  const [searchString, setSearchString] = useState(searchValue?.trim() ?? "");
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(dateFromValue ? dayjs(dateFromValue) : null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(dateToValue ? dayjs(dateToValue) : null);
  const [projects, setProjects] = useState<ChipSelectOption[]>([]);
  const [sections, setSections] = useState<ChipSelectOption[]>([]);
  const [taskState, setTaskState] = useState(stateValue.filter(isTaskStateEnum).map(getTaskStateChipOption));
  const [taskPriority, setTaskPriority] = useState(priorityValue.filter(isTaskPriorityEnum).map(getTaskPriorityChipOption));

  const isResetActive = !!searchValue?.trim()
    || !!dateFromValue
    || !!dateToValue
    || projectValue.length > 0
    || sectionValue.length > 0
    || stateValue.length > 0
    || priorityValue.length > 0;

  useEffect(() => {
    setTimeout(() => {
      setSearchString((prevString) => (prevString !== searchValue ? searchValue ?? "" : prevString));
    }, 10);
  }, [searchValue]);

  useLayoutEffect(() => {
    void getProjects();
  }, [getProjects]);

  useLayoutEffect(() => {
    void getSections();
  }, [getSections]);

  const handleFilterClick = () => {
    const preselectedProjects = projectOptions.filter((project) => searchParams.getAll(projectQueryKey).includes(project.value));
    const preselectedSections = sectionOptions.filter((opt) => searchParams.getAll(sectionQueryKey).includes(opt.value));
    setProjects(preselectedProjects);
    setSections(preselectedSections);
    setTaskState(stateValue.filter(isTaskStateEnum).map(getTaskStateChipOption));
    setTaskPriority(priorityValue.filter(isTaskPriorityEnum).map(getTaskPriorityChipOption));
    setDateFrom(dateFromValue ? dayjs(dateFromValue) : null);
    setDateTo(dateToValue ? dayjs(dateToValue) : null);
    setShowDialog(true);
  };

  const onSubmit: (formData: FormData) => void | Promise<void> = useCallback(() => {
    setShowDialog(false);
    setSearchParams((prevSearchParams) => {
      if (searchString.trim()) {
        prevSearchParams.set(searchQueryKey, searchString);
      }
      else {
        prevSearchParams.delete(searchQueryKey);
      }
      prevSearchParams.delete(projectQueryKey);
      if (projects.length) {
        projects.forEach((project) => {
          prevSearchParams.append(projectQueryKey, project.value);
        });
      }
      prevSearchParams.delete(sectionQueryKey);
      if (sections.length) {
        sections.forEach((section) => {
          prevSearchParams.append(sectionQueryKey, section.value);
        });
      }
      if (dateFrom) {
        prevSearchParams.set(dateFromQueryKey, dateFrom.toISOString());
      }
      else {
        prevSearchParams.delete(dateFromQueryKey);
      }
      if (dateTo) {
        prevSearchParams.set(dateToQueryKey, dateTo.toISOString());
      }
      else {
        prevSearchParams.delete(dateToQueryKey);
      }
      prevSearchParams.delete(priorityQueryKey);
      if (taskPriority.length) {
        taskPriority.forEach((priority) => {
          prevSearchParams.append(priorityQueryKey, priority.value);
        });
      }
      prevSearchParams.delete(stateQueryKey);
      if (taskState.length) {
        taskState.forEach((state) => {
          prevSearchParams.append(stateQueryKey, state.value);
        });
      }
      return prevSearchParams;
    });
  }, [
    dateFrom,
    dateTo,
    projects,
    searchString,
    sections,
    setSearchParams,
    taskPriority,
    taskState,
  ]);

  return (
    <Box action={onSubmit} component="form" display="block" id="filter-form" pt={2} ref={formRef} width="100%">
      <Grid container gap={1} justifyContent="flex-end">
        <Grid size={12}>
          <RoundTextField
            fullWidth
            label="Search"
            onChange={(e) => { setSearchString(e.currentTarget.value); }}
            slotProps={{ input: {
              endAdornment: (
                <InputAdornment position="end">
                  {searchString && <IconButton onClick={() => { setSearchString(""); }}><Clear /></IconButton>}
                  <IconButton type="submit"><Search /></IconButton>
                </InputAdornment>
              ),
            } }}
            value={searchString}
          />
        </Grid>
        <Grid size="grow">
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {searchValue && (
              <ColorChip
                icon={<Search />}
                label={searchValue}
                onDelete={() => {
                  setSearchParams(
                    (prevSearchParams) => {
                      prevSearchParams.delete(searchQueryKey);
                      return prevSearchParams;
                    },
                  );
                }}
                size="small"
              />
            )}
            {dateFromValue && (
              <ColorChip
                icon={<DateRange />}
                label={dayjs(dateFromValue).format(DEFAULT_DATE_FORMAT)}
                onDelete={() => {
                  setSearchParams(
                    (prevSearchParams) => {
                      prevSearchParams.delete(dateFromQueryKey);
                      return prevSearchParams;
                    },
                  );
                }}
                size="small"
              />
            )}
            {dateToValue && (
              <ColorChip
                icon={<CalendarMonth />}
                label={dayjs(dateToValue).format(DEFAULT_DATE_FORMAT)}
                onDelete={() => {
                  setSearchParams(
                    (prevSearchParams) => {
                      prevSearchParams.delete(dateToQueryKey);
                      return prevSearchParams;
                    },
                  );
                }}
                size="small"
              />
            )}
            {projectValue.length > 0 && (
              projectValue.map((pv) => {
                const projectOpt = projectOptions.find((po) => po.value === pv);
                if (!projectOpt) {
                  return null;
                }
                return (
                  <ColorChip
                    customColor={projectOpt.color}
                    icon={<AllInbox />}
                    key={pv}
                    label={projectOpt.label}
                    onDelete={() => {
                      setSearchParams(
                        (prevSearchParams) => {
                          prevSearchParams.delete(projectQueryKey);
                          projectValue.filter((p) => p !== pv).forEach((p) => {
                            prevSearchParams.append(projectQueryKey, p);
                          });
                          return prevSearchParams;
                        },
                      );
                    }}
                    size="small"
                  />
                );
              })
            )}
            {sectionValue.length > 0 && (
              sectionValue.map((sv) => {
                const sectionOpt = sectionOptions.find((so) => so.value === sv);
                if (!sectionOpt) {
                  return null;
                }
                return (
                  <ColorChip
                    customColor={sectionOpt.color}
                    icon={<Inbox />}
                    key={sv}
                    label={sectionOpt.label}
                    onDelete={() => {
                      setSearchParams(
                        (prevSearchParams) => {
                          prevSearchParams.delete(sectionQueryKey);
                          sectionValue.filter((s) => s !== sv).forEach((s) => {
                            prevSearchParams.append(sectionQueryKey, s);
                          });
                          return prevSearchParams;
                        },
                      );
                    }}
                    size="small"
                  />
                );
              })
            )}
            {stateValue.length > 0 && (
              stateValue.map((sv) => {
                if (!isTaskStateEnum(sv)) {
                  return null;
                }
                const stateOpt = getTaskStateChipOption(sv);
                return (
                  <ColorChip
                    customColor={stateOpt.color}
                    icon={<TaskStateIcon currentState={sv} />}
                    key={sv}
                    label={stateOpt.label}
                    onDelete={() => {
                      setSearchParams(
                        (prevSearchParams) => {
                          prevSearchParams.delete(stateQueryKey);
                          stateValue.filter((s) => s !== sv).forEach((s) => {
                            prevSearchParams.append(stateQueryKey, s);
                          });
                          return prevSearchParams;
                        },
                      );
                    }}
                    size="small"
                  />
                );
              })
            )}
            {priorityValue.length > 0 && (
              priorityValue.map((pv) => {
                if (!isTaskPriorityEnum(pv)) {
                  return null;
                }
                const priorityOpt = getTaskPriorityChipOption(pv);
                return (
                  <ColorChip
                    customColor={priorityOpt.color}
                    icon={<TaskPriorityIcon priority={pv} />}
                    key={pv}
                    label={priorityOpt.label}
                    onDelete={() => {
                      setSearchParams(
                        (prevSearchParams) => {
                          prevSearchParams.delete(priorityQueryKey);
                          priorityValue.filter((p) => p !== pv).forEach((p) => {
                            prevSearchParams.append(priorityQueryKey, p);
                          });
                          return prevSearchParams;
                        },
                      );
                    }}
                    size="small"
                  />
                );
              })
            )}
          </Stack>
        </Grid>
        <Grid size="auto">
          <Stack alignItems="center" direction="row">
            {isResetActive && (
              <IconButton onClick={() => {
                setSearchParams(new URLSearchParams());
                setDateFrom(null);
                setDateTo(null);
                setProjects([]);
                setSections([]);
                setTaskPriority([]);
                setTaskState([]);
              }}
              >
                <FilterAltOff fontSize="small" />
              </IconButton>
            )}
            <RoundedButton onClick={handleFilterClick} size="small" variant="contained">
              <Stack alignItems="center" direction="row">
                <FilterAlt fontSize="small" />
                Filter
              </Stack>
            </RoundedButton>
          </Stack>
        </Grid>
      </Grid>
      {showDialog && (
        <StyledDialog
          onClose={() => { setShowDialog(false); }}
          open={showDialog}
        >
          <DialogTitle>Filter</DialogTitle>
          <DialogContent>
            <Grid container gap={1} pt={1}>
              <Grid size={12}>
                <DatePicker label="From" maxDate={dateTo ?? undefined} onChange={setDateFrom} value={dateFrom} />
              </Grid>
              <Grid size={12}>
                <DatePicker label="To" minDate={dateFrom ?? undefined} onChange={setDateTo} value={dateTo} />
              </Grid>
              <Grid size={12}>
                <ChipMultiselect
                  clearable
                  fullWidth
                  icon={<AllInbox />}
                  label="Projects"
                  loading={projectOptionsLoading}
                  onChange={setProjects}
                  options={projectOptions}
                  value={projects}
                />
              </Grid>
              <Grid size={12}>
                <ChipMultiselect
                  clearable
                  fullWidth
                  icon={<Inbox />}
                  label="Sections"
                  loading={sectionOptionsLoading}
                  onChange={setSections}
                  options={sectionOptions}
                  value={sections}
                />
              </Grid>
              <Grid size={12}>
                <ChipMultiselect
                  clearable
                  fullWidth
                  icon={(
                    <TaskStateIcon
                      currentState={taskState.length > 0 && isTaskStateEnum(taskState[0].value) ? taskState[0].value : TaskState.ToDo}
                      fontSize="small"
                    />
                  )}
                  label="State"
                  onChange={setTaskState}
                  options={taskStateChipOptions}
                  value={taskState}
                />
              </Grid>
              <Grid size={12}>
                <ChipMultiselect
                  clearable
                  fullWidth
                  icon={(
                    <TaskPriorityIcon
                      fontSize="small"
                      priority={
                        taskPriority.length > 0 && isTaskPriorityEnum(taskPriority[0].value) ? taskPriority[0].value : TaskPriority.Medium
                      }
                    />
                  )}
                  label="Priority"
                  onChange={setTaskPriority}
                  options={taskPriorityChipOptions}
                  value={taskPriority}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <RoundedButton onClick={() => { setShowDialog(false); }}>Cancel</RoundedButton>
            <RoundedButton autoFocus form="filter-form" type="submit" variant="contained">
              Continue
            </RoundedButton>
          </DialogActions>
        </StyledDialog>
      )}
    </Box>

  );
};
export default SearchFilter;
