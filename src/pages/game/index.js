
import React from 'react';
import { createRoot } from 'react-dom/client';

import GamePage from './App'
import 'styles/main.css'

// render
const root = createRoot(document.getElementById('root'));
root.render(<GamePage/>);