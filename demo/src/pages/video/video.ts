import { Component } from '@angular/core';

import { NavController ,LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import { ThemeableBrowser } from 'ionic-native';
import { StorageService } from '../../providers/StorageService';
@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class VideoPage {
  public videoURL:string = 'http://op.juhe.cn/onebox/movie/video';
  public APPKEY:string = '99d2718c57c55d3b7ad1eae6ee142a70';
  public dataContents = [];
  public name = ["心花路放", "闪电侠", "龙珠超", "火影忍者", "天下第一", "康熙王朝", "闪电侠",
    "天下无贼", "三毛从军记", "青云志", "锦绣未央", "美人鱼", "拐个皇帝回现代", "胭脂", "幻城", "老九门", "校花的贴身高手", "蜀山战纪剑侠传奇",
    "盗墓笔记", "平凡的世界", "伪装者"];
  public index:number = -1;
  public VideoName:string;
  public picture:string;
  public loading;

  constructor(public navCtrl:NavController, private http:Http, private storageService:StorageService, private loadCtrl:LoadingController) {
    this.loading = this.loadCtrl.create({
      content: '加载中...',

    });

    this.loading.present();

    this.getNewVideo();
    if (this.storageService.read('storePicture')) {
      this.picture = this.storageService.read('storePicture');
    } else {
      this.picture = 'images/22.jpg';
    }

  }


  getNewVideo() {
    for (var j = 0; j < 3; j++) {
      this.index++;
      let url = this.videoURL + '?key=' + this.APPKEY + '&q=' + this.name[this.index];
      this.http.get(url).map(res=>res.json()).subscribe(data=> {
        var playdizhi = "";
        if (data.result.playlinks.qq) {
          playdizhi = data.result.playlinks.qq;
        } else if (data.result.playlinks.youku) {
          playdizhi = data.result.playlinks.youku;
        } else if (data.result.playlinks.leshi) {
          playdizhi = data.result.playlinks.leshi;
        } else if (data.result.playlinks.sohu) {
          playdizhi = data.result.playlinks.sohu;
        } else if (data.result.playlinks.pptv) {
          playdizhi = data.result.playlinks.pptv;
        } else {
          playdizhi = data.result.playlinks.tudou;
        }
        this.dataContents.unshift({
          title: data.result.title,
          tag: data.result.tag,
          act: data.result.act,
          year: data.result.year,
          area: data.result.area,
          dir: data.result.dir,
          desc: data.result.desc,
          cover: data.result.cover,
          playlinks: playdizhi

        });

      });
      this.loading.dismiss();
    }

  }

  searchVideo(vName) {
    let url = this.videoURL + '?key=' + this.APPKEY + '&q=' + vName;
    this.http.get(url).map(res=>res.json()).subscribe(data=> {
      var playdizhi = "";
      if (data.result.playlinks.qq) {
        playdizhi = data.result.playlinks.qq;
      } else if (data.result.playlinks.youku) {
        playdizhi = data.result.playlinks.youku;
      } else if (data.result.playlinks.leshi) {
        playdizhi = data.result.playlinks.leshi;
      } else if (data.result.playlinks.sohu) {
        playdizhi = data.result.playlinks.sohu;
      } else if (data.result.playlinks.pptv) {
        playdizhi = data.result.playlinks.pptv;
      } else {
        playdizhi = data.result.playlinks.tudou;
      }
      this.dataContents.unshift({
        title: data.result.title,
        tag: data.result.tag,
        act: data.result.act,
        year: data.result.year,
        area: data.result.area,
        dir: data.result.dir,
        desc: data.result.desc,
        cover: data.result.cover,
        playlinks: playdizhi

      });
      this.loading.dismiss();
    });


  }

  search() {

    this.loading = this.loadCtrl.create({
      content: '加载中...',
      dismissOnPageChange: true,
      duration: 3000
    });

    this.loading.present();
    this.searchVideo(this.VideoName);
  }

  showVideo($event, play) {

    let options = {
      statusbar: {
        color: '#ffffffff'
      },
      toolbar: {
        height: 55,
        color: '#f7f7f7'
      },

      backButton: {
        image: 'ic_action_previous_item',
        color: 'black',
        imagePressed: 'back_pressed',
        align: 'left',
        event: 'backPressed'
      },


      backButtonCanClose: true
    };

    let browser = new ThemeableBrowser(play, '_blank', options);
  }

  doRefresh(refresher) {
    setTimeout(() => {

      this.getNewVideo();

      refresher.complete();
    }, 4000);
  }

}
