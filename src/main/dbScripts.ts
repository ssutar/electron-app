import { type Database } from 'better-sqlite3';

const startScripts = [
  `
    CREATE TABLE IF NOT EXISTS Schools (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL
    );
  `,
  `
    CREATE TABLE IF NOT EXISTS Updates (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      teacherId INTEGER NOT NULL,
      grade INTEGER NOT NULL,
      teachingMethod TEXT,
      teachingAid TEXT,
      boardWork TEXT,
      objectives TEXT,
      teacherProcedure TEXT,
      studentProcedure TEXT,
      onlineMedium TEXT,
      homeWork TEXT,
      "type" TEXT DEFAULT ('Offline') NOT NULL,
      subjectId INTEGER NOT NULL,
      CONSTRAINT DailyUpdates_Teachers_FK FOREIGN KEY (teacherId) REFERENCES Teachers(id),
      CONSTRAINT Updates_Subjects_FK FOREIGN KEY (subjectId) REFERENCES Subjects(id)
    );
  `,
  `
    CREATE TABLE IF NOT EXISTS Teachers (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      schoolId INTEGER NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT,
      CONSTRAINT Teachers_Schools_FK FOREIGN KEY (schoolId) REFERENCES Schools(id)
    );
  `,
  `
    CREATE TABLE IF NOT EXISTS DailyUpdates (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      period INTEGER NOT NULL,
      updateId INTEGER NOT NULL,
      CONSTRAINT DailyUpdates_Updates_FK FOREIGN KEY (updateId) REFERENCES Updates(id)
    );
  `
];

export const startDB = (db: Database): void => {
  startScripts.forEach((script) => {
    db.prepare(script).run();
  });
};
