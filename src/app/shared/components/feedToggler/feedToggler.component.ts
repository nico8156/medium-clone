import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "src/app/auth/store/reducers";

@Component({
    selector:'mc-feed-toggler',
    templateUrl:'./feedToggler.component.html',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, CommonModule]
})

export class FeedTogglerComponent{
    @Input() tagName?:string

    constructor(
        private store : Store
    ){}

    currentUser$= this.store.select(selectCurrentUser)
}