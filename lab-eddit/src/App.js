import React, {useReducer} from 'react';//Global-state: 5º- importar o useReducer
import Routes from './routes'
import styled from 'styled-components';

//Global-state: 6º- importar os contexts
import FeedContext from './contexts/FeedContext';
import LoginContext from './contexts/LoginContex';

//Global-state: 7º- importar o reducer e o initialState
import {storeReducer, initialState} from './reducers/store'; 

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

function App() {
  //Global-state: 8º- criar o estado global utilizando o reducer
  const [state, dispatch] = useReducer(storeReducer, initialState)
  
  return (
    /* Global-state: 9º- envolver os componentes e as rotas nos contexts */
    <LoginContext.Provider value={{ userInfos: state.userInfos, dispatch: dispatch }}> 
      <FeedContext.Provider value={{ feedInfos: state.feedInfos, dispatch: dispatch }}>
        <AppContainer>
          <Routes/>
        </AppContainer>
      </FeedContext.Provider> 
    </LoginContext.Provider>
  )
}
export default App;
