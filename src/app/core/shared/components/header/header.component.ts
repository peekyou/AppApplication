import { Component, Inject, Input } from '@angular/core';

import { ConfigurationService } from '../../../services/configuration.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    @Input() title: string;
    @Input() fixedHeight: boolean = false;

    constructor(public s: ConfigurationService) { 
    }
}