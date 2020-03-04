import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemsService} from 'src/app/shared/services/Items.service';
import {Item, ItemState} from 'src/app/shared/models/items.model';
import {StatService} from '../../shared/services/stat.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  items: Item[] = [];
  activeReports: Item[] = [];
  approvedReports: Item[] = [];
  pendingReview: Item[] = [];
  reportsToReview: Item[] = [];

  constructor(public itemsService: ItemsService, public statService: StatService, public authService: AuthService) {
  }

  ngOnInit() {
    this.itemsService.getItems().subscribe(items => {
      this.items = items;
      this.activeReports = items.filter(report => report.state === ItemState.Active);
      this.approvedReports = items.filter(report => report.state === ItemState.Approved);
      this.pendingReview = items.filter(report => report.state === ItemState.Pending);
      this.reportsToReview = items.filter(report => report.state === ItemState.Pending);
    });
  }

  changeCurrentType(type: ItemState) {
    // this.itemsService.currentItemType.next(type);
  }

  notAvailable(tag: string) {
    this.statService.missingFeature(`filter-${tag}`);
  }
}
