import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemsService} from 'src/app/shared/services/Items.service';
import {Item, ItemState} from 'src/app/shared/models/items.model';
import {StatService} from '../../shared/services/stat.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnInit {

  constructor(public itemsService: ItemsService, public statService: StatService) {
  }

  ngOnInit() {
  }

  changeCurrentType(type: ItemState) {
  }

  notAvailable(tag: string) {
    this.statService.missingFeature(`filter-${tag}`);
  }
}
