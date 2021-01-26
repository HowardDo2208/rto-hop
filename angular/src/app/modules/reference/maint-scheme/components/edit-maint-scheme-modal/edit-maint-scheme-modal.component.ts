import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, of } from 'rxjs';
import { MaintScheme } from '../../../_models/maintScheme.model';
import { MaintSchemeService } from '../../../_services/maint-scheme.service';
import { catchError, finalize, first, tap } from 'rxjs/operators';


const EMPTY_MAINTSCHEME: MaintScheme = {
  maintSchemeId: undefined,
  id: undefined,
  maintSchemeActive: 1,
  maintSchemeCode: '',
  maintSchemeName: '',
  costPerVisit: undefined,
  intervalOfVisit: undefined,
  maintSchemeRemark: '',
  dtCreated: undefined,
  dtDeleted: undefined,
  personDeleted: undefined,
};

@Component({
  selector: 'app-edit-maint-scheme-modal',
  templateUrl: './edit-maint-scheme-modal.component.html',
  styleUrls: ['./edit-maint-scheme-modal.component.scss']
})
export class EditMaintSchemeModalComponent implements OnInit {
  @Input() id: number;
  isLoading$;
  maintScheme: MaintScheme;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];
  constructor(
    private maintSchemeService: MaintSchemeService,
    private fb: FormBuilder, public modal: NgbActiveModal
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.maintSchemeService.isLoading$;
    this.loadMaintScheme();
  }

  loadMaintScheme() {
    if (!this.id) {
      this.maintScheme = EMPTY_MAINTSCHEME;
      this.loadForm();
    } else {
      const sb = this.maintSchemeService.getItemById(this.id).pipe(
        first(),
        catchError((errorMessage) => {
          this.modal.dismiss(errorMessage);
          return of(EMPTY_MAINTSCHEME);
        })
      ).subscribe((maintScheme: MaintScheme) => {
        this.maintScheme = maintScheme;
        this.loadForm();
      });
      this.subscriptions.push(sb);
    }
  }

  loadForm() {
    this.formGroup = this.fb.group({
      maintSchemeCode: [this.maintScheme.maintSchemeCode, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      maintSchemeName: [this.maintScheme.maintSchemeName, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      costPerVisit: [this.maintScheme.costPerVisit, Validators.compose([Validators.required])],
      intervalOfVisit: [this.maintScheme.intervalOfVisit, Validators.compose([Validators.required])],
      maintSchemeRemark: [this.maintScheme.maintSchemeRemark, Validators.compose([Validators.nullValidator])],
    });
  }

  save() {
    this.prepareMaintScheme();
    if (this.maintScheme.id) {
      this.edit();
    } else {
      this.create();
    }
  }

  edit() {
    const sbUpdate = this.maintSchemeService.update(this.maintScheme).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.maintScheme);
      }),
    ).subscribe(res => this.maintScheme = res);
    this.subscriptions.push(sbUpdate);
  }

  create() {
    const sbCreate = this.maintSchemeService.create(this.maintScheme).pipe(
      tap(() => {
        this.modal.close();
      }),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(this.maintScheme);
      }),
    ).subscribe((res: MaintScheme) => this.maintScheme = res);
    this.subscriptions.push(sbCreate);
  }

  private prepareMaintScheme() {
    const formData = this.formGroup.value;
    this.maintScheme.maintSchemeCode = formData.maintSchemeCode;
    this.maintScheme.maintSchemeName = formData.maintSchemeName;
    this.maintScheme.costPerVisit = formData.costPerVisit;
    this.maintScheme.intervalOfVisit = formData.intervalOfVisit;
    this.maintScheme.maintSchemeRemark = formData.maintSchemeRemark;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
