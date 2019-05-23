import 'react-native';
import React from 'react';
import Loader from '../Loader';
import renderer from 'react-test-renderer';

it('renders corectly', () => {
    const tree = renderer.create(<Loader />).toJSON();

    expect(tree).toMatchSnapshot();
});