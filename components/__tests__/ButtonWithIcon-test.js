import 'react-native';
import React from 'react';
import ButtonWithIcon from '../ButtonWithIcon';
import renderer from 'react-test-renderer';

it('renders corectly', () => {
    const tree = renderer.create(<ButtonWithIcon />).toJSON();

    expect(tree).toMatchSnapshot();
});