import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators'
import { GroupingState, ICreateAction, IDeleteAction, IDeleteSelectedAction, IEditAction, IFilterView, IGroupingView, ISearchView, ISortView, IUpdateStatusForSelectedAction, PaginatorState, SortState } from 'src/app/_metronic/shared/crud-table';
import { AuthService } from '../../auth';
import { MaintSchemeService } from '../_services/maint-scheme.service';
import { DeleteMaintSchemeModalComponent } from './components/delete-maint-scheme-modal/delete-maint-scheme-modal.component';
import { DeleteMaintSchemesModalComponent } from './components/delete-maint-schemes-modal/delete-maint-schemes-modal.component';
import { EditMaintSchemeModalComponent } from './components/edit-maint-scheme-modal/edit-maint-scheme-modal.component';
import { UpdateMaintschemeStatusModalComponent } from './components/update-maintscheme-status-modal/update-maintscheme-status-modal.component';

@Component({
  selector: 'app-maint-scheme',
  templateUrl: './maint-scheme.component.html',
  styleUrls: ['./maint-scheme.component.scss']
})
export class MaintSchemeComponent implements OnInit,
OnDestroy,
ICreateAction,
IEditAction,
IDeleteAction,
IDeleteSelectedAction,
IUpdateStatusForSelectedAction,
ISortView,
IFilterView,
IGroupingView,
ISearchView {
  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean;
  filterGroup: FormGroup;
  searchGroup: FormGroup;
  private subscriptions: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    public maintSchemeService: MaintSchemeService,
  ) { }

  // angular lifecircle hooks
  ngOnInit(): void {
    this.filterForm();
    this.searchForm();
    this.maintSchemeService.fetch();
    this.grouping = this.maintSchemeService.grouping;
    this.paginator = this.maintSchemeService.paginator;
    this.sorting = this.maintSchemeService.sorting;
    const sb = this.maintSchemeService.isLoading$.subscribe(res => this.isLoading = res);
    this.subscriptions.push(sb);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }

  // filtration
  filterForm() {
    this.filterGroup = this.fb.group({
      maintSchemeActive: '',
      searchTerm: [''],
    });
    this.subscriptions.push(
      this.filterGroup.controls.maintSchemeActive.valueChanges.subscribe(() =>
        this.filter()
      )
    );
  }

  filter() {
    const filter = {};
    const maintSchemeActive = this.filterGroup.get('maintSchemeActive').value;
    if (maintSchemeActive !== null) {
      filter['maintSchemeActive'] = maintSchemeActive;
    }
    this.maintSchemeService.patchState({filter});
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });
    const searchEvent = this.searchGroup.controls.searchTerm.valueChanges
      .pipe(
        /*
      The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator,
      we are limiting the amount of server requests emitted to a maximum of one every 150ms
      */
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((val) => this.search(val));
    this.subscriptions.push(searchEvent);
  }

  search(searchTerm: string) {
    this.maintSchemeService.patchState({ searchTerm });
  }

  // sorting
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    this.maintSchemeService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.maintSchemeService.patchState({ paginator });
  }

  // form actions
  create() {
    this.edit(undefined);
  }

  edit(id: number) {
    const modalRef = this.modalService.open(EditMaintSchemeModalComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
    modalRef.result.then(() =>
      this.maintSchemeService.fetch(),
      () => { }
    );
  }

  delete(id: number) {
    const modalRef = this.modalService.open(DeleteMaintSchemeModalComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then(() => this.maintSchemeService.fetch(), () => { });
  }

  deleteSelected() {
    const modalRef = this.modalService.open(DeleteMaintSchemesModalComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(() => this.maintSchemeService.fetch(), () => { });
  }

  updateStatusForSelected() {
    const modalRef = this.modalService.open(UpdateMaintschemeStatusModalComponent);
    modalRef.componentInstance.ids = this.grouping.getSelectedRows();
    modalRef.result.then(() => this.maintSchemeService.fetch(), () => { });
  }
}
