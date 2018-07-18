export class ErrorClasses {
	public 'ng-dirty': boolean;
	public 'ng-touched': boolean;
	public 'ng-invalid': boolean;
	constructor() {
		this['ng-dirty'] = this['ng-touched'] = this['ng-invalid'] = false;
	};
}

// Shortened syntax:
// constructor(public 'ng-dirty': boolean = false, ...) {}
// does not working, may by since literals used as property names
