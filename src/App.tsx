import './App.css'
import { SquareDashed } from 'lucide-react'

function App() {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      <div className="flex items-center gap-2 mt-4">
        <SquareDashed className="w-6 h-6" />
        <h1 className="font-bold text-2xl">Hello world!</h1>
      </div>
    </div>
  )
}

export default App
