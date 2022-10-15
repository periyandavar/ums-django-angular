import { IconDirective } from './icon.directive';
import { MockElementRef } from '../../test/mocks/element-reference-mock';
import { IconDirectiveTestComponent } from '../../test/component/icon-directive-test-component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('IconDirective', () => {
  it('should create an instance', () => {
    const directive = new IconDirective(new MockElementRef({}));
    expect(directive).toBeTruthy();
  });
});

describe('HighlightDirective', () => {

  let fixture: ComponentFixture<IconDirectiveTestComponent>;
  let des: DebugElement[];  // the three elements w/ the directive
  let bareH2: DebugElement; // the <h2> w/o the directive

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ IconDirective, IconDirectiveTestComponent ]
    })
    .createComponent(IconDirectiveTestComponent);

    fixture.detectChanges(); // initial binding

    // all elements with an attached HighlightDirective
    des = fixture.debugElement.queryAll(By.directive(IconDirective));

    // // the h2 without the HighlightDirective
    // bareH2 = fixture.debugElement.query(By.css('h2:not([highlight])'));
  });

  // color tests
  it('should have three icon directive elements', () => {
    expect(des.length).toBe(3);
  });


  it('should have class btn-info"', () => {
    const className = des[0].nativeElement.className;
    const innerHtml = des[0].nativeElement.innerHtml;
    expect(className).toBe('btn btn-info');
    expect(innerHtml).toBe('<i class="fa fa-eye" aria-hidden="true"></i>');
  });

  it('should have class btn-success"', () => {
    const className = des[0].nativeElement.className;
    const innerHtml = des[0].nativeElement.innerHtml;
    expect(className).toBe('btn btn-success');
    expect(innerHtml).toBe('<i class="fa fa-pencil-alt" aria-hidden="true"></i>');
  });

  it('should have class btn btn-danger"', () => {
    const className = des[0].nativeElement.className;
    const innerHtml = des[0].nativeElement.innerHtml;
    expect(className).toBe('btn btn-danger');
    expect(innerHtml).toBe('<i class="fa fa-trash" aria-hidden="true"></i>');
  });

  it('should have class btn btn-primary"', () => {
    const className = des[0].nativeElement.className;
    const innerHtml = des[0].nativeElement.innerHtml;
    expect(className).toBe('btn btn-primary');
    expect(innerHtml).toBe('<i class="fa fa-angle-down" aria-hidden="true"></i>');
  });
});