import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import NavBar from './components/navbar';
import Rockets from './components/rockets';
import Missions from './components/missions';
import Profile from './components/myProfile';
import { ToastProvider } from './components/toast';
import store from './redux/configureStore';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ToastProvider>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Rockets />} />
            <Route exact path="/missions" element={<Missions />} />
            <Route exact path="/myprofile" element={<Profile />} />
          </Routes>
        </ToastProvider>
      </Provider>
    </div>

  );
}

export default App;
