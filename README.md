# Wakanda Javascript Client

[![Build Status](https://travis-ci.org/Wakanda/wakanda-javascript-client.svg?branch=master)](https://travis-ci.org/Wakanda/wakanda-javascript-client)
[![codecov.io](https://codecov.io/github/Wakanda/wakanda-javascript-client/coverage.svg?branch=master)](https://codecov.io/github/Wakanda/wakanda-javascript-client?branch=master)

Minimalist, framework agnostic, JavaScript client to interact with Wakanda Server REST API that exposes a
standard and easy to use JavaScript API.

## Install

Install through `npm` or `bower`. There is only browser version on `bower`, both node and browser ones on `npm`.

```bash
npm install wakanda-client
#or
bower install wakanda-client
```

## Documentation

Check out the [Quickstart Guide](https://github.com/Wakanda/wakanda-javascript-client/wiki/Quickstart) to learn how to how use Wakanda-Client.

## Development
Git clone this repository then install dependencies. Wakanda Client needs Node 4.0 or greater.

```bash
npm install
```

### Run (on web browser)

Launch webpack build on watch mode, it will rebuild the client when sources are edited.

```bash
npm run webpack-watch
```

On another tab, launch a server that serve example application on `app/` directory.

```bash
gulp serve
```

Then open your browser on `http://localhost:1136/app/index.html`.

### Build (dev)

```bash
npm run webpack-build
```

Bundles are built on `./dist/` directory.

You can `require` `wakanda-client.node.js` on a Node application, or directly insert
`wakanda-client.js` on a `<script>` tag (it's a UMD module) and use `WakandaClient` object.

## Integration tests
Integration testing is made with mocha and chai. It directly runs tests against built bundles.
Tests are written in ES5 to avoid useless compilation. There are two modes : one
which runs tests against node bundle, the other against the umd module on PhantomJS with karma.

There also are commands to launch test without rebuilding the bundles.

```bash
#Build and run integration test for karma
npm run test:karma:full

#Run test for karma
npm run test:karma:single

#Build and run integration test for node
npm run test:node:full

#Run test for node
npm run test:node:single
```

There is a [prism-connect](https://github.com/seglo/connect-prism) server running
to mock a real Wakanda Server. It has JSON
mocks stored on `test/connect/mocks/rest`. These JSON can be generated by launching
`npm run test-server:init`. It will launch prism-connect server and proxy all requests
to a real Wakanda Server, then store the results. This operation must be do each time
tests are modified or added.

You can launch the mocking server by typing `npm run test-server:start` and stop
it with `npm run test-server:stop`.

**Integration tests need this server to be running to execute**.

You can use the two following scripts to run both Karma and node unit test with
test server launching and stopping alone. Just be sure that port `3000` is free.

```bash
#Run test server, build bundles and launch karma and node integration tests
npm run test

#Same as previous one but without building bundles
npm run test-single
```

Karma automatically proxies requests on `/rest` to test server. For node
test, `WakandaClient` module is instancied with test server address on each
test file.

If port `3000` doesn't suit your needs, you can change it on `test/connect/server.js`
**and** on `test/server.integration.json`.

As PhantomJS doesn't support `CustomEvent` constructor, there is a polyfill on `test`
directory.

## Example

### Node.js

Wakanda Server URI on `WakandaClient` is mandatory for node bundle.

```javascript
var WakandaClient = require('wakanda-client');
var wakClient = new WakandaClient('http://localhost:8081'); //Pass here Wakanda Server url
console.log(wakClient.version()); //0.0.1
```

### Browser

You will have to proxy all request on `/rest` to your Wakanda Server (example on gulpfile), or directly
pass a server URI to `WakandaClient` constructor.
```javascript
<script src="./wakanda-client.min.js"></script>
<script>
  var wakClient = new WakandaClient(); //It will reach server on /rest address, you can pass an URI if you want to reach a specific server
  console.log(wakClient.version()); //0.0.1
</script>
```

You can alse use npm package for browser using (with webpack for example),
but you will have to require `wakanda-client/browser` module.

```javascript
var WakandaClient = require('wakanda-client/browser');
```

## License

MIT
