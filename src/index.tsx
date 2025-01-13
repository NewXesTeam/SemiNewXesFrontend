// @ts-ignore
import React from 'react';
import { createRoot } from 'react-dom/client';
// @ts-ignore
import { Work } from './interfaces/work.ts';
import { Container } from 'react-bootstrap';

// @ts-ignore
import NavbarComponent from './components/Navbar.tsx';
// @ts-ignore
import WorkList from './components/WorkList.tsx';
import './styles/index.scss';
import { Carousel, Space } from '@douyinfe/semi-ui';

const IndexPage = () => {
    const [cards, setCards] = React.useState<React.JSX.Element | null>(null);

    React.useEffect(() => {
        let ignore = false;

        const fetchWorkData = async () => {
            const response = await fetch('/api/index/works/follows');
            let data = await response.json();
            let workData: Array<Work> = data.data.filter(Boolean);
            setCards(<WorkList works={workData} className="m-4" />);
        };

        if (!ignore) fetchWorkData();
        return () => {
            ignore = true;
        };
    }, []);

    const style = {
        width: '100%',
        height: '400px',
    };

    const titleStyle = {
        position: 'absolute',
        top: '100px',
        left: '100px',
        color: '#1C1F23'
    };


    const imgList = [
        'https://livefile.xesimg.com/programme/python_assets/2408b27e9c45a11098ddfd851844c4f1.png',
        'https://static0.xesimg.com/talcode/assets/home/banner/search_default.png',
        'https://static0.xesimg.com/talcode/assets/home/banner/event_default.png',
    ];

    return (
        <>
            <NavbarComponent />

            <Container>
                <Carousel style={style} theme="dark">
                    {imgList.map((src, index) => {
                        return (
                            <div key={index} style={{ backgroundSize: 'cover', backgroundImage: `url('${src}')` }}>
                                <Space vertical align="start" spacing="medium"></Space>
                            </div>
                        );
                    })}
                </Carousel>
                {/*<Carousel className="m-auto mt-5 mb-5" interval={3500}>*/}
                {/*    <Carousel.Item>*/}
                {/*        <a href="https://code.xueersi.com/home/project/detail?lang=scratch&pid=24831951&version=3.0&langType=scratch">*/}
                {/*            <img*/}
                {/*                src="https://livefile.xesimg.com/programme/python_assets/2408b27e9c45a11098ddfd851844c4f1.png"*/}
                {/*                className="d-block h-25"*/}
                {/*                alt="ill"*/}
                {/*            />*/}
                {/*        </a>*/}
                {/*    </Carousel.Item>*/}
                {/*    <Carousel.Item>*/}
                {/*        <a href="https://code.xueersi.com/search">*/}
                {/*            <img*/}
                {/*                src="https://static0.xesimg.com/talcode/assets/home/banner/search_default.png"*/}
                {/*                className="d-block h-25"*/}
                {/*                alt="search"*/}
                {/*            />*/}
                {/*        </a>*/}
                {/*    </Carousel.Item>*/}
                {/*    <Carousel.Item>*/}
                {/*        <a href="https://code.xueersi.com/event">*/}
                {/*            <img*/}
                {/*                src="https://static0.xesimg.com/talcode/assets/home/banner/event_default.png"*/}
                {/*                className="d-block h-25"*/}
                {/*                alt="events"*/}
                {/*            />*/}
                {/*        </a>*/}
                {/*    </Carousel.Item>*/}
                {/*</Carousel>*/}
                {cards}
            </Container>
        </>
    );
};

const dom: HTMLElement | null = document.getElementById('app');
if (dom) {
    const root = createRoot(dom);
    root.render(
        <React.StrictMode>
            <IndexPage />
        </React.StrictMode>,
    );
} else {
    throw new Error('Cannot find dom element #app');
}
