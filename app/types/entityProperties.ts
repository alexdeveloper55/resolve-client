export interface EntityCategory {
    [attribute: string]: string | number | boolean | null
}

export interface EntityProperties {
  id: string
  name: string
  properties: {
    [category: string]: EntityCategory
  }
}
