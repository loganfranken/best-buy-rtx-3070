import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Application from './Application';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Application />
    </Provider>,
    document.getElementById('root')
)