import { Injectable, Injector } from '@angular/core';
import {
  NgElement,
  WithProperties,
  createCustomElement,
} from '@angular/elements';
import { ToastComponent } from '../index';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public showToast(message: string) {
    const ele: NgElement & WithProperties<ToastComponent> =
      document.createElement('toast-msg') as any;
    ele.addEventListener('closed', () => document.body.removeChild(ele));
    ele.message = message;
    document.body.appendChild(ele);
  }

  public constructor(injector: Injector) {
    const toastElem = createCustomElement(ToastComponent, { injector });
    customElements.get('toast-msg') ||
      customElements.define('toast-msg', toastElem);
  }
}
