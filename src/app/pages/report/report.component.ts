import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemsService} from 'src/app/shared/services/Items.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnInit {
  matchedKeywords;
  notMatchedKeywords;
  allKeywords;

  constructor(public itemsService: ItemsService, public router: Router) {
  }

  ngOnInit() {
    if (!this.itemsService.currentItem) {
      const currentItem = localStorage.getItem('currentItem');
      if (currentItem) {
        this.itemsService.currentItem = JSON.parse(currentItem);
      } else {
        this.router.navigate(['main']);
      }
    }
    this.allKeywords = this.itemsService.currentItem.keywords;
    this.matchedKeywords = this.allKeywords.filter(keyword => keyword['matched']);
    this.notMatchedKeywords = this.allKeywords.filter(keyword => !keyword['matched']);
  }
}
