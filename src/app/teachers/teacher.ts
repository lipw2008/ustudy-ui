/* Defines the teacher entity */
export interface ITeacher {
    id?: string;
    teacherId: string;
    teacherName: string;
    grades?: IGrade[];
    classes?: IClass[];
    roles?: IRole[];
    subjects?: ISubject[];
    addiPerms?: IPerm[];
}

export interface IGrade {
    n: string;
}

export interface IClass {
    n: string;
}

export interface IRole {
    n: string;
}

export interface ISubject {
    n: string;
}

export interface IPerm {
    n: boolean;
}