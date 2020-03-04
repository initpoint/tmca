import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {UniversitiesPostsComponent} from '../components/items-components/universities-posts/universities-posts.component';
import {FacilitiesComponent} from '../components/items-components/facilities/facilities.component';
import {LoaderComponent} from '../components/loader/loader.component';
import {ItemsComponentsComponent} from '../components/items-components/items-components.component';
import {VacanciesComponent} from '../components/items-components/vacancies/vacancies.component';
import {PostsComponent} from '../components/items-components/posts/posts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
  ],
  declarations: [
    UniversitiesPostsComponent,
    FacilitiesComponent,
    LoaderComponent,
    VacanciesComponent,
    PostsComponent,
    ItemsComponentsComponent
  ],
  exports: [
    FormsModule,
    UniversitiesPostsComponent,
    FacilitiesComponent,
    LoaderComponent,
    VacanciesComponent,
    PostsComponent,
    ItemsComponentsComponent
  ],
  entryComponents: []
})
export class SharedModuleModule {
}
