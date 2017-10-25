import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class SchoolService {
    private types = ['高中', '初中', '完中', '九年制', '小学', '十二年制', '补习', '其他'];

    private grades = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '七年级', '八年级', '九年级', '高一', '高二', '高三'];

    private subjects = ['语文', '数学', '英语', '物理', '化学', '生物', '政治', '历史', '地理', '音乐', '美术', '体育', '科技'];

    private persistData = {};

    constructor(private _http: Http) { }

    getTypes(): string[] {
        return this.types;
    }

    getGrades(): string[] {
        return this.grades;
    }

    getSubjects(): string[] {
        return this.subjects;
    }

    getSchoolId(): string {
        return '912850';
    }

    getPersistData(): any {
        return this.persistData['_classInfo'];
    }

    setPersistData(data: any) {
        this.persistData['_classInfo'] = data;
    }

    resetPersistData() {
        this.persistData['_classInfo'] = undefined;
    }
}
