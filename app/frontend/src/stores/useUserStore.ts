import { create } from "zustand";
import { LoggedUserModel } from "../context/api";

interface State {
  userDetail: LoggedUserModel | null;
  userLoading: boolean;
}

interface Actions {
  setUserDetail: (userDetail: State["userDetail"]) => void;
  setUserLoading: (state: boolean) => void;
}

const useUserStore = create<State & Actions>()((set) => ({
  setUserDetail: (userDetail) => { set({ userDetail }); },
  setUserLoading: (userLoading) => { set({ userLoading }); },
  userDetail: null,
  userLoading: true,
}));

export default useUserStore;
