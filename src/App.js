import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import {Toaster} from 'react-hot-toast';
import React, { Component }  from 'react';

function App() {
  return (
   <>
     <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                ></Toaster>
   <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route
                        path="/editor/:roomId"
                        element={<EditorPage />}
                    ></Route>
                </Routes>
            </BrowserRouter>
   </>
  );
}

export default App;
