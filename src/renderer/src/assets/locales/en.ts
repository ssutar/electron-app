export default {
  translation: {
    global: {
      appName: 'TeacherUp',
    },
    breadcrumb: {
      updates: 'All updates',
      allUpdates: 'All updates',
      addUpdates: 'Add updates',
      dailyUpdates: 'Daily updates',
      allDailyUpdates: 'All daily updates',
      addDailyUpdates: 'Add daily updates',
      addDailyUpdatesHeader: 'Add daily header',
      goodThoughts: 'Good quotes',
      allGoodThoughts: 'All good quotes',
      addGoodThoughts: 'Add good quotes',
      daySpecials: 'Day specials',
      allDaySpecials: 'All day specials',
      addDaySpecials: 'Add day specials',
    },
    sidebar: {
      brandName: 'TeacherUp',
      navMain: {
        dashboard: 'Dashboard',
        updates: 'Updates',
        allUpdates: 'All updates',
        addUpdates: 'Add updates',
        dailyUpdates: 'Daily updates',
        allDailyUpdates: 'All daily updates',
        addDailyUpdates: 'Add daily updates',
        addDailyUpdatesHeader: 'Add daily header',
        goodThoughts: 'Good quotes',
        allGoodThoughts: 'All good quotes',
        addGoodThoughts: 'Add good quotes',
        daySpecials: 'Day specials',
        allDaySpecials: 'All day specials',
        addDaySpecials: 'Add day specials',
      },
      user: {
        account: 'Account',
        logout: 'Logout',
      },
    },
    dailyUpdatesPage: {
      title: 'Daily updates',
      description: 'Browse the daily updates by the date selected',
      print: 'Print',
    },
    updatesPage: {
      title: 'All updates',
      add: 'Add new updates',
      description: 'Browse all the updates by grade and subjects',
    },
    goodThoughtsPage: {
      title: 'Good quotes',
    },
    daySpecialsPage: {
      title: 'Day specials',
    },
    addGoodThoughtsPage: {
      title: 'Add good quote',
      backToGoodThoughtsPage: 'Back to good quotes',
    },
    addDaySpecialsPage: {
      title: 'Add day special',
      backToDaySpecialsPage: 'Back to day specials',
    },
    linkDailyUpdatesHeaderPage: {
      title: 'Change good quote and day special for {{date}}',
    },
    dateInputForm: {
      title: 'Search',
      description: 'Select the date and search for daily updates',
      datePlaceholder: 'Select the date',
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
      goodThought: 'Good quote',
      noGoodThought: 'No good quotes',
      daySpecial: 'Day special',
      noDaySpecial: 'No day specials',
      change: 'Change good quote and day special for {{date}}',
    },
    dailyUpdatesTable: {
      filterBy: 'Filter by subject',
      columnsSelector: 'Select columns',
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
      filterBy: 'Filter by subject',
      columnsSelector: 'Select columns',
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
        selectRow: 'Select update',
        actions: {
          openMenu: 'Open action menu',
          actionLabel: 'Actions',
          edit: 'Edit',
          delete: 'Delete',
        },
      },
      empty: 'No updates found, please add updates',
      add: 'Add updates',
    },
    goodThoughtsTable: {
      columns: {
        index: 'Index',
        thought: 'Good quote',
        selectRow: 'Select good quote',
        actions: {
          openMenu: 'Open actions menu',
          actionLabel: 'Actions',
          edit: 'Edit',
          delete: 'Delete',
        },
      },
      filterBy: 'Filter by quotes',
      columnsSelector: 'Select columns',
      add: 'Add good quote',
      empty: 'No good quotes found, please add good quotes',
    },
    daySpecialsTable: {
      columns: {
        index: 'Index',
        special: 'Day special',
        selectRow: 'Select day special',
        actions: {
          openMenu: 'Open actions menu',
          actionLabel: 'Actions',
          edit: 'Edit',
          delete: 'Delete',
        },
      },
      filterBy: 'Filter by day specials',
      columnsSelector: 'Select columns',
      add: 'Add day special',
      empty: 'No day specials found, please add day specials',
    },
    addUpdateForm: {
      title: 'Add updates',
      description: 'Add updates for the grade and subject',
      backToUpdatesPage: 'Back to all updates',
      date: 'Date',
      grade: 'Grade',
      gradePlaceholder: 'Select your grade',
      selectGrade: 'Select grade',
      subject: 'Subject',
      subjectPlaceholder: 'Select your subject',
      teachingMethod: 'Teaching method',
      teachingMethodPlaceholder: 'Enter your teaching method',
      teachingAid: 'Teaching aid',
      teachingAidPlaceholder: 'Enter your teaching aid',
      boardWork: 'Board work',
      boardWorkPlaceholder: 'Enter your board work',
      objectives: 'Objectives',
      objectivesPlaceholder: 'Enter your objectives',
      teacherProcedure: 'Teacher procedure',
      teacherProcedurePlaceholder: 'Enter your teacher procedure',
      studentProcedure: 'Student procedure',
      studentProcedurePlaceholder: 'Enter your student procedure',
      onlineMedium: 'Online medium',
      onlineMediumPlaceholder: 'Enter your online medium',
      homeWork: 'Home work',
      homeWorkPlaceholder: 'Enter your home work',
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
      updateId: 'Please selet the update from the table below',
      updatesSearchResults: 'Showing the updates to add to {{date}}',
      period: 'Period',
      periodPlaceholder: 'Select your period',
      linkDailyUpdates: 'Add daily updates for {{date}}',
      root: {
        success: 'Update added successfully, <2>go to daily updates</2>',
        error: 'Something went wrong, please try again later',
      },
      errors: {
        period: {
          required: 'Please select a valid period',
        },
      },
    },
    dailyUpdateSearchForm: {
      title: 'Search for updates',
      description:
        'Please select the grade and subject to search to add daily updates for {{date}}',
      backToDailyUpdatesPage: 'Back to daily updates',
      grade: 'Grade',
      gradePlaceholder: 'Select your grade',
      subject: 'Subject',
      subjectPlaceholder: 'Select your subject',
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
          required: 'Please select a valid good quote',
        },
        daySpecial: {
          required: 'Please select a valid day special',
        },
      },
    },
    addGoodThoughtForm: {
      thought: 'Good quote',
      thoughtPlaceholder: 'Enter good quote',
      save: 'Save',
      errors: {
        thought: {
          required: 'Please select a valid good quote',
        },
      },
      root: {
        success: 'Good thought inserted successfully, <2>go back to good thoughts</2>',
        error: 'Something went wrong, please try again later',
      },
    },
    addDaySpecialForm: {
      special: 'Day special',
      specialPlaceholder: 'Enter day special',
      save: 'Save',
      errors: {
        special: {
          required: 'Please select a valid day special',
        },
      },
      root: {
        success: 'Day special inserted successfully, <2>go back to day specials</2>',
        error: 'Something went wrong, please try again later',
      },
    },
    loginForm: {
      title: 'Welcome back',
      subtitle: 'Sign in to TeacherUp',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      forgotPassword: 'Forgot your password?',
      login: 'Login',
      signupText: "Don't have an account?",
      signup: 'Sign up',
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
      emailPlaceholder: 'm@example.com',
      name: 'Name',
      namePlaceholder: 'Enter your name',
      password: 'Password',
      passwordPlaceholder: '6+ Characters, 1 Capital letter',
      school: 'School',
      schoolPlaceholder: 'Select school',
      selectSchool: 'Please select school',
      confirmPassword: 'Confirm password',
      confirmPasswordPlaceholder: 'Should match password',
      signup: 'Sign up',
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
