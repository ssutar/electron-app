export default {
  translation: {
    global: {
      appName: 'TeacherUp',
    },
    homePage: {
      title: 'Daily updates',
      print: 'Print',
    },
    updatesPage: {
      title: 'All updates',
    },
    dateForm: {
      date: 'Date',
      day: 'Day',
      month: 'Month',
      goodThought: 'Good thought',
      daySpecial: 'Day special',
    },
    dailyRegisterTable: {
      columns: {
        period: 'Period',
        grade: 'Grade',
        subject: 'Subject',
        teachingMethod: 'Teaching method',
        teachingAid: 'Teaching aid',
        boardWork: 'Board work',
        objectives: 'Objectives',
        teacherProcedure: 'Teacher procedure',
        studentProcedure: 'Student procedure',
        onlineMedium: 'Online medium',
        homeWork: 'Home work',
      },
    },
    updatesTable: {
      columns: {
        grade: 'Grade',
        subject: 'Subject',
        teachingMethod: 'Teaching method',
        teachingAid: 'Teaching aid',
        boardWork: 'Board work',
        objectives: 'Objectives',
        teacherProcedure: 'Teacher procedure',
        studentProcedure: 'Student procedure',
        onlineMedium: 'Online medium',
        homeWork: 'Home work',
      },
    },
    linkDailyUpdateFormDialog: {
      title: 'Link the daily updates',
      add: 'Add daily updates for the date {{date}}',
    },
    addUpdateFormDialog: {
      title: 'Enter the updates',
      add: 'Add updates',
    },
    addUpdateForm: {
      date: 'Date',
      period: 'Period',
      selectPeriod: 'Select period',
      grade: 'Grade',
      selectGrade: 'Select grade',
      subject: 'Subject',
      teachingMethod: 'Teaching method',
      teachingAid: 'Teaching aid',
      boardWork: 'Board work',
      objectives: 'Objectives',
      teacherProcedure: 'Teacher procedure',
      studentProcedure: 'Student procedure',
      onlineMedium: 'Online medium',
      homeWork: 'Home work',
      save: 'Save',
      root: {
        success: 'Update inserted successfully, <2>go to dashboard</2>',
      },
      errors: {
        grade: {
          required: 'Please select a valid grade',
        },
        subject: {
          required: 'Please select a valid subject',
        },
        teachingMethod: {
          required: 'Please enter a valid teaching method',
        },
        teachingAid: {
          required: 'Please enter a valid teaching aid',
        },
        boardWork: {
          required: 'Please enter a valid board work',
        },
        objectives: {
          required: 'Please enter a valid objectives',
        },
        teacherProcedure: {
          required: 'Please enter a valid teacher procedure',
        },
        studentProcedure: {
          required: 'Please enter a valid student procedure',
        },
        onlineMedium: {
          required: 'Please enter a valid online medium',
        },
        homeWork: {
          required: 'Please enter a valid home work',
        },
      },
    },

    linkDailyUpdateForm: {
      date: 'Date',
      period: 'Period',
      selectPeriod: 'Select period',
      grade: 'Grade',
      selectGrade: 'Select grade',
      subject: 'Subject',
      selectSubject: 'Select subject',
      teachingMethod: 'Teaching method',
      teachingAid: 'Teaching aid',
      boardWork: 'Board work',
      objectives: 'Objectives',
      teacherProcedure: 'Teacher procedure',
      studentProcedure: 'Student procedure',
      onlineMedium: 'Online medium',
      homeWork: 'Home work',
      link: 'Link',
      search: 'Search',
      errors: {
        grade: {
          required: 'Please select a valid grade',
        },
        subject: {
          required: 'Please select a valid subject',
        },
        teachingMethod: {
          required: 'Please enter a valid teaching method',
        },
        teachingAid: {
          required: 'Please enter a valid teaching aid',
        },
        boardWork: {
          required: 'Please enter a valid board work',
        },
        objectives: {
          required: 'Please enter a valid objectives',
        },
        teacherProcedure: {
          required: 'Please enter a valid teacher procedure',
        },
        studentProcedure: {
          required: 'Please enter a valid student procedure',
        },
        onlineMedium: {
          required: 'Please enter a valid online medium',
        },
        homeWork: {
          required: 'Please enter a valid home work',
        },
      },
    },

    loginForm: {
      title: 'Sign in to TeacherUp',
      email: 'Email',
      password: 'Password',
      login: 'Login',
      signupText: 'Do not have an account?',
      signup: 'Signup',
      errors: {
        email: {
          required: 'Please enter a valid email',
        },
        password: {
          required: 'Please enter a valid password',
        },
        root: {
          invalid: 'Invalid combination of email and password, please try again',
        },
      },
    },
    signupForm: {
      title: 'SignUp to TeacherUp',
      subtitle: 'Start for free',
      email: 'Email',
      name: 'Name',
      password: 'Password',
      school: 'School',
      selectSchool: 'Please select school',
      confirmPassword: 'Confirm password',
      signup: 'Signup',
      loginText: 'Already have an account?',
      login: 'Login',
      root: {
        success:
          'Account created successfully. An email has been sent to the provided email address',
      },

      errors: {
        email: {
          required: 'Please enter a valid email',
        },
        school: {
          required: 'Please enter a valid school',
        },
        name: {
          required: 'Please enter a valid name',
        },
        password: {
          required: 'Please enter a valid password',
          shouldMatch: 'The passwords should match',
        },
      },
    },
  },
};
