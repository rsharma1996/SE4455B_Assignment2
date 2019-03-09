import { NgModule } from '@angular/core';
import { SelectionComponent } from './selection/selection.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  
  { path: 'selection', component: SelectionComponent },
  
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
