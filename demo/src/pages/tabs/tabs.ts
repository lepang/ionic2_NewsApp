import { Component } from '@angular/core';

import { HomePage } from '../home/home';

import { VideoPage } from '../video/video';
import { ToolPage } from '../toolkit/toolkit';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root:any = HomePage;

  tab2Root:any = VideoPage;
  tab3Root:any = ToolPage;


  constructor() {

  }
}
