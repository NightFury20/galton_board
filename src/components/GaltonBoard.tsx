import { useState } from 'react';
import { Button, Card } from 'antd';
import BoardLayer from './BoardLayer';
import BoardLayerType from '../types/BoardLayerType';

const GaltonBoard = () => {
    const [boardLayers, setBoardLayers] = useState([] as BoardLayerType[]);

    return (
        <>
            <Card
                onClick={() => {
                    const newBoardLayers = [
                        {
                            ballsInLayer: 10000,
                            buckets: Array.from({ length: 10 }, () => (0)),
                            index: 0,
                            initial: true,
                            start: 0,
                        },
                    ];

                    setBoardLayers(newBoardLayers);
                }}
                title="Galton Board"
                style={{
                    textAlign: 'center',
                }}
            >
                <Button
                    type="primary"
                    size="large"
                >
                    Start
                </Button>
            </Card>

            {boardLayers.map((layer, index) => (
                <BoardLayer
                    key={Math.random()}
                    layer={layer}
                    newLayer={(start: number, balls: number) => {
                        const newBoardLayers = [...boardLayers];

                        newBoardLayers[index].buckets[start] = 0;
                        newBoardLayers[index].ballsInLayer -= balls;

                        if (index === boardLayers.length - 1) {
                            newBoardLayers.push({
                                ballsInLayer: balls,
                                buckets: Array.from({ length: 10 }, () => (0)),
                                index: index + 1,
                                initial: false,
                                start,
                            });
                        } else {
                            const nextLayer = boardLayers[index + 1];

                            newBoardLayers[index + 1] = {
                                ...nextLayer,
                                ballsInLayer: nextLayer.ballsInLayer + balls,
                                start,
                            };
                        }

                        setBoardLayers(newBoardLayers);
                    }}
                    setBuckets={(buckets: number[]) => {
                        const newBoardLayers = [...boardLayers];

                        newBoardLayers[index].buckets = buckets;

                        setBoardLayers(newBoardLayers);
                    }}
                />
            ))}
        </>
    );
};

export default GaltonBoard;
