exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('events', {
    id: 'id',
    creator: {
      type: 'varchar(100)',
      notNull: true,
    },
    title: {
      type:'text',
      notNull: true,
    },
    description: {
      type:'text',
      notNull: true,
    },
    date: {
      type:'date',
      notNull: true,
    },
    time: {
      type:'time',
      notNull: true,
    },
    location: {
      type:'text',
      notNull: true,
    },
    attendees: {
      type:'varchar(100)[]',
      notNull: true,
    },
    createdAt: {
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
  pg_migrate.dropTable('events');
};
