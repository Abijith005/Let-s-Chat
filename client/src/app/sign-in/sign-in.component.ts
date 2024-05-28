import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit, OnDestroy {
  role: string = '';
  isSubmitted: boolean = false;
  passwordVisibilty: boolean = false;
  loginForm: FormGroup = new FormGroup({});

  private _ngUnsbscribe = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _ngToaster: NgToastService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
      password: ['', [Validators.required, Validators.pattern(/^.{4,}$/)]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  selectRole(newRole: string) {
    this.role = newRole;
  }

  showPassword() {
    this.passwordVisibilty = !this.passwordVisibilty;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      return;
    }
    if (!this.role) {
      this._ngToaster.error({
        position: 'topCenter',
        duration: 2000,
        detail: 'Please select the role',
      });
      return;
    }
    const data = this.loginForm.getRawValue();
    data.role = this.role;

    this._authService
      .userLogin(data)
      .pipe(takeUntil(this._ngUnsbscribe))
      .subscribe((res) => {
        if (res.success) {
          this._ngToaster.success({
            position: 'topCenter',
            duration: 2000,
            detail: res.message,
          });
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          if (this.role == 'user') {     
            localStorage.setItem('userId',res._id)       
          }
          this._router.navigate([`/register`]);
        } else {
          this._ngToaster.error({
            position: 'topCenter',
            duration: 2000,
            detail: res.message,
          });
        }
      });
  }

  ngOnDestroy(): void {
    this._ngUnsbscribe.next();
    this._ngUnsbscribe.complete();
  }
}
