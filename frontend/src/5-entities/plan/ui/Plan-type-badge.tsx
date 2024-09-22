import clsx from 'clsx'
import { FC } from 'react'

interface Props {
  isPrivate: boolean
  isTemplate: boolean
}

export const PlanTypeBadge: FC<Props> = ({ isPrivate, isTemplate }) => (
  <span
    className={clsx(
      'text-xs rounded text-center items-center',
      'px-2 py-1 whitespace-nowrap',
      {
        'bg-blue-100 text-blue-700': isPrivate,
        'bg-green-100 text-green-700': !isPrivate,
      },
    )}
  >
    {isPrivate ? 'private' : 'public'}
    {isTemplate && ' template'}
  </span>
)
