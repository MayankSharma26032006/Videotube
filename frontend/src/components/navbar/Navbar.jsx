import { useState, useRef, useEffect } from "react"
import {
  RiSearchLine,
  RiVideoAddLine,
  RiBellLine,
  RiArrowLeftLine,
  RiCloseLine,
  RiSettings3Line,
  RiUser3Line,
  RiLogoutBoxLine,
  RiDashboardLine,
} from "react-icons/ri"

function SearchBar({ onClose }) {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="flex items-center gap-3 flex-1 max-w-2xl mx-auto">
      <button
        onClick={onClose}
        className="text-zinc-400 hover:text-white transition-colors shrink-0"
      >
        <RiArrowLeftLine className="text-xl" />
      </button>
      <div className="flex flex-1 items-center bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-2.5 gap-3 focus-within:border-amber-500/50 transition-colors">
        <RiSearchLine className="text-zinc-500 text-[17px] shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search creators and videos..."
          className="bg-transparent flex-1 text-sm text-white placeholder:text-zinc-500 outline-none"
        />
        <button className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <RiCloseLine className="text-[17px]" />
        </button>
      </div>
    </div>
  )
}

function NotificationBadge({ count }) {
  if (!count) return null
  return (
    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-amber-500 text-zinc-950 text-[10px] font-bold flex items-center justify-center">
      {count > 9 ? "9+" : count}
    </span>
  )
}

function ProfileMenu({ onClose }) {
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const menuItems = [
    { icon: RiUser3Line,     label: "Your channel",    },
    { icon: RiDashboardLine, label: "Creator Studio",  },
    { icon: RiSettings3Line, label: "Settings",        },
  ]

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-[calc(100%+10px)] w-52 bg-zinc-900 border border-white/[0.08] rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
    >
      <div className="px-4 py-3 border-b border-white/[0.06]">
        <p className="text-sm font-medium text-white truncate">Mayank Sharma</p>
        <p className="text-xs text-zinc-500 truncate">@mayank</p>
      </div>

      <div className="py-1.5">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <item.icon className="text-[16px] shrink-0" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="py-1.5 border-t border-white/[0.06]">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/[0.05] transition-colors">
          <RiLogoutBoxLine className="text-[16px] shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [searchOpen, setSearchOpen]         = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const notificationCount                   = 3

  return (
    <header className="sticky top-0 z-40 w-full h-14 flex items-center px-4 gap-4 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/[0.06]">

      {searchOpen ? (
        <SearchBar onClose={() => setSearchOpen(false)} />
      ) : (
        <>
          <div className="flex items-center gap-3 flex-1 max-w-2xl mx-auto">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex flex-1 items-center bg-white/[0.05] border border-white/[0.07] rounded-full px-4 py-2 gap-3 hover:border-white/[0.14] transition-colors cursor-text"
            >
              <RiSearchLine className="text-zinc-500 text-[16px] shrink-0" />
              <span className="text-sm text-zinc-600 select-none">Search creators and videos...</span>
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">

            <button className="relative flex items-center justify-center w-9 h-9 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors">
              <RiVideoAddLine className="text-[19px]" />
            </button>

            <button className="relative flex items-center justify-center w-9 h-9 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors">
              <RiBellLine className="text-[19px]" />
              <NotificationBadge count={notificationCount} />
            </button>

            <div className="relative ml-1">
              <button
                onClick={() => setProfileMenuOpen(prev => !prev)}
                className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-sm font-semibold hover:bg-amber-500/30 transition-colors"
              >
                M
              </button>

              {profileMenuOpen && (
                <ProfileMenu onClose={() => setProfileMenuOpen(false)} />
              )}
            </div>
          </div>
        </>
      )}
    </header>
  )
}
