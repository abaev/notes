import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
	// serverUrl: string = 'http://localhost:3000/';
	serverUrl: string = 'https://notes12.herokuapp.com/';
	descMaxLength: number = 140;
	vapidPublicKey: string = 'BLKiaMyZkLt3pPP5Oxn5j8Eyx-K-CWwDujfhRGHtmPUpEjgsAprxKYCCublRZLKQAZz-PkFYlfFu67Hgv-Qjhwo';
  constructor() { }

}
