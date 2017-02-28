import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import Cell from './Cell';
import MiniMax from '../logic/minimax';

const WIDTH = 3;
const minimax = new MiniMax();

export default class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitState();
    }

    render() {
        const rows = [View, { style: { flex: 1 } }];
        for (let i = 0; i < WIDTH; i++) {
            const varargs = [View, { style: { flex: 1, flexDirection: 'row' } }];
            for (let j = 0; j < WIDTH; j++)
                varargs.push(React.createElement(Cell, this.getProp(j, i)));
            rows.push(React.createElement.apply(null, varargs));
        }

        return React.createElement.apply(null, rows);
    }

    getInitState() {
        const gridMatrix = [];

        for (let i = 0; i < WIDTH; i++) {
            const row = [];

            for (let j = 0; j < WIDTH; j++) {
                row.push({ selectedBy: null });
            }
            gridMatrix.push(row);
        }

        return { gridMatrix };
    }

    restart() {
        this.setState(this.getInitState());
    }

    getProp(x, y) {
        return {
            onPress: (position) => {
                const { gridMatrix } = this.state;

                gridMatrix[position.y][position.x] = { selectedBy: MiniMax.HUMAN };

                this.setState(this.state);
                this.move();
            },
            selectedBy: this.state.gridMatrix[y][x].selectedBy,
            position: { x, y }
        };
    }

    move() {
        const { gridMatrix } = this.state;
        const { position } = minimax.minimax(gridMatrix, MiniMax.AI);


        if (position) {
            gridMatrix[position.y][position.x].selectedBy = MiniMax.AI;
            if (minimax.winning(gridMatrix, MiniMax.AI)) {
                this.showAlert('You lost the game 😟');
            } else {
                this.setState({ gridMatrix });
            }
        } else {
            this.showAlert('There are no more moves 🤗');
        }
    }

    showAlert(message) {
        Alert.alert(
            'Uh-oh',
            message,
            [
                {
                    text: 'OK',
                    onPress: () => this.restart()
                },
            ],
            { cancelable: false }
        );
    }
}
