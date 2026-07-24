import { useState } from "react"
import { NavLink } from "react-router-dom"
import {
  RiHome5Line, RiHome5Fill,
  RiCompassLine, RiCompassFill,
  RiFireLine, RiFireFill,
  RiTimeLine, RiTimeFill,
  RiThumbUpLine, RiThumbUpFill,
  RiPlayListLine, RiPlayListFill,
  RiUserFollowLine, RiUserFollowFill,
  RiDashboardLine, RiDashboardFill,
  RiVideoAddLine,
  RiMenuFoldLine, RiMenuUnfoldLine,
} from "react-icons/ri"
const mainNav = [
  { label: "Home",     path: "/",          icon: RiHome5Line,       activeIcon: RiHome5Fill },
  { label: "Explore",  path: "/explore",   icon: RiCompassLine,     activeIcon: RiCompassFill },
  { label: "Trending", path: "/trending",  icon: RiFireLine,        activeIcon: RiFireFill },
]

const youNav = [
  { label: "History",       path: "/history",      icon: RiTimeLine,       activeIcon: RiTimeFill },
  { label: "Liked videos",  path: "/liked-videos", icon: RiThumbUpLine,    activeIcon: RiThumbUpFill },
  { label: "Playlists",     path: "/playlists",    icon: RiPlayListLine,   activeIcon: RiPlayListFill },
  { label: "Subscriptions", path: "/subscriptions",icon: RiUserFollowLine, activeIcon: RiUserFollowFill },
]

const creatorNav = [
  { label: "Creator Studio", path: "/studio", icon: RiDashboardLine, activeIcon: RiDashboardFill },
]

function NavItem({ item, collapsed }) {
  return (
    <NavLink
      to={item.path}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) => `
        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
        transition-all duration-150 group relative
        ${isActive
          ? "bg-amber-500/10 text-amber-400"
          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
        }
        ${collapsed ? "justify-center px-0" : ""}
      `}
    >
      {({ isActive }) => (
        <>
          <item.icon className={`shrink-0 text-[18px] ${isActive ? "text-amber-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
          {!collapsed && <span className="truncate">{item.label}</span>}
          {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-amber-400" />}
          {collapsed && (
            <span className="absolute left-full ml-3 px-2 py-1 rounded-md text-xs bg-zinc-800 text-zinc-100 opacity-0 pointer-events-none group-hover:opacity-100 whitespace-nowrap z-50 transition-opacity duration-150">
              {item.label}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

function SectionLabel({ label, collapsed }) {
  if (collapsed) return <div className="my-2 border-t border-white/5" />
  return (
    <p className="px-3 pt-5 pb-1 text-[10px] font-semibold tracking-widest text-zinc-600 uppercase">
      {label}
    </p>
  )
}

export default function Sidebar() {
  const [collapsed, setCollapsed]   = useState(false)
  const [activePath, setActivePath] = useState("/")

  return (
    <aside
      className={`
        sticky top-0 flex flex-col h-screen bg-[#0d0d0d] border-r border-white/[0.06]
        transition-all duration-300 ease-in-out shrink-0
        ${collapsed ? "w-[64px]" : "w-[220px]"}
      `}
    >

      <div className={`flex items-center h-14 px-4 border-b border-white/[0.06] ${collapsed ? "justify-center" : "gap-2"}`}>
        <span className="text-amber-400 text-xl leading-none">▶</span>
        {!collapsed && (
          <span className="text-white font-semibold text-base tracking-tight">
            Creator<span className="text-amber-400">Hub</span>
          </span>
        )}
      </div>

      
      <nav className={`flex-1 overflow-y-auto overflow-x-hidden py-3 ${collapsed ? "px-2" : "px-3"}`}>

        <div className="flex flex-col gap-0.5">
          {mainNav.map(item => (
            <NavItem
              key={item.path}
              item={item}
              activePath={activePath}
              collapsed={collapsed}
              onClick={setActivePath}
            />
          ))}
        </div>

        <SectionLabel label="You" collapsed={collapsed} />
        <div className="flex flex-col gap-0.5">
          {youNav.map(item => (
            <NavItem
              key={item.path}
              item={item}
              activePath={activePath}
              collapsed={collapsed}
              onClick={setActivePath}
            />
          ))}
        </div>

        <SectionLabel label="Creator" collapsed={collapsed} />
        <div className="flex flex-col gap-0.5">
          {creatorNav.map(item => (
            <NavItem
              key={item.path}
              item={item}
              activePath={activePath}
              collapsed={collapsed}
              onClick={setActivePath}
            />
          ))}
        </div>
      </nav>

      <div className={`sticky bottom-0 bg-[#0d0d0d] px-3 pb-4 pt-2 border-t border-white/[0.06] ${collapsed ? "px-2" : ""}`}>
        <button
          onClick={() => setActivePath("/upload")}
          title={collapsed ? "Upload video" : undefined}
          className={`
            w-full flex items-center gap-2 justify-center px-3 py-2.5 rounded-xl
            bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-semibold
            transition-colors duration-150 group relative
          `}
        >
          <RiVideoAddLine className="text-[18px] shrink-0" />
          {!collapsed && <span>Upload video</span>}

          {collapsed && (
            <span className="
              absolute left-full ml-3 px-2 py-1 rounded-md text-xs bg-zinc-800 text-zinc-100
              opacity-0 pointer-events-none group-hover:opacity-100 whitespace-nowrap z-50
              transition-opacity duration-150
            ">
              Upload video
            </span>
          )}
        </button>
      </div>

     
      <button
        onClick={() => setCollapsed(prev => !prev)}
        className="
          absolute -right-3 top-[52px] z-10
          w-6 h-6 rounded-full bg-zinc-800 border border-white/10
          flex items-center justify-center text-zinc-400
          hover:bg-zinc-700 hover:text-white transition-colors duration-150
        "
      >
        {collapsed
          ? <RiMenuUnfoldLine className="text-[13px]" />
          : <RiMenuFoldLine   className="text-[13px]" />
        }
      </button>
    </aside>
  )
}
