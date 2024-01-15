import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ArticleService as sharedArticleService } from "../service/article.service"
import { articleActions } from "./actions"
import { switchMap, catchError, map, of, tap } from "rxjs"
import { ArticleInterface } from "src/app/shared/types/articles.interface"
import { Router } from "@angular/router"

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

  export const deleteArticleEffect = createEffect(
    (
        actions$ = inject(Actions), 
        articleService = inject(sharedArticleService), 
    ) => {
      return actions$.pipe(
        ofType(articleActions.deleteArticle),
        switchMap(({slug}) => {
          return articleService.deleteArticle(slug).pipe(
            map(() => {
              return articleActions.deleteArticleSuccess()
            }),
            catchError(() => {
              return of(
                articleActions.deleteArticleFailure()
              )
            })
          )
        })
      )
    },
    {functional: true}
  )

  export const redirectAfterDeleteArticle = createEffect(
    (actions$ = inject(Actions), router = inject(Router))=>{
      return actions$.pipe(
        ofType(articleActions.deleteArticleSuccess),
        tap(() => {
          router.navigateByUrl('/')
        })
      )
  }, 
    {functional: true, dispatch: false}
  )