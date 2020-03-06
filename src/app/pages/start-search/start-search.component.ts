import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemsService} from 'src/app/shared/services/Items.service';
import {Item, ItemState, Keyword} from 'src/app/shared/models/items.model';
import {StatService} from '../../shared/services/stat.service';
import {AuthService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start-search',
  templateUrl: './start-search.component.html',
  styleUrls: ['./start-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StartSearchComponent implements OnInit {
  item = new Item();
  isLoading = false;

  constructor(public itemsService: ItemsService, public authService: AuthService,
              public toastrService: ToastrService, public httpClient: HttpClient,
              public router: Router) {
  }

  ngOnInit() {
  }

  match(text, keywords) {
    const matched = keywords.find(key => text.toLowerCase().search(key) > -1);
    return matched || null;
  }

  createReport() {
    if (!this.item.searchText.length) {
      this.toastrService.warning('Enter Text To Search');
      return;
    }
    this.isLoading = true;
    this.toastrService.warning('Generating Keywords...');
    this.item.createDate = Date.now();
    this.item.updateDate = Date.now();
    this.item.user = this.authService.currentUser;
    this.item.state = ItemState.Active;
    this.item.title = this.item.refNumber + ' - ' + this.item.trademarkName + ' - ' + this.item.classNumber;
    this.itemsService.search(this.item.searchText).subscribe(res => {
      this.item.keywords = res['keywords'].map(keyword => {
        if (keyword['used']) {
          const label = res['label_entries'].filter(label => label['keyword'].toLowerCase() === keyword.txt.toLowerCase())[0];
          if (label['auto_add']) {
            keyword['exact'] = true;
            keyword['matched'] = true;
            label['selected'] = true;
          }
          if (keyword['labels']) {
            keyword['labels'].push(label);
          } else {
            keyword['labels'] = [label];
          }
        }

        if (keyword['used_head']) {
          let label = res['class_txt_entries'].filter(label => label['keyword'].toLowerCase() === keyword.txt.toLowerCase())[0];
          if (!label) {
            res['class_txt_entries'].forEach(classHeader => {
              if (this.match(classHeader.header_text.toLowerCase(), keyword.txt.toLowerCase().split(/(?:,| )+/))) {
                label = classHeader;
              }
            });
          }
          if (label['auto_add']) {
            keyword['exact'] = true;
            keyword['matched'] = true;
            label['selected'] = true;
          }
          if (keyword['labels']) {
            keyword['labels'].push(label);
          } else {
            keyword['labels'] = [label];
          }
        }
        return keyword as Keyword;
      });
      this.itemsService.currentItem = this.item;
      this.itemsService.createItem(this.itemsService.currentItem);
      localStorage.setItem('currentItem', JSON.stringify(this.itemsService.currentItem));
      this.router.navigate(['/search']);
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }
}
