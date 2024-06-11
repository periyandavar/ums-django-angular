import { Pipe, PipeTransform } from '@angular/core';
import { EducationDetail } from '../../module/user/index';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'eduactionDetails',
})
export class EduactionDetailsPipe implements PipeTransform {
  public constructor(private _sanitizer: DomSanitizer) {}

  public transform(value: EducationDetail): SafeHtml {
    let result = `
      <b>${value.course.value}</b>, ${value.stream.value} at ${
      value.institution
    } with ${value.percentage * 100}%
      <br>(Institution Address: ${value.institutionAddress})
    `;

    return this._sanitizer.bypassSecurityTrustHtml(result);
  }
}
