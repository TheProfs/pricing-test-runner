module.exports = {
  testTimeout: 50000,
  preset: 'jest-puppeteer',
  globals: {
    URL: 'https://localhost:5001',
    DB: require('knex')({
      client: 'pg',
      connection: {
        host: '127.0.0.1',
        user: 'nicholaswmin',
        password: '',
        database: 'bitpaper_dev'
      }
    })
  },
  verbose: true
}
