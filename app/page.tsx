"use client"

import { useState } from "react"
import { fetchEntityProperties } from "./services/entityService"
import CollapsibleMenu from "./components/CollapsibleMenu"
import { EntityProperties } from "./types/entityProperties"

export default function Home() {
  const [entityId, setEntityId] = useState('')
  const [entityProperties, setEntityProperties] = useState<EntityProperties | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntityId(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const properties = await fetchEntityProperties(entityId)
      setEntityProperties(properties)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex flex-col">
      <form className="py-5 text-black flex flex-col items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter entity ID"
          className="mb-4 mx-4 p-2 border border-gray-300 rounded"
          onChange={handleInputChange}
          value={entityId}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>

      {isLoading && <div className="text-center">Loading...</div>}

      {
        entityProperties && (
          <div className="w-1/2 mx-auto shadow-lg rounded-lg overflow-hidden mb-10">
            <h2 className="bg-blue-800 text-xl text-center p-4">{entityProperties.name}</h2>
            {Object.entries(entityProperties.properties).map(([name, attributes]) => {
              return (
                <div className="bg-slate-600 p-3">
                  <CollapsibleMenu key={name} category={name} attributes={attributes} />
                </div>
              )
            })}
          </div>
        )
      }

    </main >
  )
}
