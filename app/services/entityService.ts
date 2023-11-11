const API_URL = process.env.NEXT_PUBLIC_API_URL

export const fetchEntityProperties = async (entityId: string) => {
  try {
    const response = await fetch(`${API_URL}/properties/${entityId}`)
    if (!response.ok) {
      throw new Error(`Error fetching entity properties. Status: ${response.status}`)
    }
    const data = await response.json()
    return data
  }
  catch (error) {
    console.error("Error fetching entity properties: ", error)
    throw error
  }
}