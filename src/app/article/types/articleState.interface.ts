import { ArticleInterface } from "src/app/shared/types/articles.interface"

export interface ArticleStateInterface{
    isLoading: boolean
    error: string | null
    data: ArticleInterface | null
}