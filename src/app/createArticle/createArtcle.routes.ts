import { Route } from "@angular/router";
import { CreateArticleComponent } from "./component/createArticle/createArticle.component";
import { CreateArticleService } from "./services/createArticle";
import { provideEffects } from "@ngrx/effects";
import * as createArticleEffects from './store/effetcs'
import { provideState } from "@ngrx/store";
import { createArticleFeatureKey, createArticleReducer } from "./store/reducers";

export const routes: Route[] = [
    {
        path: '',
        component: CreateArticleComponent,
        providers:[CreateArticleService, provideEffects(createArticleEffects), provideState(createArticleFeatureKey, createArticleReducer)],
    },
]