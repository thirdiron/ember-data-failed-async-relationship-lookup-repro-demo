# ember-data-failed-async-relationship-lookup-repo-demo

A minimal app &amp; mock back-end to demonstrate that failed async relationship lookups get stuck


If you trigger the retrieval of an async relationship, and then
retry your transition after remedying the error, subsequent calls
to `.get` the async relationship continue to return the original
failing promise (with error) due to computed property value caching
and state held inside of the relationship state object.

Step through the breakpoints of the index route of this small app to see the behavior
in action.


* `git clone <repository-url>` this repository
* `cd edrelationship-test`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
