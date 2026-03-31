import {
  useCallback, useLayoutEffect,
  useMemo,
} from "react";
import {
  LinearProgress,
  ToggleButton,
} from "@mui/material";
import { useSearchParams } from "react-router";
import dayjs from "dayjs";
import useDocumentMeta from "../../context/documentMeta/useDocumentMeta";
import TaskList from "../pages/task/TaskList";
import PageLayout from "../layout/PageLayout";
import useTasks from "../pages/task/hooks/useTasks";
import isEnumGenerator from "../../utils/enum/isEnumGenerator";
import { TaskState } from "../pages/task/utils/taskStateEnum";
import RoundedToggleButtonGroup from "../common/button/RoundedToggleButtonGroup";

enum ViewVariant {
  TODAY = "today",
  OVERDUE = "overdue",
}

const isViewVariant = isEnumGenerator(ViewVariant);

const variantQueryKey = "view";

const TodayRoute = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSectionName } = useDocumentMeta();
  const {
    data, getTasks, loading,
  } = useTasks();
  const variantParamValue = searchParams.get(variantQueryKey);
  const variant: ViewVariant = isViewVariant(variantParamValue) ? variantParamValue : ViewVariant.TODAY;

  const changeViewVariant = useCallback((_: React.MouseEvent<HTMLElement>, value: ViewVariant) => {
    setSearchParams((prevSearchParams) => {
      if (value === ViewVariant.OVERDUE) {
        prevSearchParams.set(variantQueryKey, value);
      }
      else {
        prevSearchParams.delete(variantQueryKey);
      }
      return prevSearchParams;
    });
  }, [setSearchParams]);

  useLayoutEffect(() => {
    setSectionName("Today");

    return () => {
      setSectionName(null);
    };
  }, [setSectionName]);

  useLayoutEffect(() => {
    void getTasks();
  }, [getTasks]);

  const filteredData = useMemo(() => data?.filter((entry) => {
    switch (variant) {
      case ViewVariant.OVERDUE:
        return entry.dueAt && dayjs(entry.dueAt).diff(dayjs()) < 0 && entry.state !== TaskState.Done;
      case ViewVariant.TODAY:
      default:
        return (!entry.dueAt || dayjs(entry.dueAt).startOf("day")
          .isSame(dayjs().startOf("day")));
    }
  }), [data, variant]);

  return (
    <PageLayout
      buttons={(
        <RoundedToggleButtonGroup exclusive onChange={changeViewVariant} value={variant}>
          <ToggleButton value={ViewVariant.TODAY}>
            Today
          </ToggleButton>
          <ToggleButton value={ViewVariant.OVERDUE}>
            Overdue
          </ToggleButton>
        </RoundedToggleButtonGroup>
      )}
      subtitle={!loading ? `${(filteredData?.length ?? 0).toString()} task${filteredData?.length !== 1 ? "s" : ""}` : "Loading"}
      title={variant === ViewVariant.OVERDUE ? "Overdue" : "Today"}
    >
      {loading && <LinearProgress />}
      {filteredData && <TaskList data={filteredData} refresh={getTasks} />}
    </PageLayout>
  );
};

export default TodayRoute;
