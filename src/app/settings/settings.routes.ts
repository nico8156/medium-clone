import { Route } from "@angular/router";
import { SettingsComponent } from "./component/settings.component";
import { provideState } from "@ngrx/store";
import { settingsFeaureKey, settingsReducer } from "./store/reducers";

export const routes: Route[] = [
    {
        path: '',
        component: SettingsComponent, 
        providers:[provideState(settingsFeaureKey, settingsReducer)]
    }
]