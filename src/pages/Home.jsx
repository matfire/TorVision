import React, { useState } from 'react'


export default () => {
    const [url, setUrl] = useState("")
    const [file, setFile] = useState()
    return (
        <div className="h-100 w-100">
            <h1 className="text-center text-6xl">Torvision</h1>
            <p className="text-center text-xl">Simply watch it</p>
            <div className="w-100 mx-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="magnet">
        Magnet Url
      </label>
      <input onChange={(ev) => setUrl(ev.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="magnet" type="text" placeholder="Magnet Url"/>
          </div>
          <div className="w-100 flex flex-row items-center mt-10 mx-4">
            <button className="self-center">Send</button>
          </div>
        </div>
    )
}