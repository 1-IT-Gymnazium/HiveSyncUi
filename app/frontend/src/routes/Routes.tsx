import {
  Routes, Route,
  Navigate,
} from "react-router";
import Layout from "../components/layout/Layout";
import LoginRoute from "../components/routes/LoginRoute";
import TodayRoute from "../components/routes/TodayRoute";
import UserAccess from "../components/authentication/UserAccess";
import RegistrationRoute from "../components/routes/RegistrationRoute";
import ConfirmRoute from "../components/routes/ConfirmRoute";
import ForbiddenRoute from "../components/routes/ForbiddenRoute";
import NotFoundRoute from "../components/routes/NotFoundRoute";
import NewTaskRoute from "../components/routes/NewTaskRoute";
import TaskRoute from "../components/routes/TaskRoute";
import SearchRoute from "../components/routes/SearchRoute";
import ScheduledRoute from "../components/routes/ScheduledRoute";
import NoUserAccess from "../components/authentication/NoUserAccess";
import AuthControl from "../components/authentication/AuthControl";
import NewProjectRoute from "../components/routes/NewProjectRoute";
import ProjectRoute from "../components/routes/ProjectRoute";
import NewSectionRoute from "../components/routes/NewSectionRoute";
import SectionRoute from "../components/routes/SectionRoute";
import SettingsRoute from "../components/routes/SettingsRoute";
import ForgottenPasswordRoute from "../components/routes/ForgottenPasswordRoute";
import ResetPasswordRoute from "../components/routes/ResetPasswordRoute";
import paths from "./paths";

const ReactRoutes = () => {
  return (
    <Routes>
      <Route element={(
        <AuthControl>
          <Layout />
        </AuthControl>
      )}
      >
        <Route element={<Navigate to={paths.today.generate()} />} index />
        <Route element={<UserAccess />}>
          <Route element={<ScheduledRoute />} path={paths.scheduled.path} />
          <Route element={<SearchRoute />} path={paths.search.path} />
          <Route element={<SettingsRoute />} path={paths.settings.path} />
          <Route element={<NewTaskRoute />} path={paths.newTask.path} />
          <Route element={<TaskRoute />} path={paths.task.path} />
          <Route element={<TodayRoute />} path={paths.today.path} />
          <Route element={<NewProjectRoute />} path={paths.newProject.path} />
          <Route element={<ProjectRoute />} path={paths.project.path} />
          <Route element={<NewSectionRoute />} path={paths.newSection.path} />
          <Route element={<SectionRoute />} path={paths.section.path} />
        </Route>
        <Route element={<NoUserAccess />}>
          <Route element={<LoginRoute />} path={paths.login.path} />
          <Route element={<RegistrationRoute />} path={paths.registration.path} />
          <Route element={<ConfirmRoute />} path={paths.confirm.path} />
          <Route element={<ForgottenPasswordRoute />} path={paths.forgottenPassword.path} />
          <Route element={<ResetPasswordRoute />} path={paths.resetPassword.path} />
        </Route>
        <Route element={<ForbiddenRoute />} path={paths.forbidden.path} />
        <Route element={<NotFoundRoute />} path={paths.notFound.path} />
      </Route>
      <Route element={<Navigate to={paths.notFound.generate()} />} path="*" />
    </Routes>
  );
};

export default ReactRoutes;
