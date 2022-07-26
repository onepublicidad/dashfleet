import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  data_consult = new Subject<any>();


  onlyNumber( value:any ){
    return value.replace(/[aA-zZ`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  }
}
