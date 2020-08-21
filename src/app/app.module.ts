import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { TokenInterceptorService } from './auth/token-interceptor.service';


@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent
	],
	imports: [
		AppRoutingModule,
		AuthModule,
		BrowserModule,
		BrowserAnimationsModule,
		CollapseModule,
		CoreModule,
		HttpClientModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
