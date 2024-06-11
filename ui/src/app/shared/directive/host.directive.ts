import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[host]',
})
export class HostDirective {
  public constructor(public viewRef: ViewContainerRef) {}
}
