import { Component, OnInit, ViewChild, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { merge, Subscription, Subject } from 'rxjs';
import { UpdateComponent } from './update/update.component';
import { UowService } from 'src/app/services/uow.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteService } from 'src/app/components/delete/delete.service';
import { User } from 'src/app/models/models';

import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  update = new EventEmitter();
  isLoadingResults = true;
  resultsLength = 0;
  isRateLimitReached = false;

  subs: Subscription[] = [];

  dataSource: User[] = [];
  selectedList: User[] = [];

  displayedColumns = [/*'select',*/  'imageUrl', 'name', 'email', 'isActive','role', 'option'];

  panelOpenState = false;

  name = new FormControl('');
  email = new FormControl('');
  role = new FormControl('');






  constructor(public uow: UowService, public dialog: MatDialog
    , private mydialog: DeleteService, @Inject('BASE_URL') private url: string) {
  }

  ngOnInit() {
    const sub = merge(...[this.sort.sortChange, this.paginator.page, this.update]).pipe(startWith(null as any)).subscribe(
      r => {
        r === true ? this.paginator.pageIndex = 0 : r = r;
        !this.paginator.pageSize ? this.paginator.pageSize = 10 : r = r;
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.isLoadingResults = true;
        this.getPage(
          startIndex,
          this.paginator.pageSize,
          this.sort.active ? this.sort.active : 'id',
          this.sort.direction ? this.sort.direction : 'desc',
          this.name.value === '' ? '*' : this.name.value,
          this.email.value === '' ? '*' : this.email.value,
          this.role.value === '' ? '*' : this.role.value,
        );
      }
    );


    this.subs.push(sub);
  }

  reset() {
    this.name.setValue('');
    this.email.setValue('');
    this.role.setValue('');

    this.update.next(true);
  }



  search() {
    this.update.next(true);
  }

  trackFn(i: number, e: any) {
    return e.progressValue;
  }

  getPage(startIndex, pageSize, sortBy, sortDir, nom, email, role) {
    const sub = this.uow.users.getAll(startIndex, pageSize, sortBy, sortDir, nom, email, role).subscribe(
      (r: any) => {
        console.log(r);
        this.dataSource = r.list;
        this.resultsLength = r.count;
        this.isLoadingResults = false;
      }
    );

    this.subs.push(sub);
  }



  openDialog(o: User, text, bool) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '1100px',
      disableClose: true,
      data: { model: o, title: text, visualisation: bool }
    });

    return dialogRef.afterClosed();
  }

  add() {
    this.openDialog(new User(), `Ajouter Utilisateur`, false).subscribe(result => {
      if (result) {
        this.update.next(true);
      }
    });
  }

  edit(o: User) {
    this.openDialog(o, `Modifier Utilisateur`, false).subscribe((result: User) => {
      if (result) {
        this.update.next(true);
      }
    });
  }

  detail(o: User) {
    this.openDialog(o, `Détail Utilisateur`, true).subscribe((result: User) => {
      if (result) {
        this.update.next(true);
      }
    });
  }

  async delete(o: User) {
    const r = await this.mydialog.openDialog('Utilisateur').toPromise();
    if (r === 'ok') {
      const sub = this.uow.users.delete(o.id).subscribe(() => {

        this.update.next(true)
        this.uow.files.deleteFiles([o.imageUrl.replace(';', '')], 'users').subscribe(re => console.warn(re))
      } );

      this.subs.push(sub);
    }
  }

  displayImage(urlImage: string) {
    if (!urlImage) {
      return 'assets/404.jpg';
    }
    if (urlImage && urlImage.startsWith('http')) {
      return urlImage;
    }

    return `${this.url}/users/${urlImage.replace(';', '')}`;
  }

  imgError(img: any) {
    img.src = 'assets/404.jpg';
  }



  ngOnDestroy(): void {
    this.subs.forEach(e => {
      e.unsubscribe();
    });
  }

}

