import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { FeedService } from "../services/feed.service"
import { feedActions } from "./actions"
import { map, switchMap, catchError, of } from "rxjs"
import { GetFeedResponse } from "../types/getFeedResponse.interface"

export const getCurrentUserEffect = createEffect(
    (
        actions$ = inject(Actions), 
        feedService = inject(FeedService), 
    ) => {
      return actions$.pipe(
        ofType(feedActions.getFeed),
        switchMap(({url}) => {
          return feedService.getFeed(url).pipe(
            map((feed: GetFeedResponse) => {
              return feedActions.getFeedSuccess({feed})
            }),
            catchError(() => {
              return of(
                feedActions.getFeedFailure()
              )
            })
          )
        })
      )
    },
    {functional: true}
  )