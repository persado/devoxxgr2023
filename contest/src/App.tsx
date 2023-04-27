import React from 'react';
import logo from './logo-persado-black.svg'
import './App.css';
import {Layout, Row, Col} from 'antd';
import Main from "./components/Main";

const {Header, Content, Footer} = Layout;


function App() {
    return (
        <Layout style={{ minHeight: "100vh" }}>

            <Header style={{textAlign: 'center', color: "white"}}> Persado contest </Header>

            <Content style={{background: "white"}}>
                <Main/>
            </Content>

            <Footer>
                <Row>
                    <img src={logo} alt="logo-persado"/>
                </Row>
                <Row>
                    <p>
                        The Persado Motivation AI Platform inspires each individual to engage and act.
                    </p>
                </Row>

                <Row >
                    <Col style={{paddingRight:10}}>
                        <a href="https://www.persado.com/privacy-policy/" target="_blank"
                           style={{fontSize: "small", color: "#626f7c"}}>Privacy Policy</a>
                    </Col>
                    <Col>
                        <a href="https://www.persado.com/gdpr/" target="_blank"
                           style={{fontSize: "small", color: "#626f7c"}}>GDPR Information</a>
                    </Col>
                </Row>
            </Footer>

        </Layout>


    );
}

export default App;
