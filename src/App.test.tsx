import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';
import { MenuProvider } from './context/MenuContext';

test('renders app header', () => {
  const html = ReactDOMServer.renderToString(
    <MenuProvider>
      <App />
    </MenuProvider>
  );
  expect(html).toMatch(/Crunch Time/i);
});
