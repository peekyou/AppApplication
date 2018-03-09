import { Component } from '@angular/core';

@Component({
    templateUrl: './social-media.component.html',
    styleUrls: ['./social-media.component.scss'],
})
export class SocialMediaComponent {
    appUrl = 'https://soapptemplate.islamine.com';
    facebookUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + this.appUrl;
    twitterUrl = 'https://twitter.com/intent/tweet/?url=' + this.appUrl + '&text=Check out this application!&via=SoApp';
    googlePlusUrl = 'https://plus.google.com/share?url=' + this.appUrl;

    constructor() { }
}
