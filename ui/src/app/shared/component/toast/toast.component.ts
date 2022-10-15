import {
  Component,
  HostBinding,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('state', [
      state('opened', style({ transform: 'translateY(0%)' })),
      state(
        'void, closed',
        style({ transform: 'translateY(100%)', opacity: 0 })
      ),
      transition('* => *', animate('100ms ease-in')),
    ]),
  ],
})
export class ToastComponent implements OnInit {
  @HostBinding('@state') public state: 'opened' | 'closed' = 'closed';

  private _message: string = '';

  @Input()
  public set message(message: string) {
    this._message = message;
    this.state = 'opened';
  }

  public get message() {
    return this._message;
  }

  @Output() public closed = new EventEmitter<void>();

  public constructor() {}

  public ngOnInit(): void {}
}
