// @ts-ignore
import React, { useEffect, useState } from 'react';
// import { Container, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';
// @ts-ignore
import { checkLoggedIn } from '../utils.ts';
import { Switch, Typography } from '@douyinfe/semi-ui';
import { Nav, Avatar, Dropdown, Input, Form } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import { UserInfo } from '../interfaces/user';

const NavbarComponent = () => {
    const { Text } = Typography;
    const logoutEvent = async () => {
        await fetch('/passport/logout');
        location.reload();
    };
    let userComponent: React.JSX.Element;

    const [userAvatar, setUserAvatar] = React.useState<string>('');

    // 深色浅色模式自动切换
    //深色浅色模式跟随系统
    const [isDarkMode, setIsDarkMode] = useState(false);
    const body = document.body;

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);

        const handleChange = e => {
            setIsDarkMode(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    if (isDarkMode) {
        body.setAttribute('theme-mode', 'dark');
    } else {
        body.removeAttribute('theme-mode');
    }

    const { Title } = Typography;
    const switchMode = () => {
        const body = document.body;
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
            setIsDarkMode(false);
        } else {
            body.setAttribute('theme-mode', 'dark');
            setIsDarkMode(true);
        }
    };

    if (checkLoggedIn()) {
        React.useEffect(() => {
            let ignore = false;
            const func = async () => {
                const response = await fetch('/api/user/info');
                const responseData: UserInfo = await response.json();
                setUserAvatar(responseData.data.avatar_path);
            };

            if (!ignore) func();
            return () => {
                ignore = true;
            };
        }, []);
        userComponent = (
            <Dropdown
                position="bottomRight"
                render={
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => window.location.assign('/space.html')}>个人空间</Dropdown.Item>
                        <Dropdown.Item onClick={() => window.location.assign('/userInfo.html')}>个人信息</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={logoutEvent}>登出</Dropdown.Item>
                    </Dropdown.Menu>
                }
            >
                <Avatar size={'small'} border={true} src={userAvatar} style={{ margin: 8 }}>
                    BD
                </Avatar>
            </Dropdown>
            // <NavDropdown title="用户" align={'end'}>
            //     <NavDropdown.Item href="/space.html" target="_blank">
            //         个人空间
            //     </NavDropdown.Item>
            //     <NavDropdown.Item href="/userInfo.html" target="_blank">
            //         个人信息
            //     </NavDropdown.Item>
            //     <NavDropdown.Divider />
            //     <NavDropdown.Item onClick={logoutEvent}>登出</NavDropdown.Item>
            // </NavDropdown>
        );
    } else {
        userComponent = (
            <Text heading={6} style={{ margin: 8 }} link={{ href: '/login.html' }}>
                登录
            </Text>
        );
    }

    function selectKey(key) {
        if (key.itemKey === 'Main') {
            window.location.assign('/');
        } else if (key.itemKey === 'Discover') {
        } else if (key.itemKey === 'About') {
            window.location.assign('/about.html');
        }
    }

    // const [searchText, setSearchText] = useState('');

    return (
        <div style={{ width: '100%' }}>
            <Nav
                mode={'horizontal'}
                items={[
                    { itemKey: 'Main', text: '主页' },
                    { itemKey: 'Discover', text: '发现' },
                    { itemKey: 'About', text: '关于' },
                ]}
                onSelect={key => selectKey(key)}
                header={{
                    logo: <Avatar src={require('../static/logo.png')} />,
                }}
                footer={
                    <>
                        {/*搜索服务表单*/}
                        <Form
                            render={({ formState, formApi, values }) => (
                                <>
                                    <Form.Input model={values} prefix={<IconSearch />} style={{ width: 180 }} />
                                </>
                            )}
                            layout="horizontal"
                        ></Form>
                        {/*<Input model={searchText} prefix={<IconSearch />} showClear></Input>*/}

                        {userComponent}
                        <p />

                        <Dropdown
                            position="bottomRight"
                            render={
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => window.location.assign('#')}>TurboWarp</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => window.location.assign('#')}>
                                        Python 基础
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => window.location.assign('#')}>
                                        Python 海龟
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => window.location.assign('#')}>
                                        Python 本地
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => window.location.assign('#')}>C++</Dropdown.Item>
                                </Dropdown.Menu>
                            }
                        >
                            <Title heading={6} style={{ margin: 8 }}>
                                创作
                            </Title>
                        </Dropdown>

                        <p></p>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Title heading={6} style={{ margin: 8 }}>
                                {isDarkMode ? '深色模式' : '浅色模式'}
                            </Title>
                            <Switch checked={isDarkMode} onChange={switchMode} aria-label="a switch for demo" />
                        </div>
                    </>
                }
            />
        </div>
        // <Navbar expand="lg" className="bg-body-tertiary shadow">
        //     <Container>
        //         <Navbar.Brand href="/">
        //             <img src={require('../static/logo.png')} width={190} height={37}></img>
        //         </Navbar.Brand>
        //
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="me-auto">
        //                 <Nav.Link href="/">主页</Nav.Link>
        //                 <Nav.Link href="#">发现</Nav.Link>
        //                 <Nav.Link href="/about.html">关于</Nav.Link>
        //             </Nav>
        //
        //             <div style={{ display: 'flex', alignItems: 'center' }}>
        //                 <Title heading={6} style={{ margin: 8 }}>
        //                     {open ? '深色模式' : '浅色模式'}
        //                 </Title>
        //                 <Switch checked={open} onChange={switchMode} aria-label="a switch for demo" />
        //             </div>
        //
        //             <Nav className="ms-auto">
        //                 搜索服务表单
        //                 <Form role="search" action="https://code.xueersi.com/search-center" className="me-2">
        //                     <Form.Control type="search" placeholder="搜索" className=" mr-sm-2" name="keyword" />
        //                 </Form>
        //
        //                 {userComponent}
        //
        //                 <NavDropdown title="创作" align={'end'}>
        //                     <NavDropdown.Item href="#">TurboWarp</NavDropdown.Item>
        //                     <NavDropdown.Divider />
        //                     <NavDropdown.Item href="#">Python 基础</NavDropdown.Item>
        //                     <NavDropdown.Item href="#">Python 海龟</NavDropdown.Item>
        //                     <NavDropdown.Item href="#">Python 本地</NavDropdown.Item>
        //                     <NavDropdown.Divider />
        //                     <NavDropdown.Item href="#">C++</NavDropdown.Item>
        //                 </NavDropdown>
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
    );
};

export default NavbarComponent;
