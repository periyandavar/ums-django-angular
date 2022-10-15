import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[checker]',
})
export class CheckerDirective {
  public constructor(public templateRef: TemplateRef<unknown>) {}
}
