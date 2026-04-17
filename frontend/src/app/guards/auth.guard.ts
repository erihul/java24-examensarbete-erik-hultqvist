import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { LoginFormComponent } from '../components/login-form/login-form.component';

export const authGuard: CanActivateFn = () => {
	const auth = inject(AuthService);
  return !!auth.currentUser();
};