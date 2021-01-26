import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, first, tap } from 'rxjs/operators';
import { MaintScheme } from '../../../_models/maintScheme.model';
import { MaintSchemeService } from '../../../_services/maint-scheme.service';
@Component({
  selector: 'app-update-maintscheme-status-modal',
  templateUrl: './update-maintscheme-status-modal.component.html',
  styleUrls: ['./update-maintscheme-status-modal.component.scss']
})
export class UpdateMaintschemeStatusModalComponent implements OnInit {
  @Input() ids: number[];
  status = 1;
  maintSchemes: MaintScheme[] = [];
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private maintSchemeService: MaintSchemeService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
    this.loadMaintSchemes();
  }

  loadMaintSchemes() {
    const sb = this.maintSchemeService.items$.pipe(
      first()
    ).subscribe((res: MaintScheme[]) => {
      this.maintSchemes = res.filter(c => this.ids.indexOf(c.id) > -1);
    });
    this.subscriptions.push(sb);
  }

  updateMaintSchemeStatus() {
    this.isLoading = true;
    const sb = this.maintSchemeService.updateStatusForItems(this.ids, +this.status).pipe(
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
