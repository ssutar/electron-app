import { type Database } from 'better-sqlite3';

const startScripts = [
  `
    CREATE TABLE IF NOT EXISTS Schools (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      address TEXT NOT NULL
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
    CREATE TABLE IF NOT EXISTS Subjects (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      title TEXT UNIQUE NOT NULL,
      teacherId INTEGER NOT NULL,
      CONSTRAINT Subjects_Teachers_FK FOREIGN KEY (teacherId) REFERENCES Teachers(id)
    );
  `,
  `
    CREATE TABLE IF NOT EXISTS GoodThoughts (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      thought TEXT NOT NULL,
      teacherId INTEGER NOT NULL,
      CONSTRAINT GoodThoughts_Teachers_FK FOREIGN KEY (teacherId) REFERENCES Teachers(id)
    );
  `,
  `
    CREATE TABLE IF NOT EXISTS DaySpecials (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      special TEXT NOT NULL,
      teacherId INTEGER NOT NULL,
      CONSTRAINT DaySpecials_Teachers_FK FOREIGN KEY (teacherId) REFERENCES Teachers(id)
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
      CONSTRAINT Updates_Teachers_FK FOREIGN KEY (teacherId) REFERENCES Teachers(id),
      CONSTRAINT Updates_Subjects_FK FOREIGN KEY (subjectId) REFERENCES Subjects(id)
    );
  `,
  `
    CREATE TABLE IF NOT EXISTS DailyUpdates (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      period INTEGER NOT NULL,
      updateId INTEGER NOT NULL,
      teacherId INTEGER NOT NULL,
      CONSTRAINT DailyUpdates_Updates_FK FOREIGN KEY (updateId) REFERENCES Updates(id),
      CONSTRAINT DailyUpdates_Teachers_FK FOREIGN KEY (teacherId) REFERENCES Teachers(id)
    );
  `,
  `
    CREATE TABLE IF NOT EXISTS DailyUpdatesHeaders (
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      goodThoughtId INTEGER NOT NULL,
      daySpecialId INTEGER NOT NULL,
      teacherId INTEGER NOT NULL,
      CONSTRAINT DailyUpdatesHeaders_GoodThoughts_FK FOREIGN KEY (goodThoughtId) REFERENCES GoodThoughts(id),
      CONSTRAINT DailyUpdatesHeaders_DaySpecials_FK FOREIGN KEY (daySpecialId) REFERENCES DaySpecials(id),
      CONSTRAINT DailyUpdatesHeaders_Teachers_FK FOREIGN KEY (teacherId) REFERENCES Teachers(id)
    );
  `,
];

export const startDB = (db: Database): void => {
  startScripts.forEach((script) => {
    db.prepare(script).run();
  });
};

export const insertFakeData = (db: Database): void => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  console.log('###########', 'Inserting fake schools for testing', '##############');

  const scripts = [
    `
    INSERT OR IGNORE INTO Schools
      (id, name, address)
      VALUES(1, 'School one', 'City one');
  `,
    `
    INSERT OR IGNORE INTO Schools
      (id, name, address)
      VALUES(2, 'School two', 'City two');
  `,
  ];

  scripts.forEach((script) => {
    db.prepare(script).run();
  });
};
