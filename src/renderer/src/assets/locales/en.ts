export default {
  translation: {
    global: {
      appName: 'TeacherUp',
    },
    dailyUpdatesPage: {
      title: 'Daily updates',
      print: 'Print',
    },
    updatesPage: {
      title: 'All updates',
    },
    goodThoughtsPage: {
      title: 'Good thoughts',
    },
    daySpecialsPage: {
      title: 'Day specials',
    },
    addGoodThoughtsPage: {
      title: 'Add good thought',
    },
    addDaySpecialsPage: {
      title: 'Add day special',
    },
    linkDailyUpdatesHeaderPage: {
      title: 'Change good thought and day special for {{date}}',
    },
    dateInputForm: {
      title: 'Select the date and search for daily updates',
      date: 'Date',
      search: 'Search',
      errors: {
        date: {
          required: 'Please select a valid date',
        },
      },
    },
    dailyUpdatesHeader: {
      date: 'Date',
      day: 'Day',
      month: 'Month',
      goodThought: 'Good thought',
      daySpecial: 'Day special',
      change: 'Change good thought and day special for {{date}}',
    },
    dailyUpdatesTable: {
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
      add: 'Add daily updates for {{date}}',
      print: 'Print',
      empty: 'No daily updates found for the date {{date}}',
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
      empty: 'No updates found, please add updates',
      add: 'Add updates',
    },
    goodThoughtsTable: {
      columns: {
        index: 'Index',
        goodThought: 'Good thought',
      },
      add: 'Add good thought',
      empty: 'No good thoughts found, please add good thoughts',
    },
    daySpecialsTable: {
      columns: {
        index: 'Index',
        daySpecial: 'Day special',
      },
      add: 'Add day special',
      empty: 'No day specials found, please add day specials',
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
        error: 'Something went wrong, please try again later',
      },
      errors: {
        grade: {
          required: 'Please select a valid grade',
        },
        subject: {
          required: 'Please select a valid subject',
        },
        period: {
          required: 'Please select a valid period',
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
      title: 'Please selet the update from the table and period',
      period: 'Period',
      selectPeriod: 'Select period',
      linkDailyUpdates: 'Link daily updates',
      root: {
        success: 'Update linked successfully, <2>go to daily updates</2>',
        error: 'Something went wrong, please try again later',
      },
      errors: {
        period: {
          required: 'Please select a valid period',
        },
      },
    },
    dailyUpdateSearchForm: {
      title: 'Please select the grade and subject to search',
      grade: 'Grade',
      selectGrade: 'Select your grade',
      subject: 'Subject',
      selectSubject: 'Select your subject',
      search: 'Search',
      errors: {
        grade: {
          required: 'Please select a valid grade',
        },
        subject: {
          required: 'Please select a valid subject',
        },
      },
    },
    dailyUpdatesHeaderLinkForm: {
      goodThoughts: 'Select a good thought from the table below',
      daySpecial: 'Select a day special from the table below',
      save: 'Save',
      root: {
        success: 'Good thought and day special linked successfully, <2>go to daily updates</2>',
        error: 'Something went wrong, please try again later',
      },
      errors: {
        goodThought: {
          required: 'Please select a valid good thought',
        },
        daySpecial: {
          required: 'Please select a valid day special',
        },
      },
    },
    addGoodThoughtForm: {
      thought: 'Good thought',
      save: 'Save',
      root: {
        success: 'Good thought inserted successfully, <2>go back to good thoughts</2>',
        error: 'Something went wrong, please try again later',
      },
    },
    addDaySpecialForm: {
      special: 'Day special',
      save: 'Save',
      root: {
        success: 'Day special inserted successfully, <2>go back to day specials</2>',
        error: 'Something went wrong, please try again later',
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
