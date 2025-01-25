import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { NgxSpinnerService } from 'ngx-spinner';
declare var google: any;

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  constructor(
    public util: UtilService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  async ngOnInit() {}
  ionViewDidEnter() {
    this.loadProfile();
  }
  async loadProfile() {
    await this.util
      .get('profile', false)
      .then(async (res: any) => {
        console.log(res, 'res');
        if (res.status === 'ACTIVE') {
          this.userDetails = res;
          this.getAddress();
        } else {
          this.util.isLoggedIn = false;
        }
      })
      .catch((err: any) => {
        this.router.navigate(['/']);
      });
  }
  logout() {
    localStorage.clear();
    this.util.isLoggedIn = false;
    this.router.navigate(['login']);
  }
  userDetails: any = {};
  saveDetails() {}

  async getAddress() {
    await this.util.get('address', true).then((data: any) => {
      this.deliveryAddress = data;
    });
  }
  isAddressScreen: boolean = false;
  openDeliveryAddressScreen() {
    this.isAddressScreen = true;
  }
  GetLocation_Onlyccords() {
    Geolocation.getCurrentPosition()
      .then((resp: any) => {
        // this.geoLatitude = resp.coords.latitude;
        // this.geoLongitude = resp.coords.longitude;
        // this.geoAccuracy = resp.coords.accuracy;
      })
      .catch((error: any) => {
        // alert('Error getting location' + JSON.stringify(error));
      });
  }
  geoLatitude: any;
  geoLongitude: any;
  geoAccuracy: any;
  async GetLocation() {
    this.spinner.show();
    try {
      const options = {
        enableHighAccuracy: true, // Use GPS for better accuracy
        timeout: 10000, // Set a timeout (in milliseconds)
        maximumAge: 0, // Do not use a cached location
      };

      const position = await Geolocation.getCurrentPosition(options);
      this.geoLatitude = position.coords.latitude;
      this.geoLongitude = position.coords.longitude;
      this.geoAccuracy = position.coords.accuracy;
      await this.getGeoencoder(this.geoLatitude, this.geoLongitude);
    } catch (error) {
      alert('Error getting location: ' + JSON.stringify(error));
    }
  }
  async getGeoencoder(latitude: number, longitude: number) {
    try {
      const address: any = await this.reverseGeocode(latitude, longitude);
      this.generateAddress(address);
    } catch (error) {
      console.log([error]);
      alert('Error getting location: ' + JSON.stringify(error));
    }
  }
  geo_address1: any;
  geo_place: any;
  geo_address2: any;
  geo_pin: any;
  newAddress: any = {};
  geo_city: any;
  geo_state: any;
  //Return Comma saperated address
  generateAddress(address: string) {
    const addressParts = address.split(',');

    this.geo_address1 = addressParts.slice(0, 2).join(', ').trim();
    this.geo_address2 = addressParts.slice(2, 5).join(', ').trim();

    const stateAndPin = addressParts[addressParts.length - 2]?.trim() || '';
    this.geo_pin = stateAndPin.match(/\d{6}/)?.[0] || '';
    this.geo_state = stateAndPin.replace(this.geo_pin, '').trim();

    this.geo_city = addressParts[addressParts.length - 3]?.trim() || '';

    const placeWithoutPin = stateAndPin.replace(/\s*\d{6}$/, '').trim();
    this.geo_place = placeWithoutPin;

    this.newAddress = {
      address1: this.geo_address1,
      address2: this.geo_address2,
      place: this.geo_place,
      city: this.geo_city,
      state: this.geo_state,
      pincode: this.geo_pin,
    };
    this.spinner.hide();
  }
  deliveryAddress: any = [];
  async addAddress() {
    await this.util.post('address', this.newAddress, true).then((data: any) => {
      if (data.id) {
        this.newAddress = {};
        this.getAddress();
      }
    });

    this.isAddressScreen = false;
  }

  reverseGeocode(latitude: number, longitude: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      const latLng = new google.maps.LatLng(latitude, longitude);
      geocoder.geocode({ location: latLng }, (results: any, status: string) => {
        if (status === 'OK') {
          if (results[0]) {
            resolve(results[0].formatted_address); // Resolve with the formatted address
          } else {
            reject('No results found');
          }
        } else {
          reject('Geocoder failed due to: ' + status);
        }
      });
    });
  }
}
