var view;

module("group helper", {
  setup: function() {},

  teardown: function() {
    Ember.run(function() {
      view.destroy();
    });
    Ember.run.cancelTimers();
  }
});

function createView(template, context) {
  var options = {
    context: context,
    template: Ember.Handlebars.compile(template)
  };
  Ember.run(function() {
    view = Ember.View.create(options);
  });
}

function appendView() {
  Ember.run(function() { view.appendTo('#qunit-fixture'); });
}

test("should enable grouping behavior", function() {
  createView("{{#group}}{{msg}}{{/group}}", {msg: 'ohai'});
  appendView();

  equal(view.$('script').length, 2, "Metamorph markers are output for the group's virtual view");
  equal(view.$().text(), 'ohai', 'Original value was rendered');
});
