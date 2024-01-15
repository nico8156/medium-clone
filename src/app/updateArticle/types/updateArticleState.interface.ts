import { ArticleInterface } from "src/app/shared/types/articles.interface"
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface"

export interface UpdateArticleStateInterface{
    isLoading: boolean
    isSubmitting: boolean
    validationErrors: BackendErrorsInterface | null
    article: ArticleInterface |null
}