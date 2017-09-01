import { Component, OnInit }  from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { SchoolService } from './school.service';

@Component({
    templateUrl: 'update-department.component.html'
})

export class UpdateDepartmentComponent implements OnInit {

    errorMessage: string;

	departmentName: string;

	subjects = [];

	teachers = [];

	endpoints = {"高中部": "high", "初中部": "junior", "小学部": "primary", "其他": "other"};

    constructor(private _schoolService: SchoolService, private route: ActivatedRoute, private router: Router) {

    }

	cancel(event) {
		this.subjects=[];
		this.teachers=[];
		this.router.navigate(['department']);
	}

	update(event) {
		const req = new XMLHttpRequest();
		req.open('POST', "http://47.92.53.57:8080/info/school/departsubs/update/"  + this.endpoints[this.departmentName]);
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			that.subjects=[];
			that.teachers=[];
			if (req.readyState == 4 && req.status == 200) {
				alert("修改成功");
				//go back to the student list page
				that.router.navigate(['department']);
			} else if (req.readyState == 4 && req.status != 200) {
				alert("修改失败！");
				//go back to the student list page
				that.router.navigate(['department']);
			}
		}

		for(let subject of this.subjects) {
			subject.owners = [];
			for(let option of subject.options){
				if(option.selected === true) {
					let owner = {"id": option.id, "n": option.value};
					subject.owners.push(owner);
				}
			}
			delete subject.options;
		}

		req.send(JSON.stringify(this.subjects));
	}

    ngOnInit(): void {

		this.departmentName = this.route.snapshot.params.departmentName;
		
		if (this.route.snapshot.params.subject) {
			console.log("subject routed:" + this.route.snapshot.params.subject);
			let subject = JSON.parse(this.route.snapshot.params.subject);
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
		req.open('GET', 'http://47.92.53.57:8080/info/school/departsubs/' + this.endpoints[this.departmentName]);
		//req.open('GET', 'assets/api/schools/subjects.json');

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
					let ret = false;
					for(let ts of teacher.subjects){
						if (ts.n === subject.subject) {
							ret = true;
							break;
						}
					}
					if (ret === true) { 
						let t = {"id":"", "value": "", "selected": false}
						t.id = teacher.teacherId;
						t.value = teacher.teacherName;
						for(let owner of subject.owners) {
							if(t.id === owner.id) {
								t.selected = true;
								break;
							}
						}
						subject.options.push(t);
					}
				}
			}
			console.log("subjects: " + JSON.stringify(this.subjects));
		});
	}
	
	fetchTeachers(cb) {
		const req = new XMLHttpRequest();
		//get department teachers
		req.open('GET', 'http://47.92.53.57:8080/info/school/departteac/' + this.endpoints[this.departmentName]);
		//req.open('GET', 'assets/api/teachers/teachers.json');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}
}
