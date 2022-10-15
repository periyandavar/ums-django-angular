import { EducationalDetailComponent } from './../educational-detail/educational-detail.component';
import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HostDirective } from '../../../../shared/index';
import { User, PersonalDetailComponent } from '../../index';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [UserStore],
})
export class UserDetailComponent implements OnInit {
  public user!: User;

  @ViewChild(HostDirective, { static: true }) public childRef!: HostDirective;

  // private compnents = [PersonalDetailComponent, EducationalDetailComponent];

  public constructor(
    private route: ActivatedRoute,
    private componentFactoryResolver: ComponentFactoryResolver,
    private readonly userStore: UserStore
  ) {}

  public loadComponents(id: number) {
    this.childRef.viewRef.clear();
    const resolvedCompFactory =
      id === 0
        ? this.componentFactoryResolver.resolveComponentFactory(
            PersonalDetailComponent
          )
        : this.componentFactoryResolver.resolveComponentFactory(
            EducationalDetailComponent
          );
    const component = this.childRef.viewRef.createComponent<
      PersonalDetailComponent | EducationalDetailComponent
    >(resolvedCompFactory);
    // component.instance.user = this.user;
  }

  public ngOnInit(): void {
    this.user = this.route.snapshot.data.user;
    console.log(this.userStore.user$);
    this.userStore.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.userStore.setUser$(this.user);
    this.loadComponents(0);
  }
}
