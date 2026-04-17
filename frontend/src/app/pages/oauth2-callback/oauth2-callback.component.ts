import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-oauth2-callback',
  standalone: true,
  template: `<p class="text-white text-center mt-20">Signing you in...</p>`
})
export class OAuth2CallbackComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
	private messageService = inject(MessageService);

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    const refreshToken = this.route.snapshot.queryParamMap.get('refreshToken');

    if (token && refreshToken) {
      this.authService.saveOAuthSession(token, refreshToken);
			
			this.messageService.add({
				severity: 'success',
				summary: 'Welcome back!',
				detail: 'Signed in successfully'
			});
      this.router.navigate(['/now_playing']);
    } else {
      this.router.navigate(['/']);
    }
  }
}