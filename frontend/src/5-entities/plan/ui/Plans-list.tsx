import { IPlan } from '@Entities/plan/model/types'
import { PlansListItem } from '@Entities/plan/ui/Plans-list-item'
import clsx from 'clsx'
import { FC } from 'react'

interface PlansListProps {
  plans?: IPlan[]
}

export const PlansList: FC<PlansListProps> = ({ plans = [] }) => {
  return (
    <ul
      className={clsx(
        'p-4 grid gap-4',
        'grid-cols-1',
        'sm:grid-cols-2',
        'lg:grid-cols-3',
        'xl:grid-cols-4',
      )}
    >
      {plans.map((plan) => (
        <PlansListItem key={plan.title} plan={plan} />
      ))}
    </ul>
  )
}
