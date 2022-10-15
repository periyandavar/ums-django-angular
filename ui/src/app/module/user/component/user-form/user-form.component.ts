import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  LOCALE_ID,
  Inject,
  Injector,
} from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { formatDate } from '@angular/common';
import { BloodGroupService } from '../../../blood-group/index';
import { GenderService } from '../../../gender/index';
import { CourseService } from '../../../course/index';
import { StreamService } from '../../../stream/index';
import { User, UserFormErrors } from '../../index';
import {
  passoutValidator,
  CheckerDirective,
  DropdownOption,
} from 'src/app/shared/index';
import { ContentChild } from '@angular/core';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Output() public onSubmit = new EventEmitter();
  @Output() public onCancel = new EventEmitter();

  @ContentChild(CheckerDirective) public content!: CheckerDirective;
  @Input() public expanded: boolean = false;

  public toggle() {
    this.expanded = !this.expanded;
  }

  private _errors: UserFormErrors = {
    first_name: [],
    last_name: [],
    dob: [],
    blood_group: [],
    emailIds: [],
    educationDetails: [],
    mobileNos: [],
    gender: [],
    form: [],
  };

  public get errors() {
    return this._errors;
  }

  @Input() public set errors(err: any) {
    if (err) {
      this._errors.first_name = err?.first_name?.first_name;
      this._errors.last_name = err?.last_name?.last_name;
      this._errors.dob = err?.dob?.dob;
      this._errors.emailIds = err?.emailIds;
      this._errors.blood_group = err?.blood_group?.blood_group;
      this._errors.educationDetails = err?.educationDetails;
      this._errors.mobileNos = err?.mobileNos;
      this._errors.gender = err?.gender?.gender;
      this._errors.form = err?.form?.errors || err?.user;
    }
  }
  public bloodGroups?: DropdownOption[] = [];
  public genders?: DropdownOption[] = [];
  public courses?: DropdownOption[];
  public streams: DropdownOption[][] = [];

  @Input() public set user(user: User | null) {
    if (user != null) {
      this.mobileNos.removeAt(0);
      this.emailIds.removeAt(0);
      for (const mobileNo of user.mobile) {
        this.addMobileNos(mobileNo.mobile);
      }
      for (const emailId of user.email) {
        this.addEmailIds(emailId.email);
      }
      // for (let index = 0; index < user.educationDetails.length; index++) {
      //   if (index == 0 || index == 1) {
      //     this.educationDetails.controls[index]
      //       ?.get('course')
      //       ?.setValue(user.educationDetails[index].course.id);
      //     this.educationDetails.controls[index]
      //       ?.get('stream')
      //       ?.setValue(user.educationDetails[index].stream.id);
      //     this.educationDetails.controls[index]
      //       ?.get('percentage')
      //       ?.setValue(user.educationDetails[index].percentage * 100);
      //     this.educationDetails.controls[index]
      //       ?.get('institution')
      //       ?.setValue(user.educationDetails[index].institution);
      //     this.educationDetails.controls[index]
      //       ?.get('institutionAddress')
      //       ?.setValue(user.educationDetails[index].institutionAddress);
      //     this.educationDetails.controls[index]
      //       ?.get('passout')
      //       ?.setValue(user.educationDetails[index].passout);
      //     continue;
      //   }

      //   this.addEducationDetails(
      //     user.educationDetails[index].course.id,
      //     user.educationDetails[index].stream.id,
      //     (user.educationDetails[index].percentage * 100) as any,
      //     user.educationDetails[index].institution,
      //     user.educationDetails[index].institutionAddress,
      //     user.educationDetails[index].passout
      //   );
      // }
      this.userFormGroup.patchValue({
        first_name: user.first_name,
        last_name: user.last_name,
        dob: formatDate(user.dob, 'yyyy-MM-dd', this.locale),
        gender: user.gender.id,
        // bloodGroup: user.bloodGroup.id,
        blood_group: user.blood_group.id,
      });
    }
  }

  public userFormGroup = this.fb.group(
    {
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      emailIds: this.fb.array([]),
      mobileNos: this.fb.array([]),
      dob: ['', Validators.required],
      educationDetails: this.fb.array([
        this.fb.group({
          course: [1],
          stream: [''],
          percentage: ['', [Validators.max(100), Validators.min(1)]],
          institution: [''],
          institutionAddress: [''],
          passout: [''],
        }),
        this.fb.group({
          course: [2],
          stream: [''],
          percentage: ['', [Validators.max(100), Validators.min(1)]],
          institution: [''],
          institutionAddress: [''],
          passout: [''],
        }),
      ]),
      blood_group: [''],
      gender: [''],
    },
    { validators: passoutValidator }
  );

  public get emailIds() {
    return this.userFormGroup.get('emailIds') as FormArray;
  }

  public get mobileNos() {
    return this.userFormGroup.get('mobileNos') as FormArray;
  }

  get educationDetails() {
    return this.userFormGroup.get('educationDetails') as FormArray;
  }

  public addEmailIds(value = '') {
    this.emailIds.push(
      this.fb.group({
        email: this.fb.control(value, [Validators.email]),
      })
    );
  }

  public addMobileNos(value = '') {
    this.mobileNos.push(
      this.fb.group({
        mobileNumber: this.fb.control(value),
      })
    );
  }

  public addEducationDetails(
    course = '',
    stream = '',
    percentage = '',
    institution = '',
    institutionAddress = '',
    passout = ''
  ) {
    this.educationDetails.push(
      this.fb.group({
        course: [course],
        stream: [stream],
        percentage: [percentage, [Validators.max(100), Validators.min(1)]],
        institution: [institution],
        institutionAddress: [institutionAddress],
        passout: [passout],
      })
    );
  }

  public submit() {
    if (this.userFormGroup.valid) {
      this.onSubmit.emit(this.userFormGroup.value);
    }
  }

  public cancel() {
    this.onCancel.emit();
  }

  public loadStreams(i: number) {
    let course = this.educationDetails.at(i).get('course')?.value;
    this.injector
      .get(StreamService)
      .getStreamByCourse(course)
      .subscribe((data) => {
        this.streams[i] = data;
      });
  }

  public constructor(
    @Inject(LOCALE_ID) private locale: string,
    private fb: FormBuilder,
    private injector: Injector
  ) {}

  public ngOnInit() {
    this.addMobileNos();
    this.addEmailIds();
    this.injector
      .get(BloodGroupService)
      .activeData()
      .subscribe((data) => {
        // this.bloodGroups = data;
        for (const result of (data as any).results) {
          if (result.status) {
            this.bloodGroups?.push({ 'value': result.value, 'id':result.id});
          } 
        }
      });
    this.injector
      .get(GenderService)
      .activeData()
      .subscribe((data) => {
        for (const result of (data as any).results) {
          if (result.status) {
            this.genders?.push({ 'value': result.value, 'id':result.id});
          } 
        }
      });
    // this.injector
    //   .get(CourseService)
    //   .activeData()
    //   .subscribe((data) => {
    //     this.courses = data;
    //   });
    // this.injector
    //   .get(StreamService)
    //   .activeData()
    //   .subscribe((data) => {
    //     this.loadStreams(0);
    //     this.loadStreams(1);
    //     for (let i = 2; i < this.educationDetails.length; i++) {
    //       this.streams[i] = data;
    //     }
    //   });
  }
}
