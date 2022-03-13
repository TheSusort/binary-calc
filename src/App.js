import './App.css'
import Calculator from './components/Calculator'
import config from './calculator-config'

function App() {
    return (
        <div className="flex items-center justify-center w-screen h-screen text-center">
            <Calculator config={config} />
        </div>
    )
}

export default App
