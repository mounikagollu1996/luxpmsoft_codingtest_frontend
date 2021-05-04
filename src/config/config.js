export const Config = {
    api_url:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:5000'
            : 'http://3.129.7.53/api/',
};

export const grades = [
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
    'Grade 12',
];
