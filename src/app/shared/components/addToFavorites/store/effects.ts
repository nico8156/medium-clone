import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { AddToFavoriteService } from "../services/addToFavorites.service"
import { addToFavoriteActions } from "./actions"
import { map, switchMap, catchError, of } from "rxjs"
import { ArticleInterface } from "src/app/shared/types/articles.interface"

export const addToFavoritesEffect = createEffect(
    (
        actions$ = inject(Actions), 
        addToFavoriteService = inject(AddToFavoriteService), 
    ) => {
      return actions$.pipe(
        ofType(addToFavoriteActions.addToFavorites),
        switchMap(({isFavorited, slug}) => {
            const article$ = isFavorited ? addToFavoriteService.removeFromFavorites(slug)
                                        : addToFavoriteService.addToFavorites(slug)
          return article$.pipe(
            map((article: ArticleInterface) => {
              return addToFavoriteActions.addToFavoritesSuccess({article})
            }),
            catchError(() => {
              return of(
                addToFavoriteActions.addToFavoritesFailure()
              )
            })
          )
        })
      )
    },
    {functional: true}
  )