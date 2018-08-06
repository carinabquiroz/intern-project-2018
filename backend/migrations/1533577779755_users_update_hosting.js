exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('users', {
    hosting: {
      type:'integer[]',
      notNull: true,
      default: '{}',}
  })
};

exports.down = (pgm) => {
  pg_migrate.dropTable('users');
};
