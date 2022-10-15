import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[actionIcons]',
})
export class IconDirective {
  @Input('actionIcons') public set action(value: string) {
    switch (value) {
      case 'view':
        this.el.nativeElement.className = 'btn btn-info';
        this.el.nativeElement.innerHTML =
          '<i class="fa fa-eye" aria-hidden="true"></i>';
        break;
      case 'edit':
        this.el.nativeElement.className = 'btn btn-success';
        this.el.nativeElement.innerHTML =
          '<i class="fa fa-pencil-alt" aria-hidden="true"></i>';
        break;
      case 'delete':
        this.el.nativeElement.className = 'btn btn-danger';
        this.el.nativeElement.innerHTML =
          '<i class="fa fa-trash" aria-hidden="true"></i>';
        break;
      default:
        this.el.nativeElement.className = 'btn btn-primary';
        this.el.nativeElement.innerHTML =
          '<i class="fa fa-angle-down" aria-hidden="true"></i>';
        break;
    }
  }

  public constructor(private el: ElementRef) {}

  @HostListener('mouseover') public onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = '#ccc';
    this.el.nativeElement.style.borderColor = 'black';
    this.el.nativeElement.style.color = 'black';
    this.el.nativeElement.style.borderSize = '2px';
    this.el.nativeElement.style.borderStyle = 'solid';
  }

  @HostListener('mouseleave') public onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
    this.el.nativeElement.style.borderColor = '';
    this.el.nativeElement.style.color = '';
    this.el.nativeElement.style.borderSize = '';
    this.el.nativeElement.style.borderStyle = '';
  }
}
