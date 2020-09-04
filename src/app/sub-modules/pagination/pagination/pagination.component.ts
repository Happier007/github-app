// ANGULAR
import {
  Component,
  OnChanges,
  Output,
  Input,
  SimpleChanges,
  EventEmitter
} from '@angular/core';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  @Input() public since: number;
  @Output() public changePageEvent = new EventEmitter<number>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.since = changes.since.currentValue;
  }

  public nextPage(): void {
    this.changePageEvent.emit(this.since);
  }

  public firstPage(): void {
    this.since = 0;
    this.changePageEvent.emit(this.since);
  }
}

