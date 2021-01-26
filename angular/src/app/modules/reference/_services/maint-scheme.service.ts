import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { TableService } from 'src/app/_metronic/shared/crud-table';
import { environment } from 'src/environments/environment';
import { MaintScheme } from '../_models/maintScheme.model';

@Injectable({
  providedIn: 'root'
})
export class MaintSchemeService extends TableService<MaintScheme> implements OnDestroy {
  API_URL = `${environment.apiUrl}/reference/maintscheme`;
  constructor(@Inject(HttpClient) http){
    super(http);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
