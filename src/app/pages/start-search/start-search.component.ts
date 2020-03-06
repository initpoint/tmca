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

  constructor(public itemsService: ItemsService, public authService: AuthService,
              public toastrService: ToastrService, public httpClient: HttpClient,
              public router: Router) {
  }

  ngOnInit() {
  }

  createReport() {
    if (!this.item.searchText.length) {
      this.toastrService.warning('Enter Text To Search');
      return;
    }
    this.toastrService.warning('Generating Keywords...')
    this.item.createDate = Date.now();
    this.item.updateDate = Date.now();
    this.item.user = this.authService.currentUser;
    this.item.state = ItemState.Active;
    this.itemsService.search(this.item.searchText).subscribe(res => {
      this.item.keywords = res['keywords'].map(keyword => {
        if (keyword['used'] && keyword['used'] == true) {
          const label = res['label_entries'].filter(label => label['keyword'] === keyword.txt)[0];
          if (keyword['labels']) {
            keyword['labels'].push(label);
          } else {
            keyword['labels'] = [label];
          }
          if (label['auto_add'] && keyword['auto_add'] == true) {
            keyword['exact'] = true;
            keyword['matched'] = true;
          }
        }
        return new Keyword(keyword);
      });
      this.item.results = res;
      this.itemsService.currentItem = this.item;
      this.itemsService.createItem(this.itemsService.currentItem);
      localStorage.setItem('currentItem', JSON.stringify(this.itemsService.currentItem));
      this.router.navigate(['/search']);
    }, error => console.log(error));
  }
}
