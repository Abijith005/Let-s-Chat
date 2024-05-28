import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  isSubmitted: boolean = false;
  registerForm: FormGroup = new FormGroup({});

  private _ngUnsbscribe = new Subject<void>();
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _ngToaster: NgToastService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/),
        ],
      ],
      password: ['', [Validators.required, Validators.pattern(/^.{4,}$/)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.registerForm.valid) {
      return;
    }
    if (
      this.registerForm.get('password')?.value !=
      this.registerForm.get('confirmPassword')?.value
    ) {
      this.registerForm.get('confirmPassword')?.setErrors({ match: true });
      return;
    }

    const data = this.registerForm.getRawValue();

    this._authService
      .userRegister(data)
      .pipe(takeUntil(this._ngUnsbscribe))
      .subscribe((res) => {
        this._ngToaster.success({
          position: 'topCenter',
          duration: 2000,
          detail: res.message,
        });
        this._router.navigate(['../']);
      });
  }

  ngOnDestroy(): void {
    this._ngUnsbscribe.next();
    this._ngUnsbscribe.complete();
  }
}
