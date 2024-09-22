import { FC } from 'react'

import { routes } from '@Shared/config'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { IPlan } from '../model/types'
import { PlanTypeBadge } from './Plan-type-badge'

interface Props {
  plan: IPlan
}

export const PlansListItem: FC<Props> = ({ plan }) => {
  const descriptionMaxLength = 75
  if (plan.description.length >= descriptionMaxLength) {
    plan.description = `${plan.description.slice(0, descriptionMaxLength)}...`
  }
  return (
    <li
      className={clsx(
        'bg-white shadow-md rounded-lg border border-gray-200',
        'p-4',
        'grid gap-2 grid-cols-1 items-start',
      )}
    >
      <Link
        className={clsx('grid grid-cols-1')}
        to={routes.plan(plan.ownerName, plan.title)}
      >
        <h2 className={clsx('text-lg text-blue-500')}>
          <span>{plan.ownerName}/</span>
          <span>{plan.title}</span>
        </h2>
      </Link>

      <div>
        <PlanTypeBadge
          isPrivate={plan.isPrivate}
          isTemplate={plan.isTemplate}
        />
      </div>

      <div>
        <p
          className={clsx(
            'text-sm text-gray-600 rounded bg-gray-100 px-2 py-1 inline-block',
            {
              hidden: plan.description === '',
            },
          )}
        >
          {plan.description}
        </p>
      </div>
    </li>
  )
}
