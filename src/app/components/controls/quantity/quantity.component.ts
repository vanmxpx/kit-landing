import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'kit-quantity',
    templateUrl: './quantity.component.html',
    styleUrls: [ './quantity.component.scss' ]
})
export class QuantityComponent {
    private _model: number = 0;

    @Input()
    get model(): number {
        return this._model;
    }
    set model(value: number) {
        this._model = value;
    }
    @Output()
    modelChange: EventEmitter<number> = new EventEmitter<number>();

    constructor() {

    }
    public increment(): void {
        this._model++;
        this.modelChange.next(this._model);
    }

    public decrement(): void {
        this._model--;
        this.modelChange.next(this._model);
    }
}
