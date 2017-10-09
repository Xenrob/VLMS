import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public userDetails:any;
  public responseData:any;
  public dataSet:any;

  userPostData = {"user_id":"","token":"","vinfo":"","vinfo_id":""};

  constructor(public navCtrl: NavController, public app: App, public authServiceProvider: AuthServiceProvider) {
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.userPostData.user_id = this.userDetails.user_id;
    this.userPostData.token = this.userDetails.token;

    this.getvInfo(); //accessing the data
  }

  //access all the information
  getvInfo(){
    this.authServiceProvider.postData(this.userPostData, "vinfo").then((result) =>{
      this.responseData = result;
      if(this.responseData.vinfoData){
        this.dataSet = this.responseData.vinfoData;
        console.log(this.dataSet);
        /*
        let val = ev.target.value;

        //if the value is an emptystring don't filter the items
        if (val && val.trim() != '') {
          this.dataSet = this.dataSet.filter((item) => {
            return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
        else {
          console.log("Please enter item to search");
        }*/
      }
      else{
        console.log("No access");
      }
    }, (err) =>{
      //connection failed message
    });
  }


  backToWelcome(){
    const root = this.app.getRootNav();
    root.popToRoot();
  }

  //logout function
  logout(){
    //Api Token Logout
    localStorage.clear();
    setTimeout(()=>this.backToWelcome(), 500);
  }

}
