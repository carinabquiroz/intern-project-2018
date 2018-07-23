exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    username: {
      type: 'varchar(100)',
      notNull: true,
      default: '{}',
    },
    salt: {
      type:'varchar(100)',
      notNull: true,
      default: '{}',
    },
    hash: {
      type:'varchar(100)',
      notNull: true,
      default: '{}',
    },
    cratedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
