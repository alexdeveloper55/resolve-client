import { useState } from 'react'

interface Props {
  category: string,
  attributes: {
    [attribute: string]: string | number | boolean | null
  }
}

const CollapsibleMenu: React.FC<Props> = ({ category, attributes }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div>
      <button onClick={toggleOpen}>
        {isOpen ? <span>▼</span> : <span>▶</span>} {category}
      </button>
      {isOpen && (
        <ul>
          {Object.entries(attributes).map(([attribute, value]) => {
            return (
              <li key={attribute} className='ps-10'>
                <strong>{attribute}</strong>: {value ? value : 'N/A'}
              </li>
            )
          }
          )}
        </ul>
      )}
    </div>
  )
}

export default CollapsibleMenu