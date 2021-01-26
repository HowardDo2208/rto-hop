import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import {of} from 'rxjs'
import { delay,tap,catchError,finalize } from 'rxjs/operators';
import { MaintSchemeService } from '../../../_services/maint-scheme.service';

@Component({
  selector: 'app-delete-maint-scheme-modal',
  templateUrl: './delete-maint-scheme-modal.component.html',
  styleUrls: ['./delete-maint-scheme-modal.component.scss']
})
export class DeleteMaintSchemeModalComponent implements OnInit {

  @Input() id: number;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(private maintSchemeService: MaintSchemeService, public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteMaintScheme() {
    this.isLoading = true;
    const sb = this.maintSchemeService.delete(this.id).pipe(
      delay(1000), // Remove it from your code (just for showing loading)
      tap(() => this.modal.close()),
      catchError((err) => {
        this.modal.dismiss(err);
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
