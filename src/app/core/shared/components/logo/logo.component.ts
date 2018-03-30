import { Component } from '@angular/core';
import { ConfigurationService } from '../../../services/configuration.service';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
    constructor(public s: ConfigurationService) { }
}