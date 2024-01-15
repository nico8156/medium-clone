import { Route } from "@angular/router";
import { UpdateArticleComponent } from "./component/updateArticle/updateArticle.component";
import { UpdateArticleService } from "./services/updateArticle";
import { provideEffects } from "@ngrx/effects";
import * as updateArticleEffects from './store/effetcs'
import { provideState } from "@ngrx/store";
import { updateArticleFeatureKey, updateArticleReducer } from "./store/reducers";

export const routes: Route[] = [
    {
        path: '',
        component: UpdateArticleComponent,
        providers:[UpdateArticleService, provideEffects(updateArticleEffects), provideState(updateArticleFeatureKey, updateArticleReducer)],
    },
]