import {RootState} from "../root/root";

export const isAuthenticatedSelector = (state: RootState) => state.user.isAuthenticated;

export const userSelector = (state: RootState) => state.user.user;