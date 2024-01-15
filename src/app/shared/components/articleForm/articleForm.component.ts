import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ArticleFormValuesInterface } from "./types/articleFormValues.interface";
import { BackendErrorsInterface } from "../../types/backendErrors.interface";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BackendErrorMessages } from "../backendErrorMessages/backendErrorMessages.component";

@Component({
    selector: 'mc-article-form',
    templateUrl: 'articleForm.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, BackendErrorMessages]

})

export class ArticleFormComponent implements OnInit{
    @Input() initialValues?:ArticleFormValuesInterface
    @Input() isSubmitting: boolean = false
    @Input() errors: BackendErrorsInterface | null = null

    @Output() articleSubmit = new EventEmitter<ArticleFormValuesInterface>()
    constructor(
        private fb: FormBuilder
    ){}

    form = this.fb.nonNullable.group({
        title: '',
        description: '',
        body: '',
        tagList: ''
    })

    ngOnInit(): void {
        this.initializeForm()
    }

    initializeForm(){

        if(!this.initialValues){
            throw new Error('Inputs are not provided')
        }

        this.form.patchValue({
            title: this.initialValues?.title,
            description: this.initialValues?.description,
            body: this.initialValues.body,
            tagList: this.initialValues.tagList.join(' ')
        })
    }

    onSubmit(){
        const formValue = this.form.getRawValue();
        const articleFormValue: ArticleFormValuesInterface = {
            ...formValue,
            tagList: formValue.tagList.split(' '),
        }
        this.articleSubmit.emit(articleFormValue)
    }
}