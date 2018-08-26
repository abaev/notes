import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
	serverUrl: string = 'http://localhost:3000/';
	descMaxLength: number = 140;
  constructor() { }

}
