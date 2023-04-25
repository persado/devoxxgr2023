import React from 'react';
import logo from './logo-persado-black.svg'
import './App.css';
import {Layout, Row, Col} from 'antd';
import Main from "./components/Main";

const {Header, Content, Footer} = Layout;


function App() {
  return (
      <Layout className="site-layout">

        <Header style={{textAlign: 'center', color: "white"}}> Join the persado contest! </Header>

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
          <Row>
            <a href="https://www.persado.com/privacy-policy/" target="_blank">Privacy Policy</a>
          </Row>
          <Row>
            <a href="https://www.persado.com/gdpr/" target="_blank">GDPR Information</a>
          </Row>
        </Footer>

      </Layout>


  );
}

export default App;
