import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from './store';

import Application from './Application';

ReactDOM.render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('root')
)