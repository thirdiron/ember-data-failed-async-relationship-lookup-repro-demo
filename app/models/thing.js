import DS from 'ember-data';

export default DS.Model.extend({

  name: DS.attr('string'),
  relatedThings: DS.hasMany('relatedThing', { async: true })

});
