import { Component, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryService } from 'src/app/services/delivery.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  form      : FormGroup = new FormGroup({
                                          'delivery_code'   : new FormControl( '', Validators.required ),
                                          'document_type'   : new FormControl( '', Validators.required ),
                                          'document_number' : new FormControl( '', Validators.required ),
                                          'error_delivery_code'   : new FormControl( '' ),
                                          'error_document_type'   : new FormControl( '' ),
                                          'error_document_number' : new FormControl( '' ),
                                        });

  doc_type  : any = [
  { label: 'CC. Cédula de ciudadanía', value: '1' },
  { label: 'CE. Cédula de Extranjería', value: '2' },
  { label: 'NIP. Número de Identificación Personal', value: '3' },
  { label: 'PAP Pasaporte', value: '4' }
  ];


  constructor(  private _deliveryService    : DeliveryService,
                private _utilsService       : UtilsService,
                private _router             : Router ){

  }
  ngOnInit(): void {
  }

  makeConsult(){
    this.clearError();
    this._deliveryService.makeConsult(this.form.value).subscribe(
    event=>{
      if( event.type === HttpEventType.Response ){
        this._utilsService.data_consult.next(event.body);
        this._router.navigate(['/consulta']);
      }
      },error=>{
        console.error("ERROR MAKE CONSULT: ", error );
        if( error.error.delivery_code ){
          this.form.get('error_delivery_code')?.setValue(error.error.delivery_code[0]);
        }
        if( error.error.document_type ){
          this.form.get('error_document_type')?.setValue(error.error.document_type[0]);
        }
        if( error.error.document_number ){
          this.form.get('error_document_number')?.setValue(error.error.document_number[0]);
        }
      }
    )
  }

  clearError(){
    this.form.get('error_delivery_code')?.setValue('');
    this.form.get('error_document_type')?.setValue('');
    this.form.get('error_document_number')?.setValue('');
  }

  onlyNumber( type:number ){
    this.clearError();
    let delivery_code   : any = this.form.get('delivery_code');
    let document_number : any = this.form.get('document_number');
    if( type == 0 ) delivery_code?.setValue( this._utilsService.onlyNumber(delivery_code?.value) );
    else document_number?.setValue( this._utilsService.onlyNumber(document_number?.value) );
    
  }

}
