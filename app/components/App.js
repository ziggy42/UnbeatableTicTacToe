import React, { Component } from 'react';
import { View, Button } from 'react-native';
import Grid from './Grid';

export default class App extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'skyblue'
                }} />
                <View style={{ flex: 3 }} >
                    <Grid ref={(grid) => {
                        this.grid = grid;
                    }} />
                </View>
                <View style={{
                    flex: 1,
                    backgroundColor: 'skyblue',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} >
                    <Button
                        style={{ width: 100 }}
                        onPress={() => {
                            this.grid.restart();
                        }}
                        title="Restart"
                        color="steelblue"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
            </View>
        );
    }

}
