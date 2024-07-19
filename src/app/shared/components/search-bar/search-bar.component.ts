  import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { User } from '../../../core/models/user.model';
import {
  debounceTime,
  Subject
} from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit{
  @Output() responseItems: EventEmitter<string> = new EventEmitter<string>();

  currentSearch = new FormControl('',{nonNullable:true});

  sub = new Subject();

  ngOnInit(): void {
    this.currentSearch.valueChanges.pipe(debounceTime(1000)).subscribe(
      data=> {
        this.responseItems.emit(data.toLowerCase());
      }
      
    );
  }
 

}
