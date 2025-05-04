import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'
import { useNavigate } from 'react-router-dom'
import { Liability } from '../../types'

type LiabilityDropdownMenuProps = {
  id: Liability['_id']
}

export default function LiabilityDropdownMenu({id} : LiabilityDropdownMenuProps) {
    const navigate = useNavigate()

    return (
      <div className="w-52 text-right">
        <Menu __demoMode={false}>
          <MenuButton className="text-white font-bold cursor-pointer">
            . . .
          </MenuButton>
  
          <MenuItems
            transition
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-white/5 bg-orange-900 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 "
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 cursor-pointer" onClick={() => navigate(`?editLiability=${id}`)}>
                <PencilIcon className="size-4 fill-white/30" />
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10 cursor-pointer" onClick={() => navigate(`?deleteLiability=${id}`)}>
                <TrashIcon className="size-4 fill-white/30" />
                Delete
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    )
}
