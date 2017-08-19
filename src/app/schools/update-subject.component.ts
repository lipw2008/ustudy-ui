import { Component, OnInit }  from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { SchoolService } from './school.service';

@Component({
    templateUrl: 'update-subject.component.html'
})

export class UpdateSubjectComponent implements OnInit {

    errorMessage: string;

	department: string;

	subjects = [];

	teachers = [];

    constructor(private _schoolService: SchoolService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
		
		this.department = this.route.snapshot.params.department;
		
		if (this.route.snapshot.params.subject) {
			this.subjects[0] = this.route.snapshot.params.subject;
			this.loadTeachers();
		} else {
			this.loadSubjects();
		}
	}
	
	loadSubjects() {
		this.fetchSubjects((data) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.subjects = data;
			this.loadTeachers();
		});	
	}
	
	fetchSubjects(cb) {
		const req = new XMLHttpRequest();
		//req.open('GET', 'http://47.92.53.57:8080/infocen/school/subject/list/' + this.department);
		req.open('GET', 'assets/api/schools/subjects.json');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}

	loadTeachers() {
		this.fetchTeachers((data) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.teachers = data;
			for(let subject of this.subjects) {
				subject.options = [];
				for(let teacher of this.teachers) {
					let t = {"n": "", "checked": false}
					t.n = teacher.teacherName;
					if (teacher.teacherName == subject.owner) {
						t.checked = true;
					}
					subject.options.push(t);
				}
			}
		});	
	}
	
	fetchTeachers(cb) {
		const req = new XMLHttpRequest();
		//req.open('GET', 'http://47.92.53.57:8080/infocen/teacher/list/0');
		req.open('GET', 'assets/api/teachers/teachers.json');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}
}
