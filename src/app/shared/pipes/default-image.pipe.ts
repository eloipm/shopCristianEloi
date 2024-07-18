import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../../core/models/product.model';
import { User } from '../../core/models/user.model';

@Pipe({
  name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {

  transform(value?: string, type?:User|Product): string {
    let defImg:string = "";
    if(typeof type === typeof User){
        defImg = environment.avatar;
    }else{
      defImg = environment.noImage;
    }
    if(value===undefined || value.includes('[')){
      return defImg;
    }

    if(value[0].includes('jpg') || value[0].includes('png') || value.includes('jpeg') ){
      return value;
    }
    return defImg;
  }


}
