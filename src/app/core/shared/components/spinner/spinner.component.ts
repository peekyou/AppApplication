import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Loading } from '../../../interfaces/loading';

@Component({
    selector: 'app-spinner',
    template: `<div class="progress-container">
                    <mat-progress-bar mode="indeterminate" *ngIf="this.loader && !this.loader.closed">
                    </mat-progress-bar>
               </div>`,
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
    @Input() loader: Subscription;
    @Input() top: boolean;

    @HostBinding('style.position')
    position = 'static';

    ngOnInit() {
        if (this.top === true) {
            this.position = 'absolute';
        }
    }
}
