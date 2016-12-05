import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {TabsPage} from "../tabs/tabs";

@Component({
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  constructor(public navCtr:NavController) {
  }

  goToHome() {
    this.navCtr.setRoot(TabsPage);

  }
}
