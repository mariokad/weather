require('./dom-mock')('<html><body></body></html>');

var jsdom = require('mocha-jsdom');
var assert = require('assert');
var React = require('react');
var TestUtils = require('react-addons-test-utils');

describe('Testing my div', function() {
  jsdom({ skipWindowCheck: true });

  it('should contain text: Weather Seeker', function() {
    var Weather = require('../client/src/Weather.jsx');
    var aDiv = TestUtils.renderIntoDocument(
      <Weather />
    );
    var divText = TestUtils.findRenderedDOMComponentWithTag(aDiv, 'p');

    assert.equal(divText.textContent, 'Weather Seeker');
  });
});