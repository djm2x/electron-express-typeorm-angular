import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipc = null;
  remote = null;
  constructor() {
    if ((window as any) && (window as any).process && (window as any).process.type) {
      this.ipc = (window as any).require('electron').ipcRenderer;
      this.remote = (window as any).require('electron').remote;
    }
  }


  get(route: string): Observable<any | any[]> {
    this.ipc.send(route);

    return new Observable(o => this.ipc.prependOnceListener('angular', (event, r) => o.next(r)));
  }
}
