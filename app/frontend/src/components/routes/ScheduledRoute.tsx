import {
  useCallback,
  useLayoutEffect, useMemo,
} from "react";
import dayjs from "dayjs";
import {
  LinearProgress, ToggleButton,
} from "@mui/material";
import { useSearchParams } from "react-router";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";
import TaskList from "../pages/task/TaskList";
import PageLayout from "../layout/PageLayout";
import useTasks from "../pages/task/hooks/useTasks";
import isEnumGenerator from "../../utils/enum/isEnumGenerator";
import { TaskState } from "../pages/task/utils/taskStateEnum";
import RoundedToggleButtonGroup from "../common/button/RoundedToggleButtonGroup";

enum ViewVariant {
  DONE = "done",
  SCHEDULED = "scheduled",
}

const isViewVariant = isEnumGenerator(ViewVariant);

const variantQueryKey = "view";

const ScheduledRoute = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSectionName } = useDocumentMeta();
  const {
    data, getTasks, loading,
  } = useTasks();
  const variantParamValue = searchParams.get(variantQueryKey);
  const variant: ViewVariant = isViewVariant(variantParamValue) ? variantParamValue : ViewVariant.SCHEDULED;

  const changeViewVariant = useCallback((_: React.MouseEvent<HTMLElement>, value: ViewVariant) => {
    setSearchParams((prevSearchParams) => {
      if (value === ViewVariant.DONE) {
        prevSearchParams.set(variantQueryKey, value);
      }
      else {
        prevSearchParams.delete(variantQueryKey);
      }
      return prevSearchParams;
    });
  }, [setSearchParams]);

  useLayoutEffect(() => {
    setSectionName("Scheduled");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  useLayoutEffect(() => {
    void getTasks();
  }, [getTasks]);

  const filteredData = useMemo(() => data?.filter((entry) => {
    if (variant === ViewVariant.DONE) {
      return entry.state === TaskState.Done;
    }
    return entry.dueAt && dayjs(entry.dueAt).diff(dayjs()) > 0;
  }),
  [data, variant]);

  return (
    <PageLayout
      buttons={(
        <RoundedToggleButtonGroup exclusive onChange={changeViewVariant} value={variant}>
          <ToggleButton value={ViewVariant.SCHEDULED}>
            Scheduled
          </ToggleButton>
          <ToggleButton value={ViewVariant.DONE}>
            Done
          </ToggleButton>
        </RoundedToggleButtonGroup>
      )}
      subtitle={!loading ? `${(filteredData?.length ?? 0).toString()} task${filteredData?.length !== 1 ? "s" : ""}` : "Loading"}
      title={variant === ViewVariant.DONE ? "Done" : "Scheduled"}
    >
      {loading && <LinearProgress />}
      {filteredData && <TaskList data={filteredData} refresh={getTasks} />}
    </PageLayout>
  );
};

export default ScheduledRoute;
