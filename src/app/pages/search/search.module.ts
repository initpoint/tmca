import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SharedModuleModule} from 'src/app/shared/modules/shared-module.module';
import {SearchComponent} from './search.component';


const routes: Routes = [
  {path: '', component: SearchComponent}
];

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class SearchModule {
}
