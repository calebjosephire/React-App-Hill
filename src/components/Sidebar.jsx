import { useState, useCallback } from "react"

/**
 * Renders an array of strings passed in that can be filtered and added to as an
 * unordered list.
 * @returns Component
 */
export default function Sidebar({ initialMenuItems }) {
  let [newMenuItem, setNewMenuItem] = useState("")
  
  // TODO 2
  let [menuItems, setMenuItems] = useState(initialMenuItems || [])
  let [filter, setFilter] = useState("")

  let addMenuItem = useCallback(() => {
    console.log("Added menu item")

    // TODO 3
    const trimmed = newMenuItem.trim()
    if (!trimmed) return

    setMenuItems((prev) => [...prev, trimmed])
    setNewMenuItem("")
  }, [newMenuItem])

  // TODO 4
  const filteredMenuItems = (() => {
    if (!filter) return menuItems

    let regex
    try {
      regex = new RegExp(filter, "i") // case-insensitive
    } catch {
      return menuItems
    }

    return menuItems.filter((item) => regex.test(item))
  })()

  // TODO 1
  return (
    <div>
      <input
        type="text"
        id="newMenuItemValue"
        value={newMenuItem}
        onChange={(event) => setNewMenuItem(event.target.value)}
      />
      <br />
      <button onClick={addMenuItem}>
        Add Item
      </button>
      <br />
      <input
        id="filter"
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder="Filter by..."
      />
      <ul>
        {filteredMenuItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
