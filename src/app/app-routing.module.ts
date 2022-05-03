import { ListViewComponent } from './list-view/list-view.component';
import { ClicksqComponent } from './clicksq/clicksq.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'list', component: ListViewComponent },
  { path: 'sq', component: ClicksqComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [[RouterModule.forRoot(routes)]],
  exports: [RouterModule],
})
export class AppRoutingModule {}
