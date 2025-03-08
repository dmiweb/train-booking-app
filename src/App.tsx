import { Header, Logo } from './components';
import "./assets/css/normalize.css"
import './App.css';

const App = () => {
  return (

    <Header>
      <div className='header__container-logo'>
        <Logo />
      </div>
    </Header>

  )
}

export default App;
