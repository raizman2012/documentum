angular.module(ApplicationConfiguration.applicationModuleName).config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('english', {
        'jambo_slogan' : 'Documentum UI Infractructure For Bank Hapoalim',
        'jambo_subslogan' : 'Fast developing, better applications.',
        'api_link' : 'Documentaion',
        'learn_more' : 'Learn more...',

        'documentum': 'Documentum',
        'viewer': 'Viewer',
        'editor': 'Editor',
        'explorer' : 'Explorer',
        'title' : 'Title',
        'created' : 'Created',
        'author' : 'Author',
        'tree' : 'tree',
        'folders' : 'folders',
        'drop_here' : 'Drop file here',
        'last_documents'  : 'Last documents',
        'no_last_documents'  : 'No last documents yet',
        '' : '',
        '' : '',
        '' : '',
        '' : '',
        'SNIPPETS': 'Snippets',
        'DOCS': 'Docs',
        'SEARCH_FOR_SNIPPETS' : 'Search for snippets',
        'snippet' : 'Snippet',
        'sources' : 'Sources',
        'name' : 'Name',
        'address' : 'Address',
        'age' : 'Age',
        'work' : 'Work at',
        'income' : 'Income',
        'search' : 'Search',
        'search_processing' : 'Searching',
        'new' : 'New',
        'save' : 'Save',
        'edit' : 'Edit',
        'trash' : 'Delete',
        'close' : 'Cancel',
        'registrated' : 'Registrated at',
        'likes' : 'Likes'
    });

    $translateProvider.translations('hebrew', {
        'jambo_slogan' : 'תשתיות ממשק משתמש ל-דוקומנטום',
        'jambo_subslogan' : 'פיתוח מהיר, ממשק מעולה.',
        'api_link' : 'תיעוד',
        'learn_more' : 'פרטים נוספים...',

        'documentum': 'דוקומנטום',
        'explorer' : 'ניווט',
        'viewer': 'פירוט',
        'editor': 'עריכה',
        'title' : 'מזהה',
        'created' : 'נוצר ב',
        'author' : 'בעלות',
        'tree' : 'עץ',
        'folders' : 'מחיצות',
        'drop_here' : 'גרר קובץ לפה',
        'SNIPPETS': 'דוגמאות',
        'DOCS': 'תיעוד',
        'SEARCH_FOR_SNIPPETS' : 'חיפוש דוגמאות',
        'snippet' : 'דוגמה',
        'sources' : 'מקור',
        'name' : 'שם',
        'address' : 'כתובת',
        'age' : 'גיל',
        'work' : 'מקום עבודה',
        'income' : 'הכנסה',
        'search' : 'חיפוש',
        'search_processing' : 'מחפש',
        'new' : 'חדש',
        'save' : 'שמור',
        'last_documents'  : 'מסמכים אחרונים',
        'no_last_documents'  : 'אין מסמכים אחרונים',

        'edit' : 'ערוך',
        'trash' : 'מחוק',
        'close' : 'בטל',
        'registrated' : 'נרשם',
        'likes' : 'העדפות'
    });


}]);