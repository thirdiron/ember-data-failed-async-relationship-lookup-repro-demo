import $ from 'jquery';
var relatedLookupErrorCount = 0;
import Route from "@ember/routing/route";
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

function performFix() {
  //  Simulate fixing the issue by posting to an API
  //  endpoint that makes the relatedThings lookup stop
  //  failing
  return $.ajax('/api/fix', { method: 'post'})
    .then(() => {
      debugger;
    });
}

export default class IndexRoute extends Route {
  @service store;

  model() {
    return this.store.find('thing', 1)
      .then((thing) => {
        return thing.get('relatedThings');
      })
      .then((relThings) => {
        debugger;
      })
      .catch((err) => {
        relatedLookupErrorCount++;
        if (relatedLookupErrorCount == 1) {
          console.log('Encountered first error, as expected');
        }

        if (relatedLookupErrorCount > 1) {
          console.log('The .get against the relationship "failed" again, but the back-end should be fixed.  Verify backend works to isolate issue to caching');

          return $.ajax('/api/related-things')
            .then((relThingsResponse) => {
              console.log('relThingsResponse.data[0].id == ' + relThingsResponse.data[0].id);
              console.log('The .get fails, and yet the endpoint works');
              debugger;
            });

        }

        debugger;
        throw err;
      });
  }

  @action
  error(err, transition)  {
    if (relatedLookupErrorCount > 1) {
      throw new Error("We should have only seen one error.  Break the cycle so we don't infinitely loop");
    }
    // Ok, we got an error looking up related data.
    // Perform some actions to remedy the problem
    // then retry the transition
    performFix().then(() => {
      transition.retry();
    });
  }
}
