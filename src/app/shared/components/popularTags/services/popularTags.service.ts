import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { PopularTagType } from "src/app/shared/types/popularTag.type";
import { environment } from "src/environments/environment";
import { GetPopularTagsResponseInterface } from "../types/getPopularTagsResponse";

@Injectable({
    providedIn:'root'
})

export class PopularTagsService{
    constructor(private http: HttpClient){}

    getPopularTags(): Observable<PopularTagType[]>{
        const fullUrl = environment.apiUrl + '/tags'
        return this.http.get<GetPopularTagsResponseInterface>(fullUrl).pipe(map((response) => response.tags))
    }
}