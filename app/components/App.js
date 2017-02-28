import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Grid from './Grid';

export default class App extends Component {

    onPress = () => this.grid.restart();

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header} />
                <View style={{ flex: 3 }} >
                    <Grid ref={(grid) => this.grid = grid} />
                </View>
                <View style={styles.header} >
                    <Button
                        style={styles.button}
                        onPress={this.onPress}
                        title="Restart"
                        color="steelblue"
                    />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: { width: 100 }
});
