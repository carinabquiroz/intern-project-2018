exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('users', {
    events: {
      type:'integer[]',
      notNull: true,
      default: '{}',}
  })
};

exports.down = (pgm) => {
  pg_migrate.dropTable('users');
};
