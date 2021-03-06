import {CsvAdapter} from '../../src/adapters/CsvAdapter';

describe('CsvAdapter', () => {
  it('Read a csv - success', () => {
    const adapter = new CsvAdapter('tests/adapters/');

    const result = adapter.setTarget('mock-file.csv')
        .fetchAll();
    expect(result).toEqual([
      'GRU,BRC,10',
      'BRC,SCL,5',
      'GRU,CDG,75',
      'GRU,SCL,20',
      'GRU,ORL,56',
      'ORL,CDG,5',
      'SCL,ORL,20',
    ]);
  });

  it('Try to read a csv with wrong path - failed', () => {
    const adapter = new CsvAdapter('any-folder/adapters/');

    const errorMessagePrefix = 'ENOENT: no such file or directory, open';

    expect(() => {
      adapter.setTarget('mock-file.csv')
          .fetchAll();
    }).toThrowError(
        `${errorMessagePrefix} 'any-folder/adapters/mock-file.csv'`,
    );
  });

  it('Save a route in csv - success', () => {
    const adapter = new CsvAdapter('database-files/');

    const result = adapter.setTarget('travel-routes-test.csv')
        .save('');
    expect(result).toEqual(true);
  });
});
