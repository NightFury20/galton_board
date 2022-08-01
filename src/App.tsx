import { Layout } from 'antd';
import './App.css';
import GaltonBoard from './components/GaltonBoard';

const App = () => (
    <Layout
        style={{
            margin: 'auto',
            maxWidth: '800px',
            width: '100%',
        }}
    >
        <GaltonBoard />
    </Layout>
);

export default App;
