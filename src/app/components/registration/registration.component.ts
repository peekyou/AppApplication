import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import 'rxjs/add/observable/of';

import { ConfigurationService } from '../../core/services/configuration.service';
import { UserService } from '../../core/services/user.service';
import { LookupService } from '../../core/services/lookup.service';
import { Lookup } from '../../core/models/lookup';
import { User, Address } from '../../core/models/user';
import { CustomerCustomFields } from '../../core/models/customerCustomFields';
import { AuthService } from '../+auth/auth.service';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
    loader: Subscription;
    loading = false
    filteredCities: Observable<Lookup[]>;
    filteredProducts: Observable<Lookup[]>;
    cities: Lookup[] = [];

    email = this.fb.control(null, Validators.email);
    cityZipCode = this.fb.control(null, (c) => this.customAddressValidator(c, 'cityZipCode'));
    favoriteProduct = this.fb.control(null);
    customField1 = this.fb.control(null, (c) => this.customFieldValidator(c, 1));
    customField2 = this.fb.control(null, (c) => this.customFieldValidator(c, 2));
    customField3 = this.fb.control(null, (c) => this.customFieldValidator(c, 3));
    customField4 = this.fb.control(null, (c) => this.customFieldValidator(c, 4));

    form = this.fb.group({
        gender: this.fb.control('M', Validators.required),
        firstname: this.fb.control(null, Validators.required),
        lastname: this.fb.control(null, Validators.required),
        email: this.email,
        mobile: this.fb.control(null, Validators.required),
        birthdate: this.fb.control(null, Validators.required),
        address1: this.fb.control(null, (c) => this.customAddressValidator(c, 'address1')),
        city: this.fb.control(null, (c) => this.customAddressValidator(c, 'city')),
        cityZipCode: this.cityZipCode,
        favoriteProduct: this.favoriteProduct,
        customField1: this.customField1,
        customField2: this.customField2,
        customField3: this.customField3,
        customField4: this.customField4,
    });
    
    constructor(
        private fb: FormBuilder,
        private lookupService: LookupService,
        public s: ConfigurationService,
        private service: UserService,
        private auth: AuthService,
        private router: Router) {

        this.lookupService.fetchCities('fr').subscribe(res => {
            this.cities = res;
        });

        this.filteredCities = this.form.controls['cityZipCode'].valueChanges
            .pipe(
                startWith(''),
                debounceTime(200),
                distinctUntilChanged(),
                map(option => option && option.length >= 3 ? this._filterLookup(option, this.cities) : [])
            );

        this.filteredProducts = this.form.controls['favoriteProduct'].valueChanges
            .pipe(
                startWith(''),
                debounceTime(200),
                distinctUntilChanged(),
                map(option => option ? this._filterLookup(option, this.s.products) : this.s.products.slice())
            );
    }

    createUser() {
        this.loading = true;
        if (!this.service.user) {
            this.service.user = new User();
        }
        this.service.user.gender = this.form.value.gender;
        this.service.user.firstname = this.form.value.firstname;
        this.service.user.lastname = this.form.value.lastname;
        this.service.user.email = this.form.value.email;
        this.service.user.mobileNumber = this.form.value.mobile;
        this.service.user.birthdate = this.form.value.birthdate;
        this.service.user.favoriteProducts = [this.form.value.favoriteProduct];
        if (this.s.config.merchants[0].address && Address.combineCityZipCode(this.s.config.merchants[0].address.country.id)) {
            var cityZipCode = this.getCityZipCode(this.form.value.cityZipCode);
            this.service.user.address.city = cityZipCode[0];
            this.service.user.address.zipCode = cityZipCode[1];
        }
        else {
            this.service.user.address.city = Lookup.getValue(this.form.value.city);
        }
        
        this.service.user.customField1 = CustomerCustomFields.getValue(this.form.value.customField1);
        this.service.user.customField2 = CustomerCustomFields.getValue(this.form.value.customField2);
        this.service.user.customField3 = CustomerCustomFields.getValue(this.form.value.customField3);
        this.service.user.customField4 = CustomerCustomFields.getValue(this.form.value.customField4);

        this.loader = this.service
            .create(this.service.user)
            .subscribe(
                res => {
                    this.loading = false;
                    this.auth.afterLogin(res.loginToken);
                    this.service.launchTimer();
                    this.router.navigate(['/loyaltycard'], { queryParams: { t: res.urlToken }});
                },
                err =>this.loading = false
            );
    }

    private _filterLookup(value: string, list: Lookup[]): any[] {
        if (typeof value === 'string') {
            const filterValue = value.toLowerCase();
            return list.filter(c => c.name.toLowerCase().indexOf(filterValue) !== -1);
        }
    }

    displayFn(val: Lookup) {
        return val ? val.name : val;
    }

    private customAddressValidator(control: AbstractControl, name: string): ValidationErrors {
        if (this.s.config && this.s.config.merchants[0].address && this.s.config.merchants[0].address.country) {
            switch (name) {
                case 'address1': return null; // Check merchant conf for showAddressLine
                case 'city': return Address.showCity(this.s.config.merchants[0].address.country.id) ? Validators.required(control) : null;
                case 'cityZipCode': return Address.combineCityZipCode(this.s.config.merchants[0].address.country.id) ? Validators.required(control) : null;
            }
        }
        return null;
    }

    private customFieldValidator(control: AbstractControl, index:  number): ValidationErrors {
        if (this.s.customerCustomFields && this.s.customerCustomFields.length > index - 1) {
            var field = this.s.customerCustomFields[index - 1];
            if (field && field.mandatory && field.fieldType != 'checkbox') {
                return Validators.required(control);
            }
        }
        return null;
    }

    private getCityZipCode(value: Lookup) {
        var city = null;
        var zipCode = null;
        if (value && value.id) {
            city = value.id;
            zipCode = value.name.split(' - ')[0];
        }
        return [city, zipCode];
    }
}
