import { Directive, Renderer2, ElementRef, AfterViewInit } from '@angular/core'

@Directive({
    selector: '[appTimeStyling]'
})
export class TimeStylingDirective implements AfterViewInit {
    constructor(private _renderer:Renderer2, private _el: ElementRef) {

    }

    ngAfterViewInit() {
        // Get parent of the original input element
        var parent = this._el.nativeElement.parentNode;
        var text: string = this._el.nativeElement.innerText;
        
        // Create a span with class
        var spanElement = this._renderer.createElement("span");
        this._renderer.addClass(spanElement, "time-styling");

        for (let i = 0; i < text.length; i++) {
            // Add the span, just before the input
            this._renderer.insertBefore(parent, spanElement, this._el.nativeElement);
    
            // Remove the input
            this._renderer.removeChild(parent, this._el.nativeElement);
    
            // Remove the directive attribute (not really necessary, but just to be clean)
            this._renderer.removeAttribute(this._el.nativeElement, "appTimeStyling"); 
    
            // Re-add it inside the div
            this._renderer.appendChild(spanElement, this._el.nativeElement);
        }

    }
}