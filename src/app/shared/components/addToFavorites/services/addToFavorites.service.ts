import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ArticleResponseInterface } from "src/app/article/types/articleResponseInterface";
import { ArticleInterface } from "src/app/shared/types/articles.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class AddToFavoriteService{

    constructor(
        private http: HttpClient
    ){}

    addToFavorites(slug: string): Observable<ArticleInterface>{
        const url = this.getUrl(slug)
        return this.http
            .post<ArticleResponseInterface>(url,{})
            .pipe(map((response)=> 
                response.article
            ))

    }

    removeFromFavorites(slug: string): Observable<ArticleInterface>{
        const url = this.getUrl(slug)
        return this.http
        .delete<ArticleResponseInterface>(url)
        .pipe(map((response)=> 
            response.article
        ))
    }

    getUrl(slug: string): string{
        return `${environment.apiUrl}/articles/${slug}/favorite`
    }
}