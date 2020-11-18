import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { TokenInterceptorService } from './auth/token-interceptor.service';


const firebaseConfig = {
	apiKey: 'AIzaSyCe_IlFdmKAi703ux7Cdy3QuO4HjrLHxUY',
	authDomain: 'flashcards-e35e0.firebaseapp.com',
	databaseURL: 'https://flashcards-e35e0.firebaseio.com',
	projectId: 'flashcards-e35e0',
	storageBucket: 'flashcards-e35e0.appspot.com',
	messagingSenderId: '882393392205',
	appId: '1:882393392205:web:499068b6e156a2bf18e804',
	measurementId: 'G-7Z3LGEBQY4'
};


@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent
	],
	imports: [
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AppRoutingModule,
		AuthModule,
		BrowserModule,
		BrowserAnimationsModule,
		BsDropdownModule.forRoot(),
		CollapseModule.forRoot(),
		CoreModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
