import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SidebarProps } from '@/types' 
import "../../styles/Sidebar.scss"

export function Sidebar({ 
  items, 
  onItemSelect, 
  side, 
  header,
  className 
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState<string>('')

  const handleItemClick = (itemName: string) => {
    setActiveItem(itemName)
    onItemSelect(itemName)
  }

  return (
    <div 
      className={cn(
        'sidebar',
        isCollapsed ? 'closed' : 'open',
        side === 'right' ? 'border-l' : 'border-r',
        className
      )}
    >
      <div className="sidebar-content">
        {header && (
          <div className="sidebar-header">
            {header}
          </div>
        )}
        
        <nav className="sidebar-items">
          {items.map((item, index) => (
            <div key={index} className="department-group">
              {item.items ? (
                <>
                  <div className="group-header">
                    {item.icon}
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>
                  {item.items.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      onClick={() => handleItemClick(subItem.name)}
                      className={cn(
                        "sidebar-item",
                        activeItem === subItem.name && "active"
                      )}
                    >
                      {subItem.icon}
                      {!isCollapsed && <span>{subItem.name}</span>}
                    </div>
                  ))}
                </>
              ) : (
                <div
                  onClick={() => handleItemClick(item.name)}
                  className={cn(
                    "sidebar-item",
                    activeItem === item.name && "active"
                  )}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.name}</span>}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="sidebar-toggle"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {side === 'left' ? 
          (isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />) :
          (isCollapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />)
        }
      </button>
    </div>
  )
}