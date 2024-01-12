import { Component, Input } from "@angular/core";

@Component({
    selector:'mc-error-message',
    template:'<div>{{message}}</div>',
    standalone: true
})

export class ErroMessageComponent{
    @Input() message: string = 'something went wrong'
    
}