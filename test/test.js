const test = require('ava');
const {statement} = require('../src/statement');

test('case 1 :Customer Mandy without performance', t => {
    const invoice = {
        'customer': 'Mandy',
        'performances': []
    }
    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        },
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        },
        'othello': {
            'name': 'Othello',
            'type': 'tragedy',
        },
    };
    const result = statement(invoice, plays);
    const expectResult ="Statement for Mandy\n" +
        "Amount owed is $0.00\n" +
        "You earned 0 credits \n";
    t.is(result, expectResult);
});



const invoice = {
    'customer': 'BigCo',
    'performances': [
        {
            'playID': 'hamlet',
            'audience': 55,
        },
        {
            'playID': 'as-like',
            'audience': 35,
        },
        {
            'playID': 'othello',
            'audience': 40,
        },
    ],
};


