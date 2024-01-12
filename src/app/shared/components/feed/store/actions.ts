import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GetFeedResponse } from "../types/getFeedResponse.interface";

export const feedActions = createActionGroup({
    source: 'feed',
    events:{
        'Get feed': props<{url: string}>(),
        'Get feed success': props<{feed: GetFeedResponse}>(),
        'Get feed failure': emptyProps(),
    }
})