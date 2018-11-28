import React from 'react'
import {createStore} from 'redux'
import counterReducer from './reducer'
import ReactDOM from 'react-dom';

const Statistiikka = ({klik}) => {
  const palautteita = store.getState()
  
  
  
  if (palautteita.good === 0 && palautteita.ok === 0 && palautteita.bad === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{palautteita.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{palautteita.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{palautteita.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{(palautteita.good - palautteita.bad)/(palautteita.good + palautteita.ok + palautteita.bad)}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{((palautteita.good + palautteita.ok)/(palautteita.good + palautteita.ok + palautteita.bad)) * 100}%</td>
          </tr>
        </tbody>
      </table>

      <button onClick={klik('ZERO')}>nollaa tilasto</button>
    </div >
  )
}

const store = createStore(counterReducer)

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({type: nappi})
    console.log(store.getState())
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka klik={this.klik}/>
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)