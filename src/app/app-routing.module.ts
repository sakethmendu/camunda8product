import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { DeleteproductComponent } from './deleteproduct/deleteproduct.component';
import { HomeComponent } from './home/home.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { ViewComponentComponent } from './view-component/view-component.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'view', component: HomeComponent },
  { path: 'view/:productId', component: ViewComponentComponent },
  { path: 'tasklist', component: UpdateproductComponent },
  { path: 'assignedtask', component: DeleteproductComponent },
  { path: 'insert', component: AddproductComponent }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
