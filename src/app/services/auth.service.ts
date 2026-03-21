import { inject, Injectable, signal } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private afApp: FirebaseApp  = inject(FirebaseApp);
  private auth: Auth = getAuth(this.afApp);

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth,email, password);
  }

  public isAuthenticatedSignal = signal<boolean>(this.isLoggedIn());

  checkIsLogged(){
    onAuthStateChanged(this.auth, (user) => {
      this.isAuthenticatedSignal.set(user !== null);
    })
  }

  isLoggedIn(){
    return this.auth.currentUser !== null;
  }

  logout(){
    return signOut(this.auth);
  }

}
