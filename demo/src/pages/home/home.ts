import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { SearchPage } from './search';
import { MySlide } from '../../components/my-slide/my-slide';
import { Http } from '@angular/http';


import { ThemeableBrowser } from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../../providers/StorageService';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',

})
export class HomePage {
  pageIndex:number = 0;
  pageContent:string;
  pageSlides:string[] = ["头条", "社会", "国内", "国际", "娱乐", "体育", "军事", "科技", "财经", "时尚"];
  pageHttpSlides:string[] = ["top", "shehui", "guonei", "guoji", "yule", "tiyu", "junshi", "keji", "keji", "shishang"];
  homeArticles = [];
  hostURL = 'http://v.juhe.cn/toutiao/index';
  APPKEY:string = '17702324002789c3101fab2a1cc280b7';
  public picture:string;
  public loading;

  constructor(private navCtrl:NavController, private http:Http, private loadCtrl:LoadingController,
              private storageService:StorageService) {

    this.loading = this.loadCtrl.create({
      content: '加载中...',

    });

    this.loading.present();

    this.setPageContent();
    this.getHttpService(this.pageContent);

    if (this.storageService.read('storePicture')) {
      this.picture = this.storageService.read('storePicture');
    } else {
      this.picture = 'images/22.jpg';
    }
  }

  enterPage() {
    this.navCtrl.push(SearchPage, {
      name: '陈文鹏',
      age: 112
    });
  }


  onSlideClick(index) {

    this.pageIndex = index;
    this.setPageContent();
    this.homeArticles = [];
    this.loading = this.loadCtrl.create({
      content: '加载中...',

    });

    this.loading.present();
    this.getHttpService(this.pageContent);
  }

  setPageContent() {
    this.pageContent = this.pageHttpSlides[this.pageIndex];


  }

  //页面初始化执行次操作，推荐将复杂的东西要放在ngOnInit()方法里，不要放在构造方法里
  ngOnInit() {

  }

  getHttpService(itemName) {

    let url = this.hostURL + "?type=" + itemName + "&key=" + this.APPKEY;
    this.http.get(url).map(res => res.json()).subscribe(data => {
      for (var i = 0; i < data.result.data.length - 24; i++) {
        this.homeArticles.push({
          title: data.result.data[i].title,//标题
          // picture1:data.result.data[i].thumbnail_pic_s,//图片1
          // picture2:data.result.data[i].text_ithumbnail_pic_s02mage1,//图片2
          picture3: data.result.data[i].thumbnail_pic_s03,//图片3
          author_name: data.result.data[i].author_name,
          date: data.result.data[i].date,
          url: data.result.data[i].url,//
        });

      }
      this.loading.dismiss();
    });

  }

  getNewArticle(itemName) {

    let url = this.hostURL + "?type=" + itemName + "&key=" + this.APPKEY;
    this.http.get(url).map(res => res.json()).subscribe(data => {

      for (var i = data.result.data.length - 24; i < data.result.data.length; i++) {
        this.homeArticles.unshift({
          title: data.result.data[i].title,//标题
          // picture1:data.result.data[i].thumbnail_pic_s,//图片1
          // picture2:data.result.data[i].text_ithumbnail_pic_s02mage1,//图片2
          picture3: data.result.data[i].thumbnail_pic_s03,//图片3
          author_name: data.result.data[i].author_name,
          date: data.result.data[i].date,
          url: data.result.data[i].url
        });

      }
      this.loading.dismiss();

    });
  }

  doRefresh(refresher) {

    setTimeout(() => {
      this.getNewArticle(this.pageContent);
      refresher.complete();
    }, 3000);

  }

  showArticle(event, story) {
    //    let loading = this.loadCtrl.create({
    //          spinner:'cresent',

    //    });

    //    loading.present();

    // setTimeout(() => {
    //   loading.dismiss();

    // }, 5000);

    let options = {
      statusbar: {
        color: '#ffffffff'
      },
      toolbar: {
        height: 55,
        color: '#f7f7f7'
      },
      //  title: {
      //      color: '#003264ff',
      //      showPageTitle: true
      //  },
      backButton: {
        image: 'ic_action_previous_item',
        color: 'black',
        imagePressed: 'back_pressed',
        align: 'left',
        event: 'backPressed'
      },
      //  forwardButton: {
      //      image: 'forward',
      //      imagePressed: 'forward_pressed',
      //      align: 'left',
      //      event: 'forwardPressed'
      //  },
      //  closeButton: {
      //      image: 'close',
      //      imagePressed: 'close_pressed',
      //      align: 'left',
      //      event: 'closePressed'
      //  },
      //  customButtons: [
      //      {
      //          image: 'share',
      //          imagePressed: 'share_pressed',
      //          align: 'right',
      //          event: 'sharePressed'
      //      }
      //  ],
      menu: {
        image: 'ios-more',
        imagePressed: 'menu_pressed',
        title: 'Test',
        cancel: 'Cancel',
        align: 'right',
        items: [
          {
            event: 'helloPressed',
            label: '分享'
          },
          {
            event: 'testPressed',
            label: '收藏'
          }
        ]
      },
      backButtonCanClose: true
    };

    let browser = new ThemeableBrowser(story, '_blank', options);

  }

}








