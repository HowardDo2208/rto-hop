import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferenceRoutingModule } from './reference-routing.module';
import { ReferenceComponent } from './reference.component';
import { MaintSchemeComponent } from './maint-scheme/maint-scheme.component';
import { EditMaintSchemeModalComponent } from './maint-scheme/components/edit-maint-scheme-modal/edit-maint-scheme-modal.component';
import { DeleteMaintSchemeModalComponent } from './maint-scheme/components/delete-maint-scheme-modal/delete-maint-scheme-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';
import { NgbDatepickerModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteMaintSchemesModalComponent } from './maint-scheme/components/delete-maint-schemes-modal/delete-maint-schemes-modal.component';
import { UpdateMaintschemeStatusModalComponent } from './maint-scheme/components/update-maintscheme-status-modal/update-maintscheme-status-modal.component';


@NgModule({
  declarations: [
    ReferenceComponent,
    MaintSchemeComponent, 
    EditMaintSchemeModalComponent, 
    DeleteMaintSchemeModalComponent, DeleteMaintSchemesModalComponent, UpdateMaintschemeStatusModalComponent
  ],
  imports: [
    CommonModule,
    ReferenceRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule
  ],
  entryComponents: [
    DeleteMaintSchemeModalComponent,
    EditMaintSchemeModalComponent,
  ]
})
export class ReferenceModule { }
