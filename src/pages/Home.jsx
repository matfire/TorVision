import React, { useState } from 'react'
import { requestPermission, sendNotification } from '../utils/notifications'


export default () => {
  const [url, setUrl] = useState("")
  const [file, setFile] = useState()
  return (
    <div className="h-100 w-100">
      <h1 className="text-center text-6xl">Torvision</h1>
      <p className="text-center text-xl">Simply watch it</p>
      <div className="w-100 mx-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="magnet">
          Magnet Url
      </label>
        <input onChange={(ev) => setUrl(ev.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="magnet" type="text" placeholder="Magnet Url" />
      </div>
      <div className="w-100 flex flex-row mt-10 justify-center">
        <div className="">
          <button className="bg-customBlue-500 hover:bg-customBlue-700 text-white font-bold py-2 px-4 rounded" onClick={async() => {
            try {
              requestPermission()
              sendNotification("Alrighty", "you opted in")
            } catch (error) {
              alert("permission denied")
            }
          }}>Go</button>
        </div>
      </div>
    </div>
  )
}