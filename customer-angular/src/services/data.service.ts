import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // BehaviorSubject with default value false (not logged in)
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  // Expose as Observable so consumers can't directly call next()
  loggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  // Update the login state
  updateIsLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }

  // Get the current value (synchronously if needed)
  get isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }
}
