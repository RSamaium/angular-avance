import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

export const selectFeatureUser = createFeatureSelector<UserState>('user')
export const selectUserGetAll = createSelector(selectFeatureUser, userStates => userStates.users)
export const selectUserLoading = createSelector(selectFeatureUser, userStates => userStates.loading)