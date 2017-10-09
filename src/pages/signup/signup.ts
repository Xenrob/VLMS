import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  responseData:any;
  userData = {"username":"","password":"","email":"","name":""};

  constructor(public navCtrl: NavController, public authServiceProvider: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  //signup function - when signup is successful then redirect to tabs page
  signup() {
    //Api connections
    this.authServiceProvider.postData(this.userData, "signup").then((result) =>{
      this.responseData = result;
      console.log(this.responseData);
      //because we are taking data from different pages
      //then we use this as cashe
      localStorage.setItem('userData', JSON.stringify(this.responseData))
      this.navCtrl.push(TabsPage);
    }, (err) =>{
      //connection failed message
    });
  }
}
