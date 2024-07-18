import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IProduct } from '../../../core/interfaces/product.interface';
import { Iuser } from '../../../core/interfaces/user.interface';
import { Product } from '../../../core/models/product.model';
import { User } from '../../../core/models/user.model';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit{
  @Input() searchList: (Product | User)[] = [];
  @Output() responseItems: EventEmitter<(Product | User)[]> = new EventEmitter<
    (Product | User)[]
  >();

  currentSearch = new FormControl('',{nonNullable:true});

  sub = new Subject();

  ngOnInit(): void {
    this.currentSearch.valueChanges.pipe(debounceTime(1000)).subscribe(
      data=> {
        this.emitSearch(data);
      }
      
    );
  }


  emitSearch(search:string) {
    let list= this.searchList.filter(item=>item.getSearchValue().includes(search.toLowerCase()));
    console.log(list);
    this.responseItems.emit(list??[])
  }
}
