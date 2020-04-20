import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { IGqlResponseEnvelope } from './models/gql-response-envelope';
import { take } from 'rxjs/operators';
import { IUser } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'homeManager';
  
  constructor(private userService: UserService) {
    /*
    this.userService.getUser('51596c6e-d1a7-447c-abb2-7554a7b1e01b').pipe(take(1)).subscribe((res: IGqlResponseEnvelope<IUser>) => {
      console.log(res);
    });
    */
  }
}
