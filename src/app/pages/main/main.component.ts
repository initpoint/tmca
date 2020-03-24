import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemsService} from 'src/app/shared/services/Items.service';
import {Item, ItemState} from 'src/app/shared/models/items.model';
import {StatService} from '../../shared/services/stat.service';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  activeReports: Item[] = [];
  approvedReports: Item[] = [];
  pendingReview: Item[] = [];
  reportsToReview: Item[] = [];
  numberOfCardsToShow = 7;

  constructor(public itemsService: ItemsService, public statService: StatService, public authService: AuthService, public router: Router) {
  }

  ngOnInit() {
    this.itemsService.getUserItems(this.authService.currentUserId).subscribe(items => {
      this.activeReports = items.filter(report => report.state === ItemState.Active);
      this.approvedReports = items.filter(report => report.state === ItemState.Approved);
      this.pendingReview = items.filter(report => report.state === ItemState.Pending);
    });
    this.itemsService.getOthersPendingItems(this.authService.currentUserId).subscribe(items => {
      this.reportsToReview = items;
    });
  }

  openItem(item) {
    this.itemsService.currentItem = item;
    localStorage.setItem('currentItem', JSON.stringify(this.itemsService.currentItem));
    this.router.navigate(['search']);// todo make it redirects to report after finshing search page
  }

  matchedCount(report) {
    return report.keywords.filter(key => key.matched).length;
  }
}
