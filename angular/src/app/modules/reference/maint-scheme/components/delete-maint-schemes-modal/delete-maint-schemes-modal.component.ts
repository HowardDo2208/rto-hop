import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';
import { MaintSchemeService } from '../../../_services/maint-scheme.service';

@Component({
  selector: 'app-delete-maint-schemes-modal',
  templateUrl: './delete-maint-schemes-modal.component.html',
  styleUrls: ['./delete-maint-schemes-modal.component.scss']
})
export class DeleteMaintSchemesModalComponent implements OnInit, OnDestroy {
  @Input() ids: number[];
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private maintSchemeService: MaintSchemeService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteMaintSchemes() {
    this.isLoading = true;
    const sb = this.maintSchemeService.deleteItems(this.ids).pipe(
      delay(1000), // Remove it from your code (just for showing loading)
      tap(() => this.modal.close()),
      catchError((errorMessage) => {
        this.modal.dismiss(errorMessage);
        return of(undefined);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();
    this.subscriptions.push(sb);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
