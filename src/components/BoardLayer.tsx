import { useEffect } from 'react';
import {
    Button,
    Card, Col, Row, Typography,
} from 'antd';
import DownOutlined from '@ant-design/icons/DownOutlined';
import BoardLayerType from '../types/BoardLayerType';
import initialProbabilityMap from '../variables/initialProbabilityMap';
import getBucketResult from '../functions/getBucketResult';
import getPercentage from '../functions/getPercentage';

const { Text, Title } = Typography;

type PropTypes = {
    layer: BoardLayerType;
    newLayer: Function;
    setBuckets: Function;
};

const BoardLayer = (props : PropTypes) => {
    const {
        newLayer,
        layer,
        setBuckets,
    } = props;

    const {
        ballsInLayer,
        buckets,
        initial,
        start,
    } = layer;

    useEffect(() => {
        const ballsInBuckets = buckets.reduce((acc, balls) => acc + balls, 0);

        if (ballsInBuckets === ballsInLayer) return;

        const newBuckets = [...buckets];
        let probabilityMap = initialProbabilityMap;

        if (initial === false) {
            probabilityMap = probabilityMap.map((_p, index) => {
                if (index === start) {
                    return 25;
                }

                let distanceFromStart = index - start;

                if (distanceFromStart < 0) {
                    distanceFromStart = -distanceFromStart;
                }

                return 25 - (distanceFromStart * 2);
            });
        }

        for (let i = ballsInBuckets; i < ballsInLayer; i += 1) {
            const bucketResult = getBucketResult(buckets, probabilityMap);

            newBuckets[bucketResult] += 1;
        }

        setBuckets(newBuckets);
    });

    const maxPercentage = getPercentage(Math.max(...buckets), ballsInLayer);
    const barChartHeightMultiplier = 100 / maxPercentage;

    return (
        <Card>
            <Title
                level={5}
                style={{ textAlign: 'center' }}
            >
                {`Layer ${layer.index} - ${ballsInLayer} balls`}
            </Title>

            <Row>
                {buckets.map((balls, index) => {
                    const percentage = getPercentage(balls, ballsInLayer);

                    return (
                        <Col
                            key={Math.random()}
                            style={{
                                width: '10%',
                            }}
                        >
                            <Card
                                style={{
                                    height: '100px',
                                    padding: 0,
                                    margin: 0,
                                }}
                                bodyStyle={{
                                    height: '100px',
                                    padding: 0,
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: '#1890ff',
                                        bottom: 0,
                                        height: `${percentage * barChartHeightMultiplier}px`,
                                        position: 'absolute',
                                        width: '100%',
                                    }}
                                />
                            </Card>

                            <Card
                                bodyStyle={{ padding: 10 }}
                                style={{ textAlign: 'center' }}
                            >
                                <Title
                                    level={5}
                                    style={{
                                        marginBottom: '5px',
                                        marginTop: '5px',
                                    }}
                                >
                                    {balls}
                                </Title>

                                <Text
                                    type="secondary"
                                >
                                    {`${percentage.toFixed(2)}%`}
                                </Text>

                                <Button
                                    disabled={balls === 0}
                                    icon={<DownOutlined />}
                                    shape="circle"
                                    style={{ marginTop: '5px' }}
                                    type="primary"
                                    onClick={() => newLayer(index, balls)}
                                />
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Card>
    );
};

export default BoardLayer;
