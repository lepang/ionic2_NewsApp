import { Component } from '@angular/core';

// import { ViewController } from 'ionic-angular'
import { NavController ,NavParams} from 'ionic-angular';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {


  constructor(public navCtrl:NavController) {


  }

  closePage() {
    //  this.viewCtrl.dismiss();
    this.navCtrl.pop();
  }
}
