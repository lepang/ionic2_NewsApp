import {Component, ViewChild} from '@angular/core';
import {Platform, ToastController, ViewController, NavController, App, ModalController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import { WelcomePage } from '../pages/welcome/welcome';
import {TabsPage} from "../pages/tabs/tabs";
import {StorageService} from '../providers/StorageService';
import {LoginPage} from '../pages/login/login';
import './rxjs-operators';
import {ImagePicker} from 'ionic-native';
import {Brightness} from 'ionic-native';

@Component({
  selector: 'app-page',
  template: `
  <ion-menu [content]="menuContent">
  <ion-header style="height:30%">
       <img class="ig" src= {{picture}} (click)="getPicture()">
       <span class="dianji" (click)="enterLoginPage()">{{usename}}</span>
  </ion-header>

  <ion-content>
    <ion-list>
      <ion-item><ion-icon name="ios-arrow-forward-outline"  item-right></ion-icon>消息通知</ion-item>


 <ion-item><ion-icon name="ios-arrow-forward-outline"  item-right></ion-icon>商城 <span>特卖, 电影</span></ion-item>
 <ion-item><ion-icon name="ios-arrow-forward-outline"  item-right></ion-icon>京东特卖 头条专享</ion-item>
 <ion-item><ion-icon name="ios-arrow-forward-outline"  item-right></ion-icon>我要爆料</ion-item>
  <ion-item><ion-icon name="ios-arrow-forward-outline"  item-right></ion-icon>反馈</ion-item>
   <ion-item><ion-icon name="ios-arrow-forward-outline"  item-right></ion-icon>我的相册</ion-item>
      <ion-item><ion-icon name="ios-arrow-forward-outline"  item-right></ion-icon>关于</ion-item>
    </ion-list>
     <ion-row>
   <ion-col>
            <button ion-button icon-left clear color="dark">
            <ion-icon name="ios-star-outline"></ion-icon>
            收藏
           </button>
</ion-col>
  <ion-col>
              <button ion-button icon-left clear color="dark" (click)="setBrightness()">
            <ion-icon name="ios-moon"></ion-icon>
            夜间
           </button>
  </ion-col>
  <ion-col>
              <button ion-button icon-left clear color="dark">
            <ion-icon name="ios-settings"></ion-icon>
            设置
           </button>
   </ion-col>
 </ion-row>
  </ion-content>

</ion-menu>
  <ion-nav swipeBackEnabled="true"  #menuContent [root]="rootPage" #myNav ></ion-nav>
  `
})
export class MyApp {
  @ViewChild('myNav') nav
  rootPage:any;
  private backpressed:boolean = false;
  public usename:string;
  public picture:string;
  public flag:boolean;

  constructor(public platform:Platform, private storageService:StorageService,
              public toastCtrl:ToastController, private app:App, private modalCtrl:ModalController) {
    let value = this.storageService.read('first');
    if (value) {
      this.rootPage = TabsPage;
    } else {
      this.storageService.write('first', 'true');
      this.rootPage = WelcomePage;
    }


    if (this.storageService.read('name')) {
      this.usename = this.storageService.read('name');
    } else {
      this.usename = '点击登陆';
    }


    if (this.storageService.read('storePicture')) {
      this.picture = this.storageService.read('storePicture');
    } else {
      this.picture = 'images/22.jpg';
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      // Splashscreen.hide();

      platform.registerBackButtonAction(() => {

        let nav:NavController = this.app.getActiveNav();
        let view:ViewController = nav.getActive();

        if (view && view.enableBack()) {
          view.dismiss();//.pop();

          return;
        }
        if (!this.backpressed) {
          this.backpressed = true;
          let toast = this.toastCtrl.create({
            message: '再按一次退出',
            duration: 1500,
            position: 'middle'

          });
          toast.present();

          setTimeout(() => this.backpressed = false, 2000);
          return;
        }

        platform.exitApp();
      });
    });


  }

  enterLoginPage() {
    console.log('nima');
    let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(data => {
      this.storageService.write('name', data.code);

      console.log(data.code);
    });
    modal.present();
  }

  getPicture() {
    ImagePicker.getPictures('').then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.picture = results[i];
        this.storageService.write('storePicture', this.picture);
      }

    }, (err) => {
    });
  }

  setBrightness() {

    let brightnessValue:number = 0.3;
    if (this.flag) {
      Brightness.setBrightness(1);
      this.flag = false;
    } else {

      Brightness.setBrightness(brightnessValue);
      this.flag = true;
    }


  }


}

