import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ArticleService as sharedArticleService } from "../service/article.service"
import { articleActions } from "./actions"
import { switchMap, catchError, map, of } from "rxjs"
import { ArticleInterface } from "src/app/shared/types/articles.interface"

export const getArticleEffect = createEffect(
    (
        actions$ = inject(Actions), 
        articleService = inject(sharedArticleService), 
    ) => {
      return actions$.pipe(
        ofType(articleActions.getArticle),
        switchMap(({slug}) => {
          return articleService.getArticle(slug).pipe(
            map((article: ArticleInterface) => {
              return articleActions.getArticleSuccess({article})
            }),
            catchError(() => {
              return of(
                articleActions.getArticleFailure()
              )
            })
          )
        })
      )
    },
    {functional: true}
  )