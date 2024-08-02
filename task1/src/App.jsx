import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './components/Table'
import CreateModal from './components/CreateModal'
import UpdateModal from './components/CreateModal'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>Hello World</h2>
      {/* <div className='w-100'><button className='bg-blue-300 rounded-xl px-4' >Create Product</button></div> */}
      <Table/>
      {/* <CreateModal/> */}
      {/* <UpdateModal/> */}
    </>
  )
}

export default App
