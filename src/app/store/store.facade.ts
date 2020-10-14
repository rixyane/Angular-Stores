import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AkitaFacade } from './akita/akita.facade';
import { NgrxFacade } from './ngrx/ngrx.facade';
import { NgxsFacade } from './ngxs/ngxs.facade';


@Injectable({
  providedIn: 'root',
})
export class StoreFacade {
  facade: AkitaFacade | NgrxFacade | NgxsFacade;

  constructor(
    public readonly ngxsFacade: NgxsFacade,
    public readonly ngrxFacade: NgrxFacade,
    public readonly akitaFacade: AkitaFacade,
  ) {
    console.log(`Using: ${environment.stateManager}`);

    switch (environment.stateManager) {
      case 'akita':
        this.facade = akitaFacade;
        break;

      case 'ngrx':
        this.facade = ngrxFacade;
        break;

      case 'ngxs':
      default:
        this.facade = ngxsFacade;
        break;
    }
  }
}
