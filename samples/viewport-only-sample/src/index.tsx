import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { DeveloperHarness } from '@bentley/itwinjs-sandbox-harness';
import { getViewportOnlySpec } from 'code/sampleSpec';

ReactDOM.render(
  <React.StrictMode>
    <DeveloperHarness spec={getViewportOnlySpec()}></DeveloperHarness>
  </React.StrictMode>,
  document.getElementById('root')
);
