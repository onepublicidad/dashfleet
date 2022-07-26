import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit{

  data_consult : any;

  constructor(  private _utilsService : UtilsService,
                private _router : Router  ) {

    this._utilsService.data_consult.subscribe((data:any)=>{
      console.log("recibí la data: ", data );
      localStorage.setItem('consult',JSON.stringify(data.request));
    });

  }

  ngOnInit(): void {
    if( localStorage.getItem('consult') ){
      let data : any = localStorage.getItem('consult');
          data = JSON.parse(data);
      this.data_consult = data;
    };
  }

  ngOnDestroy(): void {
    if( localStorage.getItem('consult') ) localStorage.removeItem('consult');
  }

  closeTab(){
    this._router.navigate(['/']);
    window.top.close();
  }

}
