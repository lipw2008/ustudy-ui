import { Component, OnInit }  from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { SchoolService } from './school.service';

@Component({
    templateUrl: 'update-grade.component.html'
})

export class UpdateGradeComponent implements OnInit {

    errorMessage: string;

	gradeId: string;

	gradeOwner: any = {"id": "", "n": ""};

	subjects = [];

	teachers = [];

    constructor(private _schoolService: SchoolService, private route: ActivatedRoute, private router: Router) {

    }

	cancel(event) {
		this.subjects=[];
		this.teachers=[];
		this.router.navigate(['grade']);
	}

	update(event) {
		if(this.gradeOwner.id !== "") {
			this.updateGradeOwner(event);
		}
		if(this.subjects.length > 0) {
			this.updateSubjects(event);
		}
	}

	updateGradeOwner(event) {
		const req = new XMLHttpRequest();
		req.open('POST', "http://47.92.53.57:8080/info/school/grade/updateOwner/"  + this.gradeId);
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			that.subjects=[];
			that.teachers=[];
			if (req.readyState == 4 && req.status == 200) {
				alert("修改成功");
				//go back to the student list page
				that.router.navigate(['grade']);
			} else if (req.readyState == 4 && req.status != 200) {
				alert("修改失败！");
				//go back to the student list page
				that.router.navigate(['grade']);
			}
		}

		// for(let option of this.gradeOwner.options){
		// 	if(option.selected === true) {
		// 		this.gradeOwner = {"id": option.id, "n": option.value};
		// 		break;
		// 	}
		// }
		delete this.gradeOwner.options;

		req.send(JSON.stringify(this.gradeOwner));
	}

	updateSubjects(event) {
		const req = new XMLHttpRequest();
		req.open('POST', "http://47.92.53.57:8080/info/school/grade/update/"  + this.gradeId);
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			that.subjects=[];
			that.teachers=[];
			if (req.readyState == 4 && req.status == 200) {
				alert("修改成功");
				//go back to the student list page
				that.router.navigate(['grade']);
			} else if (req.readyState == 4 && req.status != 200) {
				alert("修改失败！");
				//go back to the student list page
				that.router.navigate(['grade']);
			}
		}

		for(let subject of this.subjects) {
		// 	subject.owners = [];
		// 	for(let option of subject.options){
		// 		if(option.selected === true) {
		// 			let owner = {"id": option.id, "n": option.value};
		// 			subject.owners.push(owner);
		// 		}
		// 	}
			delete subject.options;
		}

		req.send(JSON.stringify(this.subjects));
	}

    ngOnInit(): void {

		this.gradeId = this.route.snapshot.params.gradeId;
		
		if (this.route.snapshot.params.gradeOwner) {
			this.gradeOwner = JSON.parse(this.route.snapshot.params.gradeOwner);
			this.loadTeachers();
		} else if (this.route.snapshot.params.subject) {
			let subject = JSON.parse(this.route.snapshot.params.subject);
			this.subjects.push(subject);
			this.loadTeachers();
		}
		else {
			this.loadSubjects();
		}
	}
	
	loadSubjects() {
		this.fetchSubjects((data) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.subjects = data.subjects;
			this.gradeOwner = data.gradeOwner;
			this.loadTeachers();
		});	
	}
	
	fetchSubjects(cb) {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://47.92.53.57:8080/info/school/grade/' + this.gradeId);
		//req.open('GET', 'assets/api/schools/grade.json');

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
			if(this.gradeOwner.id !== "") {
				this.gradeOwner.options = [];
				for(let teacher of this.teachers) {
					let t = {"id":"", "value": ""}
					t.id = teacher.teacherId;
					t.value = teacher.teacherName;
					this.gradeOwner.options.push(t);
				}
			}

			if(this.subjects.length > 0) {
				for(let subject of this.subjects) {
					subject.options = [];
					for(let teacher of this.teachers) {
						let t = {"id":"", "value": ""}
						t.id = teacher.teacherId;
						t.value = teacher.teacherName;
						subject.options.push(t);
					}
				}
				console.log("subjects: " + JSON.stringify(this.subjects));
			}
		});
	}
	
	fetchTeachers(cb) {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://47.92.53.57:8080/info/school/gradeteac/' + this.gradeId);
		//req.open('GET', 'assets/api/teachers/gradeTeachers.json');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}
}
