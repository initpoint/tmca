import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import {LayoutComponent} from './shared/components/layout/layout.component';
import {LandingComponent} from './pages/landing/landing.component';


const routes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: 'main',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'report/:id',
        loadChildren: () => import('./pages/report/report.module').then(m => m.ReportModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'search/:id',
        loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'start-search',
        loadChildren: () => import('./pages/start-search/start-search.module').then(m => m.StartSearchModule),
        canActivate: [AuthGuard]
      },
    ]
  },
  {path: '**', redirectTo: '/main', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
