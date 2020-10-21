import './index.scss';
import React from 'react';
import { Layout } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import Header from '../../components/Header'
import Content from '../../components/Content'
import Footer from '../../components/Footer'

export default function App() {
  return <BrowserRouter>
    <Layout className="layout">
      <Header />
      <Content />
      <Footer />
    </Layout>
  </BrowserRouter>
}