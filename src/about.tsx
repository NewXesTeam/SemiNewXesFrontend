// @ts-ignore
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Container } from 'react-bootstrap';
// @ts-ignore
import NavbarComponent from './components/Navbar.tsx';
import './styles/common.scss';
import './darkmode.scss';

const AboutPage = () => {
    return (
        <>
            <NavbarComponent />
            <Container className="mt-5">
                <h1>关于 NewXesFrontend</h1>
                <p>没什么好关于的，就是一个《简单》的前端项目。</p>
                <p>使用 React {React.version} 开发，使用 Semi Design 作为 UI 框架。</p>
                <p>
                    代码仓库：
                    <a href="https://github.com/NewXesTeam/SemiNewXesFrontend">NewXesTeam/SemiNewXesFrontend</a>
                </p>
            </Container>
        </>
    );
};

const dom: HTMLElement | null = document.getElementById('app');
if (dom) {
    const root = createRoot(dom);
    root.render(
        <React.StrictMode>
            <AboutPage />
        </React.StrictMode>,
    );
} else {
    throw new Error('Cannot find dom element #app');
}
