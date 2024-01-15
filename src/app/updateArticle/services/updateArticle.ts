import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ArticleResponseInterface } from "src/app/article/types/articleResponseInterface";
import { ArticleRequestInterface } from "src/app/shared/types/articleRequest.interface";
import { ArticleInterface } from "src/app/shared/types/articles.interface";
import { environment } from "src/environments/environment";

@Injectable()

export class UpdateArticleService{
    constructor(
        private http: HttpClient
    ){}

    updateArticle(slug: string, articleRequest: ArticleRequestInterface): Observable<ArticleInterface>{
        const fullUrl = `${environment.apiUrl}/articles/${slug}`
        return this.http.put<ArticleResponseInterface>(fullUrl, articleRequest).pipe(map((response) => response.article))
    }
}