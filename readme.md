stream-path
===


Like a blob url in the browser, but for a path in node, and with a stream instead of a blob.  Uses named pipes under the hood. Really rough and written by somebody who's not all that familiar with unix stuff, so improvments welcome.  Not going to work on windows.

```bash
npm install stream-path
```

```js
var sp = require('stream-path');
```

API
===

Exposes two methods both of which take return a string.

- readableFile: takes a writable stream or a buffer, when things are written to the stream they show up in the file.  For use in modules (like [gm](https://www.npmjs.org/package/gm)) which *only* accept file paths as input.
- writableFile: takes a readable stream, when data is appended to the file, it shows up in the stream. For use in modules which only take a file to write to (no examples off the top of my head, but they likely exist).



