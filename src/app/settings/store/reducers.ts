import { createFeature, createReducer, on } from "@ngrx/store";
import { SettingsStateInterface } from "../types/settingsState.interface";
import { authActions } from "src/app/auth/store/actions";
import { routerNavigationAction } from "@ngrx/router-store";

const initialeState: SettingsStateInterface = {
    isSubmitting: false,
    validationErrors: null
}

const settingsFeature = createFeature({
    name: 'settings',
    reducer: createReducer(
        initialeState,
        on(authActions.updateCurrentUser, (state) =>({
            ...state,
            isSubmitting: true,
        })),
        on(authActions.updateCurrentUserSuccess, (state) =>({
            ...state,
            isSubmitting: false,
        })),
        on(authActions.updateCurrentUserFailure, (state, action) =>({
            ...state,
            isSubmitting: false,
            validationErrors: action.errors
        })),
        on(routerNavigationAction, () => initialeState)
    )
    })

    export const {
        name: settingsFeaureKey,
        reducer: settingsReducer,
        selectIsSubmitting,
        selectValidationErrors
    } = settingsFeature