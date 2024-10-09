import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"
import Image from "next/image"
import { IUser } from "@/app/types/IUser"
import { logout } from "../../app/utils/api"

interface HeaderProps {
  user: IUser
}

export function Header({ user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-stone-950">
      <div className="w-full flex justify-between">
        <div className="flex items-center space-x-4">
          <Image src="/images/logo.png" alt="Pokemon Logo" width={150} height={150} />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-lg text-white">Treinador: {user.username}</span>
          <div className="relative">
            <Avatar
              className="w-12 h-12 border-2 border-amber-600 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AvatarImage src="/images/ash.png" alt={user.username} />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
            {isMenuOpen && (
              <div className="bg-amber-200 absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li className="px-4 py-2 text-black cursor-pointer" onClick={() => logout()}>Sair</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>

  )
}