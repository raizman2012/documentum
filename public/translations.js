angular.module(ApplicationConfiguration.applicationModuleName).config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('english', {
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

        'edit' : 'ערוך',
        'trash' : 'מחוק',
        'close' : 'בטל',
        'registrated' : 'נרשם',
        'likes' : 'העדפות'
    });


}]);