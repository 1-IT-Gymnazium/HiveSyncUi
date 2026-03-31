import PathDefinition from "./PathDefinition";

export const NEW_ENTRY_SUFFIX = "new";

const basePath = new PathDefinition({
  fullPath: "/",
  generate: () => "/",
  path: "/",
});

const notFound = new PathDefinition({
  fullPath: `${basePath.fullPath}not-found`,
  generate: () => `${basePath.generate()}not-found`,
  path: "not-found",
});

const forbidden = new PathDefinition({
  fullPath: `${basePath.fullPath}forbidden`,
  generate: () => `${basePath.generate()}forbidden`,
  path: "forbidden",
});

const today = new PathDefinition({
  fullPath: `${basePath.fullPath}today`,
  generate: () => `${basePath.generate()}today`,
  path: "today",
});

const scheduled = new PathDefinition({
  fullPath: `${basePath.fullPath}scheduled`,
  generate: () => `${basePath.generate()}scheduled`,
  path: "scheduled",
});

const search = new PathDefinition<string>({
  fullPath: `${basePath.fullPath}search`,
  generate: (query) => `${basePath.generate()}search${query?.trim() ? `?${query.trim()}` : ""}`,
  path: "search",
});

const settings = new PathDefinition({
  fullPath: `${basePath.fullPath}settings`,
  generate: () => `${basePath.generate()}settings`,
  path: "settings",
});

const newTask = new PathDefinition({
  fullPath: `${basePath.fullPath}task/${NEW_ENTRY_SUFFIX}`,
  generate: () => `${basePath.generate()}task/${NEW_ENTRY_SUFFIX}`,
  path: `task/${NEW_ENTRY_SUFFIX}`,
});

const task = new PathDefinition<{ id: string }>({
  fullPath: `${basePath.fullPath}task/:id`,
  generate: (params) => `${basePath.generate()}task/${params?.id ?? ""}`,
  path: "task/:id",
});

const project = new PathDefinition<{ id: string }>({
  fullPath: `${basePath.fullPath}project/:id`,
  generate: (params) => `${basePath.generate()}project/${params?.id ?? ""}`,
  path: "project/:id",
});

const newProject = new PathDefinition({
  fullPath: `${basePath.fullPath}project/${NEW_ENTRY_SUFFIX}`,
  generate: () => `${basePath.generate()}project/${NEW_ENTRY_SUFFIX}`,
  path: `project/${NEW_ENTRY_SUFFIX}`,
});

const section = new PathDefinition<{ id: string }>({
  fullPath: `${basePath.fullPath}section/:id`,
  generate: (params) => `${basePath.generate()}section/${params?.id ?? ""}`,
  path: "section/:id",
});

const newSection = new PathDefinition({
  fullPath: `${basePath.fullPath}section/${NEW_ENTRY_SUFFIX}`,
  generate: () => `${basePath.generate()}section/${NEW_ENTRY_SUFFIX}`,
  path: `section/${NEW_ENTRY_SUFFIX}`,
});

const login = new PathDefinition({
  fullPath: `${basePath.fullPath}login`,
  generate: () => `${basePath.generate()}login`,
  path: "login",
});

const confirm = new PathDefinition({
  fullPath: `${basePath.fullPath}confirm`,
  generate: () => `${basePath.generate()}confirm`,
  path: "confirm",
});

const forgottenPassword = new PathDefinition({
  fullPath: `${basePath.fullPath}forgotten-password`,
  generate: () => `${basePath.generate()}forgotten-password`,
  path: "forgotten-password",
});

const resetPassword = new PathDefinition({
  fullPath: `${basePath.fullPath}reset-password`,
  generate: () => `${basePath.generate()}reset-password`,
  path: "reset-password",
});

const registration = new PathDefinition({
  fullPath: `${basePath.fullPath}registration`,
  generate: () => `${basePath.generate()}registration`,
  path: "registration",
});

export default {
  basePath,
  confirm,
  forbidden,
  forgottenPassword,
  login,
  newProject,
  newSection,
  newTask,
  notFound,
  project,
  registration,
  resetPassword,
  scheduled,
  search,
  section,
  settings,
  task,
  today,
};
