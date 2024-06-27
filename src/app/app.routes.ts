import { Routes } from '@angular/router';
import { SalesReportComponent } from './components/sales-report/sales-report.component';

const DEFAULT_ROUTE = '/home';

export const routes: Routes = [
  { path: '', redirectTo: DEFAULT_ROUTE, pathMatch: 'full' },
  { path: 'home', component: SalesReportComponent },
];

