import { Directive, ElementRef, Inject, HostListener } from '@angular/core';

@Directive({
    selector: '[integer]'
})
export class IntegerDirective {
    private el: HTMLInputElement;

    constructor(@Inject(ElementRef) private elementRef: ElementRef) { // , private ngModel: NgModel
        this.el = this.elementRef.nativeElement;
    }
    @HostListener('ngModelChange', ['$event'])
    onChanged(event) {
        if (!event) {
            this.el.value = '';
            // this.ngModel.update.next(this.el.value);
            return;
        }
        let regex = /^\d+$/;
        if (regex.test(event)) {
            return;
        }

        this.el.value = '';
        // this.ngModel.update.next(this.el.value);

    }

    @HostListener('paste', ['$event'])
    onPaste(event) {
        if (!event) {
            return;
        }
        let value = '';
        if (event.clipboardData) {
            value = event.clipboardData.getData('text/plain');
        } else {
            if ((window as any).clipboardData) {
                value = (window as any).clipboardData.getData('Text');
            }
        }

        if (!value) {
            return;
        }
        let pattern = /^\d+$/;
        if (!pattern.test(value)) {

            if (event.preventDefault) {
                event.preventDefault();
            }
        }
    }

    @HostListener('keypress', ['$event'])
    onKeypress(evt) {
        let theEvent = evt || window.event;
        let key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        let regex = /[0-9]/;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) {
                theEvent.preventDefault();
            }
        }
    }
}
