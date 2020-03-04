import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ItemsService} from 'src/app/shared/services/Items.service';
import {Item, ItemState} from 'src/app/shared/models/items.model';
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
    this.item.createDate = Date.now();
    this.item.updateDate = Date.now();
    this.item.user = this.authService.currentUser;
    this.item.state = ItemState.Active;
    const token = localStorage.getItem('token');
    this.httpClient.get(`https://tmclassanalysis-staging.herokuapp.com/classification-search/search-database/internal/api?class-txt=&search-txt=${this.item.searchText}`, {
      headers: {Authorization: `Token ${token}`}
    }).subscribe(res => {
      this.item.results = res;
      this.itemsService.createItem(this.item);
      this.itemsService.currentItem = this.item;
      this.router.navigate(['/search']);
    }, error => console.log(error));
  }
}
