exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.dropColumns('users', 'salt', {ifExists: true})
  pgm.renameColumn('users', 'cratedAt', 'createdAt')
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
