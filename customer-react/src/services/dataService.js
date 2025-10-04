// dataService.js
import { BehaviorSubject } from 'rxjs';

export const dataService = {
    
    // define the subject with an initial value (false = not logged in)
  loggedInSubject: new BehaviorSubject(false),

  // function to update the value
  updateIsLoggedIn(value) {
    this.loggedInSubject.next(value);
  }

}