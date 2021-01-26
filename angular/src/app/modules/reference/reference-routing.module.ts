import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaintSchemeComponent } from './maint-scheme/maint-scheme.component';

import { ReferenceComponent } from './reference.component';

const routes: Routes = [{ path: '', component: ReferenceComponent }, {path: 'maintscheme', component: MaintSchemeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferenceRoutingModule { }
