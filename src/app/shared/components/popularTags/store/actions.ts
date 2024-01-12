import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { GetPopularTagsResponseInterface } from "../types/getPopularTagsResponse";
import { PopularTagType } from "src/app/shared/types/popularTag.type";

export const popularTagsActions = createActionGroup({
    source: 'popular Tags',
    events:{
        'Get Popular Tags': emptyProps(),
        'Get Popular Tags success': props<{popularTags: PopularTagType[]}>(),
        'Get Popular Tags failure': emptyProps(),
    }
})