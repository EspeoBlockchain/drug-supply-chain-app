import 'react-native';
import React from 'react';
import Button from '../Button';
import renderer from 'react-test-renderer';

it('renders corectly', () => {
    const tree = renderer.create(<Button />).toJSON();

    expect(tree).toMatchSnapshot();
});
