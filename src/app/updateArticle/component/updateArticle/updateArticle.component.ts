import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable, combineLatest, filter, map } from "rxjs";
import { ArticleFormComponent } from "src/app/shared/components/articleForm/articleForm.component";
import { ArticleFormValuesInterface } from "src/app/shared/components/articleForm/types/articleFormValues.interface";
import { selectIsSubmitting, selectValidationErrors, selectArticle, selectIsLoading } from "../../store/reducers";
import { ArticleRequestInterface } from "src/app/shared/types/articleRequest.interface";
import { updateArticleActions } from "../../store/actions";
import { CommonModule } from "@angular/common";
import { LoadingComponent } from "src/app/shared/components/loading/loading.component";
import { ActivatedRoute } from "@angular/router";
import { ArticleInterface } from "src/app/shared/types/articles.interface";

@Component({
    selector: 'mc-update-article',
    templateUrl: 'updateArticle.component.html',
    standalone: true,
    imports: [ArticleFormComponent, CommonModule, LoadingComponent]

})

export class UpdateArticleComponent implements OnInit{

    ngOnInit(): void {
        this.store.dispatch(updateArticleActions.getArticle({slug: this.slug}))
    }

    constructor(
        private store: Store,
        private router: ActivatedRoute
    ){}
    slug = this.router.snapshot.paramMap.get('slug')?? ''

    initialValues$: Observable<ArticleFormValuesInterface> = this.store.pipe(
        select(selectArticle),
        filter((article): article is ArticleInterface => article !== null ),
        map((article: ArticleInterface) => {
            return {
                title: article.title,
                description: article.description,
                body: article.body,
                tagList: article.tagList,
            }
        })
    )
    data$ = combineLatest({
        isSubmitting: this.store.select(selectIsSubmitting),
        isLoading: this.store.select(selectIsLoading),
        backendErrors: this.store.select(selectValidationErrors),
        initialValues: this.initialValues$
    })
    onSubmit(articleFormValues: ArticleFormValuesInterface){
        const request: ArticleRequestInterface = {
            article: articleFormValues
        }
        this.store.dispatch(updateArticleActions.updateArticle({request,slug: this.slug}))
    }
}