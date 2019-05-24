import 'react-native';
import React from 'react';
import QRCodeScanner from '../QRCodeScanner';
import renderer from 'react-test-renderer';

it('renders corectly', () => {
    const tree = renderer.create(<QRCodeScanner />).toJSON();

    expect(tree).toMatchSnapshot();
});