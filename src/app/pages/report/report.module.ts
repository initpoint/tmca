import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SharedModuleModule} from 'src/app/shared/modules/shared-module.module';
import {ReportComponent} from './report.component';


const routes: Routes = [
  {path: '', component: ReportComponent}
];

@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class ReportModule {
}
