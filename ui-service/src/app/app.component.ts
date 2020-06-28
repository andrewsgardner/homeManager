import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from './services/user.service';
import { IGqlResponseEnvelope } from './models/gql-response-envelope.interface';
import { take } from 'rxjs/operators';
import { IUser } from './models/user.interface';
import { IUserProfile } from './models/user-profile.interface';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'homeManager';
  
  public userProfile$: Observable<IUserProfile>;
  
  constructor(private authService: AuthService,
              private userService: UserService) {
    /*
    this.userService.getUser('f3f4ea6a-61ef-460b-b810-e7d11c3457ef').pipe(take(1)).subscribe((res: IGqlResponseEnvelope<IUser>) => {
      console.log(res);
    });
    */
  }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        return;
      }

      this.userProfile$ = this.authService.userProfile();
    });
  }
}
