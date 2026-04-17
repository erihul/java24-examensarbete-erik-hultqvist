import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, inject } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-header',
	imports: [ CommonModule, RouterModule, MenubarModule, ButtonModule, PopoverModule, InputTextModule, FormsModule,
				ReactiveFormsModule ],		
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
	isScrolled = false;
	searchControl = new FormControl();
	ref: DynamicDialogRef<LoginFormComponent> | null = null;
	private dialogService = inject(DialogService);
	private messageService = inject(MessageService);
	private authService = inject(AuthService);
	private router = inject(Router)

	isLoggedIn = this.authService.isLoggedIn;

	constructor() {}

	@HostListener('window:scroll')
	onScroll() {
		this.isScrolled = window.scrollY > 20;
	}

	
	onSearchSubmit() {
		const query = this.searchControl.value;

		this.messageService.add({
			severity: 'contrast',
			summary: 'Your search:',
			detail: `${query}`,
			life: 3000,
		});
	}

	checkAuth(event: Event) {
		if (!this.isLoggedIn()) {
			event.preventDefault();

			this.messageService.add({
				severity: 'warn',
				summary: 'Login required',
				detail: 'Please log in first',
			});

			this.showLoginForm();
		}
	}

	showLoginForm() {
		this.ref = this.dialogService.open(LoginFormComponent, {
			showHeader: false,
            width: '25vw',
			closable: true,
            modal: true,
			draggable:false,
			resizable: false,
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
			}
		});
		this.ref?.onClose.subscribe();
	}
	logOut() {
    this.authService.logout();
		this.messageService.add({
				severity: 'success',
				summary: 'Have a nice day!',
				detail: 'Logged out successfully'
			});
  }
}
