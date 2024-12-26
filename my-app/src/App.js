import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayOut from './Views/LayOut';
import Auth from './Views/Auth';
import Home from './Views/Home';
import Admin from './Views/Admin';
import Settings from './Views/Settings';
import Index from './Views/Index'
import NotExcluded from './Views/NotExcluded';
import Excluded from './Views/Excluded';
import PrivateRoutes from './Components/Utils/PrivateRoutes'; 
import Search from './Views/Search';
import Debitor from './Views/Mine';
import CallCenter from './Views/CallCenter';
import CallCenterMines from './Views/CallCenterMines';

const App = () => {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/Auth" element={<Auth />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<LayOut />}>
              <Route index element={<Index />} />
              <Route path="/Channel/:channelId/Calls/NotExcluded" element={<NotExcluded />} />
              <Route path="/Channel/:channelId/Calls/Excluded" element={<Excluded />} />
              <Route path="/Channel/:channelId/Calls/Mine" element={<Debitor />} />
              <Route path="/Channel/:channelId/CallCenter" element={<CallCenter />} />
              <Route path="/Channel/:channelId/CallCenter/Mine" element={<CallCenterMines />} />

              <Route path="/Admin" element={<Admin />} />
              <Route path="/Index" element={<Index />} />
              <Route path="/Settings" element={<Settings />} />
              <Route path="/Channel/:channelId/Calls/Search" element={<Search />} />
              <Route path="/Channel/:channelId/Calls" element={<Home />} /> 
            </Route>
          </Route>
      </Routes>
    </BrowserRouter>

    );
}

export default App;