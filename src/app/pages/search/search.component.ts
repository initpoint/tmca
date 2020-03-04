import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemsService} from 'src/app/shared/services/Items.service';
import {Item, ItemState} from 'src/app/shared/models/items.model';
import {StatService} from '../../shared/services/stat.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

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
