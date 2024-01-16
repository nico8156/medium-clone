import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AddToFavoriteService } from "./services/addToFavorites.service";
import { Store } from "@ngrx/store";
import { addToFavoriteActions } from "./store/actions";

@Component({
    selector:'mc-add-to-favorites',
    templateUrl:'./addToFavorites.component.html',
    standalone: true,
    imports:[CommonModule],
})

export class AddToFavoritesComponent{
    @Input() isFavorited: boolean = false
    @Input() articleSlug: string = ''
    @Input() favoritesCount: number = 0

    constructor(
        private store: Store
    ){}


    handleLike(){
        this.store.dispatch(addToFavoriteActions.addToFavorites({
            isFavorited: this.isFavorited,
            slug: this.articleSlug
        }))

        if(this.isFavorited){
            this.favoritesCount = this.favoritesCount -1
        }else{
            this.favoritesCount = this.favoritesCount +1
        }
        this.isFavorited = !this.isFavorited
        console.log('like')
    }
    
}