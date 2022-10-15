import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { User } from '../model/user';
@Injectable()
export class UserStore extends ComponentStore<{user: User|null}> {
  
  constructor() {
    super({user: null});
  }
 
  readonly user$ = this.select(state => {
      return state.user;
    });

    readonly setUser$ = (user:User) => {this.setState({user: user})}

}