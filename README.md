# playing-with-telehash

Just some place to stash code I'm using the play with [Telehash-js](https://github.com/telehash/telehash-js).

## Dependencies

* [NodeJS v4.2.1](https://nodejs.org) — I have not been able to install [telehash under Node 5+](https://github.com/telehash/telehash-js/issues/51).
* [Gulp]() — to run the unit tests and linter. `npm install -g gulp`

## To run

Before you do anything else,

```sh
npm install
```

then open a second terminal window, `cd`'d to this folder

in this one go

```sh
./bin/server
```

and the server will create keys etc in `./.tmp/`

Then run

```sh
./bin/client
```

The client will also create a keyfile for itself, then discover the server and start sending it data.

## To test

```sh
npm test
```

which in turn simply calls

```sh
gulp test
```
