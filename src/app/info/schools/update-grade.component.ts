import { Component, OnInit }  from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { SchoolService } from './school.service';
import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'update-grade.component.html'
})

export class UpdateGradeComponent implements OnInit {

    errorMessage: string;

    gradeId: string;

    gradeOwner: any = {'id': '', 'n': ''};

    subjects = [];

    teachers = [];

    constructor(private _schoolService: SchoolService, private _sharedService: SharedService, private route: ActivatedRoute, private router: Router) {

    }

    cancel(event) {
        this.subjects = [];
        this.teachers = [];
        this.router.navigate(['grade', {gradeId: this.gradeId}]);
    }

    update(event) {
        if (this.gradeOwner.id !== '') {
            this.updateGradeOwner(event);
        }
        if (this.subjects.length > 0) {
            this.updateSubjects(event);
        }
    }

    updateGradeOwner(event) {
        this.subjects = [];
        this.teachers = [];
        delete this.gradeOwner.options;
        this._sharedService.makeRequest('POST', '/info/school/grade/updateOwner/' + this.gradeId, JSON.stringify(this.gradeOwner)).then((data: any) => {
            alert('修改成功');
            //go back to the student list page
            this.router.navigate(['grade', {gradeId: this.gradeId}]);
        }).catch((error: any) => {
            console.log(error.status);
            console.log(error.statusText);
            alert('修改失败！');
            //go back to the student list page
            this.router.navigate(['grade', {gradeId: this.gradeId}]);
        });
    }

    updateSubjects(event) {
        for (const subject of this.subjects) {
            delete subject.options;
        }
        this._sharedService.makeRequest('POST', '/info/school/grade/update/' + this.gradeId, JSON.stringify(this.subjects)).then((data: any) => {
            this.subjects = [];
            this.teachers = [];
            alert('修改成功');
            //go back to the student list page
            this.router.navigate(['grade', {gradeId: this.gradeId}]);
        }).catch((error: any) => {
            this.subjects = [];
            this.teachers = [];
            console.log(error.status);
            console.log(error.statusText);
            alert('修改失败！');
            //go back to the student list page
            this.router.navigate(['grade', {gradeId: this.gradeId}]);
        });
    }

    ngOnInit(): void {

        this.gradeId = this.route.snapshot.params.gradeId;

        if (this.route.snapshot.params.gradeOwner) {
            this.gradeOwner = JSON.parse(this.route.snapshot.params.gradeOwner);
            this.loadTeachers();
        } else if (this.route.snapshot.params.subject) {
            const subject = JSON.parse(this.route.snapshot.params.subject);
            this.subjects.push(subject);
            this.loadTeachers();
        } else {
            this.loadSubjects();
        }
    }

    loadSubjects() {
        //req.open('GET', 'assets/api/schools/grade.json');
        this._sharedService.makeRequest('GET', '/info/school/grade/' + this.gradeId, '').then((data: any) => {
            //cache the list
            console.log('data: ' + JSON.stringify(data));
            this.subjects = data.subjects;
            this.gradeOwner = data.gradeOwner;
            this.loadTeachers();
        }).catch((error: any) => {
            console.log(error.status);
            console.log(error.statusText);
        });
    }

    loadTeachers() {

        //req.open('GET', 'assets/api/teachers/gradeTeachers.json');
        this._sharedService.makeRequest('GET', '/info/school/gradeteac/' + this.gradeId, '').then((data: any) => {
            //cache the list
            console.log('data: ' + JSON.stringify(data));
            this.teachers = data;
            if (this.gradeOwner.id !== '') {
                this.gradeOwner.options = [];
                for (const teacher of this.teachers) {
                    const t = {'id': '', 'value': ''}
                    t.id = teacher.teacherId;
                    t.value = teacher.teacherName;
                    this.gradeOwner.options.push(t);
                }
            }

            if (this.subjects.length > 0) {
                for (const subject of this.subjects) {
                    subject.options = [];
                    for (const teacher of this.teachers) {
                        const t = {'id': '', 'value': ''}
                        t.id = teacher.teacherId;
                        t.value = teacher.teacherName;
                        subject.options.push(t);
                    }
                }
                console.log('subjects: ' + JSON.stringify(this.subjects));
            }
        }).catch((error: any) => {
            console.log(error.status);
            console.log(error.statusText);
        });
    }

}
