import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SharedModuleModule} from 'src/app/shared/modules/shared-module.module';
import {StartSearchComponent} from './start-search.component';


const routes: Routes = [
  {path: '', component: StartSearchComponent}
];

@NgModule({
  declarations: [
    StartSearchComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class StartSearchModule {
}
