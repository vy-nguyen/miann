import * as React from 'react';
import ReactDOM from 'react-dom';

import { SiteInfo } from '@/types';

import './index.css';
import AppMain from './Main';
import reportWebVitals from './reportWebVitals';
import { initMocks } from './test/server';

initMocks();

const getSiteInfo = (): SiteInfo => {
  const name = document.head.querySelector('meta[name="siteName"]') as HTMLMetaElement;
  const path = document.head.querySelector('meta[name="sitePath"]') as HTMLMetaElement;
  const title = document.head.querySelector('meta[name="siteTitle"]') as HTMLMetaElement;
  const domain = document.head.querySelector('meta[name="siteDomain"]') as HTMLMetaElement;
  const unknown = 'unknown';

  return {
    name: name ? name.content : unknown,
    path: path ? path.content : unknown,
    title: title ? title.content : unknown,
    domain: domain ? domain.content : unknown,
  };
};

ReactDOM.render(
  <React.StrictMode>
    <AppMain siteInfo={getSiteInfo()} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
