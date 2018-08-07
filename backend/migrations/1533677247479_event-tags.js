exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('events', {
    tags: {
      type:'varchar(100)[]',
      notNull: true,
      default: '{}',
    }
  })
};
