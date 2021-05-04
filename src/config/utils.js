export const getCurrentTime = () => {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
};

export const getCurrentDate = (date) => {
    var formated = new Date(date);
    var dd = String(formated.getDate()).padStart(2, '0');
    var mm = String(formated.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = formated.getFullYear();

    formated = dd + '/' + mm + '/' + yyyy;
    return formated;
};

export const getCurrentFormatedDate = (date) => {
    var formated = new Date(date);
    var dd = String(formated.getDate()).padStart(2, '0');
    var mm = String(formated.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = formated.getFullYear();

    formated = yyyy + '-' + mm + '-' + dd;
    return formated;
};

export const uniqueId = () => {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = `${seconds}${minutes}${hours}${dd}${yyyy}${mm}`;
    return strTime;
};

export const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const generateArrayOfYears = function (min) {
    const max = new Date().getFullYear();
    var years = [];

    for (var i = max; i >= min; i--) {
        years.push(i);
    }
    return years;
};
