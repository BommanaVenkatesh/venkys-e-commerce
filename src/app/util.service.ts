/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private dataSubject = new BehaviorSubject<any>(null); // For the first data stream
  private data1Subject = new BehaviorSubject<any>(null); // For the second data stream

  data$ = this.dataSubject.asObservable();
  data1$ = this.data1Subject.asObservable();

  updateData(data: any) {
    this.dataSubject.next(data); // This updates data$
  }

  // Method to update the second data stream
  updateData1(data1: any) {
    this.data1Subject.next(data1); // This updates data1$
  }
  private toast: HTMLIonToastElement | null = null;

  applicationURL = environment.baseUrl;

  values: any = [];
  baseURL = environment.baseUrl;
  currentArticle: any;
  currentCourse: any;
  videoInitPage = '/tabs/home';
  courseInitPage = '/tabs/explore';
  constructor(
    private http: HttpClient,
    private router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private modalCtrl: ModalController,
    private spinner: NgxSpinnerService
  ) {}

  isBrowser = true;
  accessToken: string = '';

  isLoggedIn = false;
  loggedInUser: any;
  private _headers = new HttpHeaders().set(
    'Content-Type',
    'application/json+protobuf'
  );
  static prod: any;
  public sharedData: any;
  private headersX = this._headers
    .append('Accept', 'application/json')
    .append('Access-Control-Expose-Headers', 'Authorization');
  public post(endpoint: any, postObj: any, loader: any) {
    this.headersX = this._headers.append(
      'Authorization',
      'Bearer ' + this.getAccessToken()
    );
    return new Promise((resolve, reject) => {
      if (loader) {
        this.spinner.show();
      }
      this.http
        .post(this.baseURL + endpoint, postObj, { headers: this.headersX })
        .subscribe(
          (res) => {
            try {
              const data: any = res;
              resolve(data);

              if (loader) {
                this.spinner.hide();
              }
            } catch (e) {}
          },
          (err) => {
            if (err?.status === 401) {
              this.logout();
            }
            resolve(err);
            reject(err);
            if (loader) {
              this.spinner.hide();
            }
          }
        );
    });
  }

  public googleApi(payload: any) {
    this.headersX = this._headers.append(
      'x-goog-api-key',
      'AIzaSyATBXajvzQLTDHEQbcpq0Ihe0vWDHmO520'
    );
    return new Promise((resolve, reject) => [
      this.http
        .post('https://translate-pa.googleapis.com/v1/translateHtml', payload, {
          headers: this.headersX,
        })
        .subscribe(
          (res) => {
            const data = res;
            resolve(data);
          },
          (err) => [resolve(err), reject(err)]
        ),
    ]);
  }
  getAccessToken() {
    let token = localStorage.getItem('accessToken');
    if (token) {
      token = token;
    } else {
      token = null;
    }
    return token;
  }
  public get(endpoint: any, loader: any) {
    this.headersX = this._headers.append(
      'Authorization',
      'Bearer ' + this.getAccessToken()
    );
    if (loader) {
      this.spinner.show();
    }
    return new Promise((resolve, reject) => {
      this.http
        .get(this.baseURL + endpoint, { headers: this.headersX })
        .subscribe(
          (res) => {
            try {
              const data: any = res;
              if (loader) {
                this.spinner.hide();
              }
              resolve(data);
            } catch (e) {
              if (loader) {
                this.spinner.hide();
              }
            }
          },
          (err) => {
            if (err?.status === 401) {
              this.logout();
            }
            if (loader) {
              this.spinner.hide();
            }
            resolve(err);
            reject(err);
          }
        );
    });
  }

  public patch(endpoint: string, data: any, loader: boolean) {
    this.headersX = this._headers
      .append('Authorization', 'Bearer ' + this.getAccessToken())
      .append('Platform', 'App');
    return new Promise((resolve, reject) => {
      this.http
        .patch(this.baseURL + endpoint, data, { headers: this.headersX })
        .subscribe(
          (res) => {
            try {
              const responseData = res;
              resolve(responseData);
            } catch (e) {}
          },
          (err) => {
            if (err?.status === 401) {
              this.logout();
            }
            reject(err);
          }
        );
    });
  }

  public put(endpoint: any, postObj: any, loader: any) {
    this.headersX = this._headers.append(
      'Authorization',
      'Bearer ' + this.getAccessToken()
    );
    return new Promise((resolve, reject) => {
      if (loader) {
        this.spinner.show();
      }
      this.http
        .put(this.baseURL + endpoint, postObj, { headers: this.headersX })
        .subscribe(
          (res) => {
            try {
              const data: any = res;
              resolve(data);

              if (loader) {
                this.spinner.hide();
              }
            } catch (e) {}
          },
          (err) => {
            if (err?.status === 401) {
              this.logout();
            }
            resolve(err);
            reject(err);
            if (loader) {
              this.spinner.hide();
            }
          }
        );
    });
  }
  public delete(endpoint: any, loader: any) {
    this.headersX = this._headers.append(
      'Authorization',
      'Bearer ' + this.getAccessToken()
    );
    return new Promise((resolve, reject) => {
      this.http
        .delete(this.baseURL + endpoint, { headers: this.headersX })
        .subscribe(
          (res) => {
            try {
              const data: any = res;
              resolve(data);
            } catch (e) {}
          },
          (err) => {
            if (err?.status === 401) {
              this.logout();
            }
            resolve(err);
            reject(err);
          }
        );
    });
  }
  allowedMenuItems: string[] = ['dashboard', 'my-exposure'];

  allowMenuList(menuItem: string): boolean {
    const devMode = JSON.parse(localStorage.getItem('devMode') || 'false');

    if (devMode || this.allowedMenuItems.includes(menuItem)) {
      return true;
    }

    return false;
  }

  setlocalStorage(key: string, val: string) {
    localStorage.setItem(key, val);
  }
  mobileMenu = false;

  getlocalStorage(myKey: string) {
    let val = localStorage.getItem(myKey);
    if (val) {
      val = val;
    } else {
      val = '';
    }
    return val;
  }
  removelocalStorage(myKey: string) {
    localStorage.removeItem(myKey);
  }
  value: any = {};

  clearCache() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('loggedInUser');
  }

  setAccessToken(token: any) {
    if (this.isBrowser) {
      this.accessToken = token;
      localStorage.setItem('accessToken', this.accessToken);
    }
  }

  showWarning(arg0: string) {
    Swal.fire({
      icon: 'warning',
      text: arg0,
      heightAuto: false,
    });
  }
  showSuccess(arg0: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: arg0,
      heightAuto: false,
    });
  }
  showError(arg0: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: arg0,
      heightAuto: false,
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  setCurrentUser(loggedInUser: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    this.loggedInUser = loggedInUser;
  }

  getCurrentUser() {
    const storageUser = localStorage.getItem('loggedInUser');
    if (storageUser) {
      this.loggedInUser = JSON.parse(storageUser);
      return this.loggedInUser;
    }
    return null;
  }

  networkStatusMessage: string = '';
  networkType: string = '';

  // async initializeNetworkListener() {
  //   try {
  //     const status = await Network.getStatus();
  //     //this.updateNetworkStatus(status);
  //     Network.addListener('networkStatusChange', (status) => {
  //       this.updateNetworkStatus(status);
  //     });
  //   } catch (error) {
  //     console.error('Error initializing network listener:', error);
  //     this.networkStatusMessage = 'Error initializing network listener.';
  //     this.networkType = 'Unknown';
  //     this.presentToast(
  //       'Error initializing network listener',
  //       'top',
  //       2000,
  //       'failure-toast'
  //     );
  //   }
  // }

  // updateNetworkStatus(status: NetworkStatus) {
  //   if (status.connected) {
  //     this.networkStatusMessage = 'Connected';
  //     this.networkType =
  //       status.connectionType === 'wifi'
  //         ? 'Wi-Fi'
  //         : status.connectionType === 'cellular'
  //         ? 'Cellular'
  //         : status.connectionType;

  //     if (this.toast) {
  //       this.toast.dismiss();
  //       this.toast = null;
  //     }

  //     this.presentToast('Back online', 'middle', 2000, 'success-toast');
  //   } else {
  //     this.networkStatusMessage = 'No Internet Connection';
  //     this.networkType = 'Not Connected';

  //     this.presentToast('No connection', 'middle', 0, 'failure-toast');
  //   }
  // }

  async presentToast(
    message: string,
    position: 'top' | 'middle' | 'bottom',
    duration: number,
    cssApply: string
  ) {
    if (this.toast) {
      this.toast.dismiss();
    }

    this.toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'middle',
      cssClass: cssApply,
    });

    await this.toast.present();
  }
  cart: any = [];

  addToCart(toAddItem: any) {
    let added = false;
    this.cart.forEach((item: any) => {
      if (item.id === toAddItem.id && item.size === toAddItem.size) {
        if (!item.qty) {
          item.qty = 1;
        }
        item.qty += toAddItem.selectedQty ?? 1;
        item.selectedPrice = item.selectedPrice;
        added = true;
      }
    });

    if (!added) {
      if (!toAddItem.qty) {
        toAddItem.qty = toAddItem.selectedQty ?? 1;
      }
      this.cart.push(JSON.parse(JSON.stringify(toAddItem)));
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeCartItem(toAddItem: any) {
    this.cart.forEach((item: any, i: any) => {
      if (item.id === toAddItem.id && item.size === toAddItem.size) {
        this.cart.splice(i, 1);
      }
    });

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
