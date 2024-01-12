import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetFeedResponse } from "../types/getFeedResponse.interface";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FeedService{
    constructor(private http: HttpClient){}
    getFeed(url: string): Observable<GetFeedResponse>{
        const fullUrl = environment.apiUrl + url
        return this.http.get<GetFeedResponse>(fullUrl)
    }
}