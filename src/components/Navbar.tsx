import React, { useState } from 'react';
// import { Container, Nav, Navbar, NavDropdown, Form } from 'react-bootstrap';
import { checkLoggedIn } from '../utils.ts';
import { Switch, Typography } from '@douyinfe/semi-ui';
import { Nav, Avatar, Dropdown } from '@douyinfe/semi-ui';
import { Space } from '@douyinfe/semi-ui';

const NavbarComponent = () => {
    const logoutEvent = async () => {
        await fetch('/passport/logout');
        location.reload();
    };
    let userComponent: React.JSX.Element;

    const [open, setOpen] = useState(false);
    const { Title } = Typography;
    const switchMode = () => {
        const body = document.body;
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');
            setOpen(false);
        } else {
            body.setAttribute('theme-mode', 'dark');
            setOpen(true);
        }
    };

    if (checkLoggedIn()) {
        userComponent = (
            <Dropdown
                position="bottomRight"
                render={
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => console.log('个人空间')}>个人空间</Dropdown.Item>
                        <Dropdown.Item onClick={() => console.log('个人信息')}>个人信息</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={logoutEvent}>登出</Dropdown.Item>
                    </Dropdown.Menu>
                }
            >
                <Title heading={6} style={{ margin: 8 }}>
                    用户
                </Title>
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
        userComponent = <a href="/login.html">登录</a>;
    }

    return (
        <div style={{ width: '100%' }}>
            <Nav
                mode={'horizontal'}
                items={[
                    { itemKey: 'main', text: '主页' },
                    { itemKey: 'discover', text: '发现' },
                    { itemKey: 'about', text: '关于' },
                ]}
                onSelect={key => console.log(key)}
                header={{
                    logo: <Avatar src={require('../static/logo.png')} />,
                }}
                footer={
                    <>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Title heading={6} style={{ margin: 8 }}>
                                {open ? '深色模式' : '浅色模式'}
                            </Title>
                            <Switch checked={open} onChange={switchMode} aria-label="a switch for demo" />
                        </div>
                        <p>          </p>

                        {userComponent}

                        <p>      </p>
                        <Dropdown
                            position="bottomRight"
                            render={
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => console.log('TurboWarp')}>TurboWarp</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => console.log('Python 基础')}>
                                        Python 基础
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => console.log('Python 海龟')}>
                                        Python 海龟
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => console.log('Python 本地')}>
                                        Python 本地
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => console.log('C++')}>C++</Dropdown.Item>
                                </Dropdown.Menu>
                            }
                        >
                            <Title heading={6} style={{ margin: 8 }}>
                                创作
                            </Title>
                        </Dropdown>
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
