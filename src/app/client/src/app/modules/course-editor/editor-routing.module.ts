import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorBaseComponent } from './components';


const routes: Routes = [
  {
    path: 'collection/:collectionId/:type', component: EditorBaseComponent, pathMatch: 'full',
    data: {
      hideHeaderNFooter: 'true'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
