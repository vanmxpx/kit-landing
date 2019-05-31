import { NgModule } from '@angular/core';
import {
    MatButtonModule, 
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule
} from '@angular/material';


@NgModule({
exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule
]})
export class MaterialModule { }