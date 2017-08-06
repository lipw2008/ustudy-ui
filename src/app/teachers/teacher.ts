/* Defines the teacher entity */
export interface ITeacher {
    id?: string;
    teacherId: string;
    teacherName: string;
    grade: string;
    classes?: IClass[];
    roles: IRole[];
    subject: string;
    addiPerms?: IPerm[];
}

export interface IClass {
    c: string;
}

export interface IRole {
    r: string;
}

export interface IPerm {
    p: boolean;
}