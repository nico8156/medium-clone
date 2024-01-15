import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { createArticleActions } from "./actions"
import { switchMap, catchError, map, of, tap } from "rxjs"
import { ArticleInterface } from "src/app/shared/types/articles.interface"
import { Router } from "@angular/router"
import { CreateArticleService } from "../services/createArticle"
import { HttpErrorResponse } from "@angular/common/http"

export const createArticleEffect = createEffect(
    (
        actions$ = inject(Actions), 
        createArticleService = inject(CreateArticleService), 
    ) => {
      return actions$.pipe(
        ofType(createArticleActions.createArticle),
        switchMap(({request}) => {
          return createArticleService.createArticle(request).pipe(
            map((article: ArticleInterface) => {
              return createArticleActions.createArticleSuccess({article})
            }),
            catchError((errorResponse: HttpErrorResponse) => {
              return of(
                createArticleActions.createArticleFailure({errors: errorResponse.error.errors})
              )
            })
          )
        })
      )
    },
    {functional: true}
  )

  export const redirectAfterCreateArticle = createEffect(
    (actions$ = inject(Actions), router = inject(Router))=>{
      return actions$.pipe(
        ofType(createArticleActions.createArticleSuccess),
        tap(({article}) => {
          router.navigate(['/articles', article.slug])
        })
      )
  }, 
    {functional: true, dispatch: false}
  )