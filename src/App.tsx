import './App.css'
import { CodeSquare } from 'lucide-react'

function App() {
  return (
    <div className="flex flex-col justify-center items-center bg-white min-h-screen">
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <CodeSquare className="w-6 h-6" />
          <h1 className="font-medium text-gray-900 text-xl">
            Vite: React w/ Tailwind v4
          </h1>
        </div>
        <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </div>
  )
}

export default App
