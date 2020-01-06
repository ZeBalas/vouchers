import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Provider } from './services/context';
import LoadVouchers from './pages/LoadVouchers';
import PrintVoucher from './pages/PrintVoucher';

const App = () => {
    return (
        <Provider>
            <BrowserRouter>
                <Route path="/" exact component={PrintVoucher} />
                <Route path="/load-voucher" exact component={LoadVouchers} />
            </BrowserRouter>
        </Provider>
    );
};

export default App;