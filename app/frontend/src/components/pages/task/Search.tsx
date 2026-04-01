import { useSearchParams } from "react-router";
import {
  useLayoutEffect, useMemo,
} from "react";
import { LinearProgress } from "@mui/material";
import dayjs from "dayjs";
import PageLayout from "../../layout/PageLayout";
import TaskList from "./TaskList";
import useTasks from "./hooks/useTasks";
import SearchFilter, {
  dateFromQueryKey,
  dateToQueryKey,
  priorityQueryKey,
  projectQueryKey, searchQueryKey, sectionQueryKey,
  stateQueryKey,
} from "./SearchFilter";
import {
  taskStateLabel,
} from "./utils/taskStateEnum";
import {
  taskPriorityLabel,
} from "./utils/taskPriorityEnum";

const normalize = (string: string) => string.normalize("NFD").replace(/\p{Diacritic}/gu, "")
  .toLowerCase()
  .trim();

const Search = () => {
  const [searchParams] = useSearchParams();
  const {
    data, getTasks, loading,
  } = useTasks();

  const searchValue = searchParams.get(searchQueryKey);
  const projectValue = searchParams.getAll(projectQueryKey);
  const sectionValue = searchParams.getAll(sectionQueryKey);
  const dateFromValue = searchParams.get(dateFromQueryKey);
  const dateToValue = searchParams.get(dateToQueryKey);
  const stateValue = searchParams.getAll(stateQueryKey);
  const priorityValue = searchParams.getAll(priorityQueryKey);

  const filteredData = useMemo(() => data?.map((entity) => {
    if (!searchValue
      && projectValue.length < 1
      && sectionValue.length < 1
      && stateValue.length < 1
      && priorityValue.length < 1
      && !dateFromValue
      && !dateToValue) {
      return {
        ...entity,
        relevance: 1,
      };
    }
    let relevance = 0;
    const matchesDateFrom = !!dateFromValue && !!entity.dueAt && entity.dueAt.getTime() >= dayjs(dateFromValue).valueOf();
    const matchesDateTo = !!dateToValue && !!entity.dueAt && entity.dueAt.getTime() <= dayjs(dateToValue).endOf("day")
      .valueOf();
    if (entity.dueAt) {
      if (!!dateFromValue && !matchesDateFrom) {
        return entity;
      }
      if (!!dateToValue && !matchesDateTo) {
        return entity;
      }
      if (matchesDateFrom || matchesDateTo) {
        ++relevance;
      }
    }
    if (projectValue.length > 0 && projectValue.includes(entity.project.id)) {
      ++relevance;
    }
    if (sectionValue.length > 0 && entity.section && sectionValue.includes(entity.section.id)) {
      ++relevance;
    }
    if (stateValue.length > 0 && stateValue.includes(entity.state)) {
      ++relevance;
    }
    if (priorityValue.length > 0 && priorityValue.includes(entity.priority)) {
      ++relevance;
    }

    const matchesSearch = (() => {
      if (!searchValue) return false;

      const search = normalize(searchValue);
      const summary = normalize(entity.summary);
      const description = normalize(entity.description ?? "");
      const state = [normalize(taskStateLabel[entity.state]), normalize(entity.state)];
      const priority = [normalize(taskPriorityLabel[entity.priority]), normalize(entity.priority)];
      const project = normalize(entity.project.name);
      const section = entity.section ? normalize(entity.section.id) : undefined;

      return summary.includes(search)
        || description.includes(search)
        || state.some((entry) => (entry.includes(search)))
        || priority.some((entry) => (entry.includes(search)))
        || project.includes(search)
        || section?.includes(search);
    })();

    if (matchesSearch) {
      ++relevance;
    }

    return {
      ...entity,
      relevance,
    };
  }).filter((entry) => entry.relevance && entry.relevance > 0), [
    data,
    dateFromValue,
    dateToValue,
    priorityValue,
    projectValue,
    searchValue,
    sectionValue,
    stateValue,
  ]);

  useLayoutEffect(() => {
    void getTasks();
  }, [getTasks]);

  return (
    <PageLayout
      buttons={
        <SearchFilter />
      }
      padBottom
    >
      {loading && <LinearProgress />}
      {filteredData && <TaskList data={filteredData} refresh={getTasks} />}
    </PageLayout>
  );
};

export default Search;
