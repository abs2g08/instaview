import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import expect from 'expect';

describe('root', ()=> {
  it('renders without problems', () => {
    console.log('running sanity test...')
    const rootComp = TestUtils.renderIntoDocument(<div>hello world</div>);
    expect(rootComp).toExist();
  });
});
