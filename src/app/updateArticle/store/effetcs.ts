import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { updateArticleActions } from "./actions"
import { switchMap, catchError, map, of, tap } from "rxjs"
import { ArticleInterface } from "src/app/shared/types/articles.interface"
import { Router } from "@angular/router"
import { UpdateArticleService } from "../services/updateArticle"
import { HttpErrorResponse } from "@angular/common/http"
import {ArticleService as sharedArticleService} from 'src/app/article/service/article.service'


export const getArticleEffect = createEffect(
  (
      actions$ = inject(Actions), 
      articleService = inject(sharedArticleService), 
  ) => {
    return actions$.pipe(
      ofType(updateArticleActions.getArticle),
      switchMap(({slug}) => {
        return articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return updateArticleActions.getArticleSuccess({article})
          }),
          catchError(() => {
            return of(
              updateArticleActions.getArticleFailure()
            )
          })
        )
      })
    )
  },
  {functional: true}
)

export const updateArticleEffect = createEffect(
    (
        actions$ = inject(Actions), 
        updateArticleService = inject(UpdateArticleService), 
    ) => {
      return actions$.pipe(
        ofType(updateArticleActions.updateArticle),
        switchMap(({request, slug}) => {
          return updateArticleService.updateArticle(slug,request).pipe(
            map((article: ArticleInterface) => {
              return updateArticleActions.updateArticleSuccess({article})
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                updateArticleActions.updateArticleFailure({errors: errorResponse.error.errors})
              )
            })
          )
        })
      )
    },
    {functional: true}
  )

  export const redirectAfterUpdateArticle = createEffect(
    (actions$ = inject(Actions), router = inject(Router))=>{
      return actions$.pipe(
        ofType(updateArticleActions.updateArticleSuccess),
        tap(({article}) => {
          router.navigate(['/articles', article.slug])
        })
      )
  }, 
    {functional: true, dispatch: false}
  )