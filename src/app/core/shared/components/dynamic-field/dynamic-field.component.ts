import { Component, OnInit, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, FormControl, AbstractControl } from "@angular/forms";
import { FormGroup, FormArray } from '@angular/forms';

import { CustomerCustomFields } from '../../../models/customerCustomFields';

@Component({
    selector: 'app-dynamic-field',
    templateUrl: './dynamic-field.component.html',
    styleUrls: ['./dynamic-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DynamicFieldComponent),
            multi: true,
        }
    ],    
})
export class DynamicFieldComponent implements OnInit, ControlValueAccessor {
    private checkboxValue = true;
    private fieldName: string;
    private _value: string;
    private _onTouchedCallback: () => {};    
    private _onChangeCallback: (_: any) => {};
    @Input() formControl: AbstractControl;
    @Input() field: CustomerCustomFields;

    @Input()
    get value(): string {
        return this._value;
    }
    set value(value: string) {
        this._value = value;
        if (this._onChangeCallback) {
            this._onChangeCallback(value);
        }
        if (this._onTouchedCallback) {
            this._onTouchedCallback();
        }
    }
    
    constructor() {
    }

    ngOnInit() {
        if (this.field) {
            if (!this.fieldName) {
                this.fieldName = 'customField' + this.field.order;
            }
        }
    }

    onBlur() {
        if (this._onTouchedCallback) {
            this._onTouchedCallback();
        }
    }

    //From ControlValueAccessor interface
    writeValue(value: string) {
        this._value = value;
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }
}