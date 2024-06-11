import { Params, convertToParamMap, ParamMap } from '@angular/router';
import { Directive, Input, HostListener } from '@angular/core';
import { ReplaySubject } from 'rxjs';
@Directive({
  selector: '[routerLink]',
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

export class ActivatedRouteStub {
  private subject = new ReplaySubject<ParamMap>();

  constructor(initialParams: Params = {}) {
    this.setParamMap(initialParams);
  }

  readonly paramMap = this.subject.asObservable();

  setParamMap(params:Params = {}) {
    this.subject.next(convertToParamMap(params));
  }
}
