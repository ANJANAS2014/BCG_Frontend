import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LinechartComponent } from './linechart/linechart.component';

const routes: Routes = [

  {
    path:'',component:HomeComponent
  },
    {
      path:'chart',component:LinechartComponent
    }
    

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
