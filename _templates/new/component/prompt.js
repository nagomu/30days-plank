module.exports = [
  {
    type: 'select',
    name: 'type',
    message: 'Which type?',
    choices: ['common', 'specifics'],
    filter: function(val) {
      return val;
    },
  },
  {
    type: 'input',
    name: 'sub',
    message: 'What is the name of new subdirectory?',
  },
];
