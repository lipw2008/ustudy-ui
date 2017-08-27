import { Component, OnInit }  from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { SchoolService } from './school.service';

@Component({
    templateUrl: 'add-class-teacher.component.html'
})

export class AddClassTeacherComponent implements OnInit {

    errorMessage: string;

	class: any;

	selectedTeacher = {"teacherId": "", "teacherName": ""};

	teachers = [];

	temp = [];

	grades = [];
	subjects = [];

	subjectName: string = "";
	gradeName: string = "";
	teacherName: string = "";

    constructor(private _schoolService: SchoolService, private route: ActivatedRoute, private router: Router) {

    }

	cancel(event) {
		this.router.navigate(['updateClass']);
	}

	update(event) {
		if (this.route.snapshot.params.subject) {
			for(let subject of this.class.subjects) {
				if(subject.subject === this.route.snapshot.params.subject) {
					subject.teacher = this.selectedTeacher;
					let option = {"id":"", "value":""};
					option.id = this.selectedTeacher.teacherId;
					option.value = this.selectedTeacher.teacherName;
					subject.options.push(option);
					break;
				}
			}
			this._schoolService.setPersistData(this.class);
			this.router.navigate(['updateClass', {"otherClassTeacher": this.selectedTeacher}]);
		} else {
			this.class.classOwner.id = this.selectedTeacher.teacherId;
			this.class.classOwner.n = this.selectedTeacher.teacherName;
			this._schoolService.setPersistData(this.class);
			this.router.navigate(['updateClass', {"otherClassOwner": this.class.classOwner}]);
		}
		
	}

    ngOnInit(): void {
		this.grades = this._schoolService.getGrades();
		this.subjects = this._schoolService.getSubjects();
		this.class = this._schoolService.getPersistData();
		this.loadTeachers();
	}
	
	filter(event) {
		var t = this;
		const temp = this.temp.filter(function(d) {
			let ret = false;
			for (let grade of d.grades) {
				if (grade.n.indexOf(t.gradeName) !== -1){
					ret = true;
					break;
				}
			}
			if (ret === false) {
				return ret;
			} else {
				ret = false;
			}

			for (let subject of d.subjects) {
				if (subject.n.indexOf(t.subjectName) !== -1){
					ret = true;
					break;
				}
			}
			if (ret == false) {
				return ret;
			} else {
				ret = false;
			}

			if (d.teacherName.indexOf(t.teacherName) !== -1){
					ret = true;
			}

			return ret;
		});
		this.teachers = temp;
	}

	loadTeachers() {
		this.fetchTeachers((data) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.teachers = data;
			this.temp = data;
		});
	}
	
	fetchTeachers(cb) {
		const req = new XMLHttpRequest();
		//req.open('GET', 'http://47.92.53.57:8080/infocen/teacher/list/' + this.gradeId);
		req.open('GET', 'assets/api/teachers/gradeTeachers.json');

		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}
}
