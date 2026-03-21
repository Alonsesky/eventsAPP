import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonLabel, IonButton, IonRouterLink } from '@ionic/angular/standalone';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast.service';
import { onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonInput,
    IonItem,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class LoginPage implements OnInit {

  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);


  public formLogin = this.formBuilder.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
  });

  constructor() { }

  ngOnInit() {
  }

  login(){
    const user: IUser = this.formLogin.value as IUser;
    this.authService.login(user.email, user.password).then(()=>{
      this.toastService.showToast('Login con exito!');
      this.router.navigateByUrl('create-event');
    }).catch((error)=>{
      this.toastService.showToast('El usuario o contraseña son incorrectos');
    });
  }


}
