import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';


import { VideoPage } from '../pages/video/video';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/home/search';
import { MySlide } from '../components/my-slide/my-slide';
import { HttpModule,JsonpModule  } from '@angular/http';
import { StorageService } from '../providers/StorageService';
import { LoginPage } from '../pages/login/login';
import { ToolPage } from '../pages/toolkit/toolkit';
import { WelcomePage } from '../pages/welcome/welcome';

@NgModule({
  declarations: [
    MyApp,


    VideoPage,
    HomePage,
    TabsPage,
    SearchPage,
    MySlide,
    LoginPage,
    ToolPage,
    WelcomePage


  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    JsonpModule,


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,


    VideoPage,
    HomePage,
    TabsPage,
    SearchPage,
    MySlide,
    LoginPage,
    ToolPage,
    WelcomePage

  ],
  providers: [StorageService]
})
export class AppModule {


}
