import './App.css';
import ListComponent from './Components/ListComponent';
import HeaderComponent from './Components/HeaderComponent';
import FooterComponent from './Components/FooterComponent';

function App() {
  return (
    <div>
      <HeaderComponent/>
      <div className="App">
        <ListComponent/>
      </div>
      <FooterComponent/>
    </div>
  );
}

export default App;
