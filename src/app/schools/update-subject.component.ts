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

	cancel(event) {
		this.router.navigate(['subject']);
	}

	update(event) {
		const req = new XMLHttpRequest();
		req.open('POST', "http://47.92.53.57:8080/info/school/subject/update");
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				alert("修改成功");
				//go back to the student list page
				that.router.navigate(['subject']);
			} else if (req.readyState == 4 && req.status != 200) {
				alert("修改失败！");
				//go back to the student list page
				that.router.navigate(['subject']);
			}
		}
		for(let subject of this.subjects) {
			delete subject.options;
		}
		req.send(JSON.stringify(this.subjects));
	}

    ngOnInit(): void {

		this.department = this.route.snapshot.params.department;
		
		if (this.route.snapshot.params.subject && this.route.snapshot.params.owner) {
			let subject = {"subject":"", "owner": ""};
			subject.subject = this.route.snapshot.params.subject;
			subject.owner = this.route.snapshot.params.owner;
			this.subjects.push(subject);
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
					let t = {"value": ""}
					t.value = teacher.teacherName;
					subject.options.push(t);
				}
			}
			console.log("subjects: " + JSON.stringify(this.subjects));
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
