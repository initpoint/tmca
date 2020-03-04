import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SharedModuleModule} from 'src/app/shared/modules/shared-module.module';
import {MainComponent} from './main.component';


const routes: Routes = [
  {path: '', component: MainComponent}
];

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule {
}
