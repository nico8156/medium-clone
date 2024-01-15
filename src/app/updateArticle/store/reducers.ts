import { createFeature, createReducer, on } from "@ngrx/store"
import { updateArticleActions } from "./actions"
import { routerNavigationAction } from "@ngrx/router-store"
import { UpdateArticleStateInterface } from "../types/updateArticleState.interface"

const initialState: UpdateArticleStateInterface = {
    isLoading: false,
    isSubmitting: false,
    validationErrors:  null,
    article: null, 
}

const updateArticleFeature = createFeature({
    name: 'updateArticle',
    reducer: createReducer(
        initialState,
        on(updateArticleActions.getArticle, (state) => ({
            ...state, 
            isLoading: true
        })),
        on(updateArticleActions.getArticleSuccess, (state,action) => ({
            ...state,
            isLoading: false,
            article: action.article
        })),
        on(updateArticleActions.getArticleFailure, (state, action) => ({
            ...state, 
            isLoading: false
            
        })),
        
        on(updateArticleActions.updateArticle, (state) => ({
            ...state, 
            isSubmitting: true
        })),
        on(updateArticleActions.updateArticleSuccess, (state) => ({
            ...state,
            isSubmitting: false,
        })),
        on(updateArticleActions.updateArticleFailure, (state, action) => ({
            ...state, 
            isSubmitting: false,
            validationErrors: action.errors
        })),
        on(routerNavigationAction, () => initialState)

    )
})

export const {
    name: updateArticleFeatureKey,
    reducer: updateArticleReducer,
    selectIsSubmitting,
    selectIsLoading,
    selectValidationErrors,
    selectArticle
} = updateArticleFeature