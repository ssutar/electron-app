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

export interface IDailyUpdate extends IUpdate {
  period?: number;
  date: string;
}

export interface IDailyUpdateHeaderFormData {
  date: string;
  goodThoughtId: string;
  daySpecialId: string;
  teacherId: string;
}

export interface IDailyUpdateHeader extends IDailyUpdateHeaderFormData {
  id?: string;
  goodThought?: string;
  daySpecial?: string;
}

export interface IUpdateFormData {
  teacherId: string;
  grade: string;
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
  schoolId: string;
  confirmPassword?: string;
}

export interface ISchool {
  id?: string;
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
  avatar?: string;
}

export interface ISubject {
  id?: string;
  title: string;
  teacherId: string;
}

export interface ILinkDailyUpdateSearchFormData {
  grade: string;
  subjectId: string;
  teacherId: string;
}

export interface ILinkDailyUpdateFormData {
  date: string;
  updateId: string;
  period: string;
  teacherId: string;
}

export interface IGoodThought {
  id: string;
  thought: string;
  teacherId: string;
}

export interface IDaySpecial {
  id: string;
  special: string;
  teacherId: string;
}
