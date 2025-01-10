export interface IUpdate {
  id: string;
  grade: number;
  subjectId: string;
  subject: string;
  teachingMethod: string;
  teachingAid: string;
  boardWork: string;
  objectives: string;
  teacherProcedure: string;
  studentProcedure: string;
  homeWork: string;
  type: string;
  onlineMedium: string;
}

export interface IUpdateFormData {
  teacherId: string;
  grade: number;
  subjectId: string;
  teachingMethod: string;
  teachingAid: string;
  boardWork: string;
  objectives: string;
  teacherProcedure: string;
  studentProcedure: string;
  homeWork: string;
  type: string;
  onlineMedium: string;
}

export interface ISignupFormData {
  email: string;
  password: string;
  name: string;
  schoolId: number;
  confirmPassword?: string;
}

export interface ISchool {
  id?: number;
  name: string;
  address: string;
}

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ITeacher {
  id?: string;
  name: string;
  email: string;
  password: string;
  schoolId: string;
  school?: string;
}

export interface ISubject {
  id?: string;
  title: string;
  teacherId: string;
}

export interface ILinkDailyUpdateFormData {
  grade: string;
  subjectId: string;
  teacherId: string;
}
