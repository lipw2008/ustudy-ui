/* Defines the product entity */
export interface ITeacher {
    id?: string;
    teacherId: string;
    teacherName: string;
    grade: string;
    classes?: IClass[];
    type: string;
    subject: string;
    addiPerms?: string;
}

export interface IClass {
    c: string;
}
