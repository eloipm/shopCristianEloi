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
      console.log('entra if')
      defImg = environment.avatar;
    } else {
      console.log('entra else')
      defImg = environment.noImage;
    }
    if (value === undefined) {
      return defImg;
    }
    if (value.includes('jpg') || value.includes('png') || value.includes('jpeg') || value.includes('svg')) {
      console.log('entra values')
      if (value!.includes('[')) {
        
        let img = value?.split(']')[0];
  
        img = img!.substring(2, img?.length);
        img = img!.replace('"', "");
        console.log('img: ' + img)
        return img!;
      }
      return value;
    }
    const urlV= new URL(value);
    console.log("url",urlV)
    console.log(value);
    
    return defImg;
  }
}