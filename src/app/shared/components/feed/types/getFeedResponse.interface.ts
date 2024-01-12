import { ArticleInterface } from "src/app/shared/types/articles.interface"

export interface GetFeedResponse{
    articles: ArticleInterface[]
    articlesCount: number
}