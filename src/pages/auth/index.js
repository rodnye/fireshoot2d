
import React from 'react';
import { createRoot } from 'react-dom/client';

import AuthPage from './App'
import 'bootstrap/dist/css/bootstrap-utilities.css'
import 'styles/main.css'


// render
const root = createRoot(document.getElementById('root'));
root.render(<AuthPage/>);