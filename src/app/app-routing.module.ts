import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CastleComponent } from './castle/castle.component';
import { TransformersComponent } from './transformers/transformers.component';

const routes: Routes = [
  {path: '', redirectTo: 'castle', pathMatch: 'full' },
  {path: 'castle', component: CastleComponent },
  {path: 'transformers', component: TransformersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
