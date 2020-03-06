import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemsService} from 'src/app/shared/services/Items.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  noResultsKeywords;
  withResultsKeywords;
  withCountryConflictKeywords;
  matchedKeywords;
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
    this.withResultsKeywords = this.allKeywords.filter(keyword => (keyword['used'] || keyword['used_head'])
      && !keyword['countryConflict'] && !keyword['matched']);
    this.noResultsKeywords = this.allKeywords.filter(keyword => !(keyword['used'] || keyword['used_head']));
    this.withCountryConflictKeywords = this.allKeywords.filter(keyword => keyword['countryConflict']);
    this.matchedKeywords = this.allKeywords.filter(keyword => keyword['matched']);
  }

  txtToId(txt) {
    return txt
      .split(' ').join('_')
      .split(',').join('_')
      .split(')').join('_')
      .split('(').join('_')
      .split('-').join('_');
  }
}
