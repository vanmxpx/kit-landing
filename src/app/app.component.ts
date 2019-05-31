import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public smoothScroll(id: string): void {
        let elem = document.getElementById(id);
        if (elem) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
        } else { 
            console.error("Cannot scroll to unexisting elemet.");
        }
    }
}
