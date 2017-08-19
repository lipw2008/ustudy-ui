import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class SchoolService {	
	private types = ["高中", "初中", "完中", "九年制", "小学", "十二年制", "补习", "其他"];

    constructor(private _http: Http) { }

	getTypes(): string[] {
		return this.types;
	}

	getSchoolId(): string {
		return "912850";
	}

}
