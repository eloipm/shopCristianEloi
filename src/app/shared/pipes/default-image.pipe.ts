import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../../core/models/product.model';
import { User } from '../../core/models/user.model';

@Pipe({
  name: 'defaultImage'
})
export class DefaultImagePipe implements PipeTransform {

  transform(value?: string, type?: User | Product): string {
    let defImg: string = "";

    if (type?.getType() === 'user') {
      defImg = environment.avatar;
    } else {
      defImg = environment.noImage;
    }

    if (value === undefined) {
      return defImg;
    }

    if (value.includes('jpg') || value.includes('png') || value.includes('jpeg') || value.includes('svg')) {
      if (value!.includes('[')) {
        let img = value?.split(']')[0];
        img = img!.substring(2, img?.length);
        img = img!.replace('"', "");

        return img!;
      }
      return value;
    }
    //const urlV= new URL(value);
    
    return defImg;
  }
}