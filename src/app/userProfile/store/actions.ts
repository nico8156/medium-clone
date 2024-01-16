import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { UserProfileInterface } from "../types/userProfile.interface";

export const userProfileActions = createActionGroup({
    source: 'user Profile',
    events:{
        'Get user Profile': props<{slug: string}>(),
        'Get user Profile success': props<{userProfile: UserProfileInterface}>(),
        'Get user Profile failure': emptyProps(),
    }
})