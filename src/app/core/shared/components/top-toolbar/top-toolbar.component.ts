import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-top-toolbar',
    templateUrl: './top-toolbar.component.html',
    styleUrls: ['./top-toolbar.component.scss'],
})
export class TopToolbarComponent implements OnInit {
    @Input() title: string;

    constructor(public location: Location) {}

    public ngOnInit() {
    }
}
