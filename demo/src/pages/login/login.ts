import { Component } from '@angular/core';

import { ViewController, ToastController ,NavController} from 'ionic-angular';
import { SMS } from 'ionic-native';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public phoneNum:string;
  public code:string = Math.floor(Math.random() * 10000 + 100000) + '';
  public password:string;
  public second:number = 60;
  public buttonDisable = null;

  constructor(private viewCtrl:ViewController, private toastCtrl:ToastController, private navCtrl:NavController) {

  }

  dismiss() {

    this.viewCtrl.dismiss();
  }

  sendSMS() {


    this.buttonDisable = true;
    var flag = setInterval(() => {
      this.phoneNum = "    " + this.second + '秒后可重发';
      this.second--;
      if (this.second <= 0) {
        clearInterval(flag);
        this.second = 60;
        this.phoneNum = '    重新发送';
        this.buttonDisable = null;
      }

    }, 1000);

    SMS.send(this.phoneNum, '您的验证码是' + this.code);
  }

  login() {


    if (this.password == this.code) {

      setTimeout(()=> {
        let toast = this.toastCtrl.create({
          message: '登陆成功',
          duration: 1500
        });
        toast.present();

        let data = {'code': this.code};
        this.viewCtrl.dismiss(data);
      }, 1500);


    } else {
      let toast = this.toastCtrl.create({
        message: '验证码错误',
        duration: 2000
      });
      toast.present();
    }
  }
}
