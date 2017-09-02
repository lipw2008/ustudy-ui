import { Component, OnInit }  from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { SchoolService } from './school.service';

@Component({
    templateUrl: 'update-class.component.html'
})

export class UpdateClassComponent implements OnInit {

    errorMessage: string;

	classId: string;
	gradeId: string;
	departmentName: string;

	class: any = {
		classType: "",
		classOwner: {"id": "", "n":""},
		otherClassOwner: {"id": "", "n": ""}
	};

	teachers = [];

    constructor(private _schoolService: SchoolService, private route: ActivatedRoute, private router: Router) {

    }

	addClassTeacher(subjectName) {
		this._schoolService.setPersistData(this.class);
		if(subjectName !== '') {
			this.router.navigate(['addClassTeacher', {departmentName: this.departmentName, gradeId: this.gradeId, classId: this.classId, subject: subjectName}]);
		} else {
			this.router.navigate(['addClassTeacher', {departmentName: this.departmentName, gradeId: this.gradeId, classId: this.classId}]);
		}
	}

	cancel(event) {
		this.teachers=[];
		this._schoolService.resetPersistData();
		this.router.navigate(['class', {departmentName: this.departmentName, gradeId: this.gradeId}]);
	}

	update(event) {
		const req = new XMLHttpRequest();
		req.open('POST', "http://47.92.53.57:8080/info/school/class/update"  + this.classId);
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			that._schoolService.resetPersistData();
			if (req.readyState == 4 && req.status == 200) {
				alert("修改成功");
				//go back to the student list page
				that.router.navigate(['class', {departmentName: that.departmentName, gradeId: that.gradeId}]);
			} else if (req.readyState == 4 && req.status != 200) {
				alert("修改失败！");
				//go back to the student list page
				that.router.navigate(['class', {departmentName: that.departmentName, gradeId: that.gradeId}]);
			}
		}

		for(let subject of this.class.subjects) {
			delete subject.options;
		}

		req.send(JSON.stringify(this.class));
	}

    ngOnInit(): void {
		this.departmentName = this.route.snapshot.params.departmentName;
		this.gradeId = this.route.snapshot.params.gradeId;
		this.classId = this.route.snapshot.params.classId;
		
		if (this.route.snapshot.params.otherClassTeacher) {
			this.class = this._schoolService.getPersistData();
		} else if (this.route.snapshot.params.otherClassOwner){
			this.class = this._schoolService.getPersistData();
		} else {
			this.loadClass();
		}
	}
	
	loadClass() {
		this.fetchClass((data) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.class = data;
			this.loadTeachers();
		});	
	}
	
	fetchClass(cb) {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://47.92.53.57:8080/info/school/class/' + this.classId);
		//req.open('GET', 'assets/api/schools/class.json');

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
			for(let subject of this.class.subjects) {
				subject.options = [];
				for(let teacher of this.teachers) {
					let t = {"id":"", "value": ""}
					t.id = teacher.teacherId;
					t.value = teacher.teacherName;
					for (let ts of teacher.subjects) {
						if (ts.n === subject.subject)
							subject.options.push(t);
					}
				}
			}
			console.log("subjects: " + JSON.stringify(this.class.subjects));
		});
	}
	
	fetchTeachers(cb) {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://47.92.53.57:8080/info/school/gradeteac/' + this.gradeId);
		//req.open('GET', 'assets/api/teachers/classTeachers.json');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}
}
