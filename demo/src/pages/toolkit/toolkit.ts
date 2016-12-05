import { Component } from '@angular/core';

import { Flashlight } from 'ionic-native';
import { BarcodeScanner } from 'ionic-native';
import { Vibration } from 'ionic-native';

import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'toolkit-page',
  templateUrl: 'toolkit.html',

})
export class ToolPage {
  public flag:boolean;
  public text:string;
  kuaidiData = [];
  hostURL = 'http://v.juhe.cn/exp/index';
  APPKEY:string = '47b4dd7874f7e938b838cd13f49fdb14';
  public name;
  public num;

  constructor(public toastCtrl:ToastController, private http:Http) {

  }

  light() {
    Flashlight.toggle();
  }

  barcode() {
    BarcodeScanner.scan().then((barcodeData) => {
      let toast = this.toastCtrl.create({
        message: '扫描成功',
        duration: 1000
      });
      toast.present();
    }, (err) => {
      // An error occurred

    });
  }

  vibration() {
    Vibration.vibrate([2000, 1000, 2000]);
  }

  getHttp() {
    let url = this.hostURL + '?key=' + this.APPKEY + '&com=' + this.name + '&no=' + this.num;
    console.log(url);
    this.http.get(url).map(res=>res.json()).subscribe(data=> {
      if (data.error_code == 0) {
        this.kuaidiData.push({
          reason: data.reason
        });
        for (var i = 0; i < data.result.list.length; i++) {
          this.kuaidiData.push({
            datetime: data.result.list[i].datetime,
            remark: data.result.list[i].remark
          })
        }
      } else {
        this.kuaidiData.push({
          detail: '该单号暂无物流进展，请稍后再试，或检查公司和单号是否有误'
        })
      }
    })
  }

  searchExpress() {
    this.getHttp();
    console.log('niam');
    console.log(this.name);
  }
}
