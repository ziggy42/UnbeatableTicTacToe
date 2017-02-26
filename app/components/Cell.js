import React, { Component } from 'react';
import { Image, TouchableHighlight, StyleSheet } from 'react-native';
import MiniMax from '../logic/minimax';

export default class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = { selected: false };
    }

    onPress = () => {
        const { onPress, position } = this.props
        onPress(position)
    }

    render() {
        const { position } = this.props;
        const style = {
            backgroundColor: (position.x - position.y) % 2 === 0 ? 'powderblue' : 'steelblue'
        };
        const { touchableHighlight } = styles;
        const combineStyles = StyleSheet.flatten([touchableHighlight, style]);

        return (
            <TouchableHighlight onPress={this.onPress} style={combineStyles} >
                <Image source={this.getImage()} />
            </TouchableHighlight>
        );
    }

    getImage() {
        const { selectedBy } = this.props;

        if (!selectedBy)
            return null;

        return selectedBy === MiniMax.HUMAN ? require('../../resources/images/ic_clear_black_24dp.png')
            : require('../../resources/images/ic_panorama_fish_eye_black_24dp.png');
    }

}

const styles = StyleSheet.create({
    touchableHighlight: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
});
