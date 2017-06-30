# ember-data-failed-async-relationship-lookup-repo-demo

A minimal app &amp; mock back-end to demonstrate that failed async relationship lookups get stuck


If you trigger the retrieval of an async relationship, and then
retry your transition after remedying the error, subsequent calls
to `.get` the async relationship continue to return the original
failing promise (with error) due to computed property value caching
and state held inside of the relationship state object.

Step through the breakpoints of the index route of this small app to see the behavior
in action.


