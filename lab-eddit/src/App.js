import React from 'react';
import Routes from './routes'
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <AppContainer>
      <Routes/>
    </AppContainer>
  )
}

export default App;
