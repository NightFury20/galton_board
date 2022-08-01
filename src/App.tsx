import { Layout } from 'antd';
import './App.css';
import GaltonBoard from './components/GaltonBoard';

const App = () => (
    <Layout
        style={{
            backgroundColor: 'white',
            margin: 'auto',
            maxWidth: '1000px',
            width: '100%',
        }}
    >
        <GaltonBoard />
    </Layout>
);

export default App;
