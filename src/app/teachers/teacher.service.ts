import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { ITeacher } from './teacher';

@Injectable()
export class TeacherService {
    private _teacherUrl = 'api/teachers/teachers.json';
	
	private grades = ["高一", "高二", "高三"];
	
	private types = ["任课老师", "班主任", "备课组长", "学科组长", "年级主任", "校长", "考务老师"];
	
	private subjects = ["语文", "数学", "英语", "物理", "化学", "生物", "政治", "历史", "地理"];

    constructor(private _http: Http) { }

	getGrades(): string[] {
		return this.grades;
	}

	getSubjects(): string[] {
		return this.subjects;
	}

	getTypes(): string[] {
		return this.types;
	}

    getDefaultTeacher(): ITeacher {
        return {
            "teacherId" : "",
            "teacherName" : "",
            "grade" : "",
            "subject" : "",
            "type" : ""
	    }
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
