import './App.css'
import { CheckSquare2, SquareCode, Square } from 'lucide-react'
import { Button } from '@/components/ButtonCn'
import { ButtonCva } from '@/components/ButtonCva'

function App() {
  return (
    <div className="flex flex-col justify-center items-center bg-white min-h-screen">
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <SquareCode className="w-6 h-6" />
          <h1 className="font-medium text-gray-900 text-xl">
            Vite: React w/ Tailwind v4
          </h1>
        </div>
        <p className="mb-3 text-gray-600 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="my-1">
          <h2 className="my-2 font-medium text-gray-800 text-sm">
            Use `cn: clsx and tailwind-merge` function button.
          </h2>
          <Button className="" active>
            <CheckSquare2 className="mr-1 w-4 h-4" />
            Button w/ active
          </Button>
          {` `}
          <Button className="" disabled>
            <Square className="mr-1 w-4 h-4" />
            Button w/o active
          </Button>
        </div>
        <div className="my-1">
          <h2 className="my-2 font-medium text-gray-800 text-sm">
            Use `cn` and `cva: class-variance-authority` button.
          </h2>
          <ButtonCva className="" size="sm">
            <CheckSquare2 className="mr-1 w-4 h-4" />
            Button w/ active
          </ButtonCva>
          {` `}
          <ButtonCva className="" intent="secondary" size="sm" disabled>
            <Square className="mr-1 w-4 h-4" />
            Button w/o active
          </ButtonCva>
        </div>
      </div>
    </div>
  )
}

export default App
