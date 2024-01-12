import { GetFeedResponse } from "./getFeedResponse.interface"

export interface FeedStateInterface{
    isLoading: boolean
    error: string | null
    data: GetFeedResponse | null
}