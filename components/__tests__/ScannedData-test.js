import 'react-native';
import React from 'react';
import ScannedData from '../ScannedData';
import renderer from 'react-test-renderer';

it('renders corectly', () => {
    const tree = renderer.create(<ScannedData />).toJSON();

    expect(tree).toMatchSnapshot();
});