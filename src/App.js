
import React from "react";
import Container from "./Components/Container";
import {AuthContextProvider} from './context/AuthContext'
function App() {
  return (
    <AuthContextProvider >
          <Container/>
    </AuthContextProvider>

  );
}

export default App;
