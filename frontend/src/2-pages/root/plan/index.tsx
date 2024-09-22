import { Link, useParams } from 'react-router-dom'

import { PlanTypeBadge, useGetPlanQuery } from '@Entities/plan'
import { EventsCalendar } from '@Features/events-calendar'
import { routes } from '@Shared/config'
import clsx from 'clsx'

const Plan = () => {
  const { ownerName, planTitle } = useParams()
  if (!ownerName || !planTitle) throw new Error()

  const { data, isLoading } = useGetPlanQuery({ ownerName, planTitle })

  // TODO: add spinner
  if (isLoading || !data) return null

  const { plan } = data

  return (
    <div className='container mx-auto py-5 px-10'>
      <div
        className={clsx(
          'bg-white shadow-md rounded-lg border border-gray-200',
          'p-4 mb-10',
          'grid gap-2 grid-cols-1 items-start',
        )}
      >
        <h1 className='text-2xl font-bold mb-2'>{plan.title}</h1>
        <h2>
          Owner:
          <Link
            to={routes.userProfile(ownerName)}
            className='text-gray-500 mb-4'
          >
            {plan.ownerName}
          </Link>
        </h2>

        <div>
          <PlanTypeBadge
            isPrivate={plan.isPrivate}
            isTemplate={plan.isTemplate}
          />
        </div>

        <div
          className={clsx({
            hidden: plan.description === '',
          })}
        >
          <p
            className={clsx(
              'text-sm text-gray-600 rounded bg-gray-100 px-2 py-1 inline-block',
            )}
          >
            {plan.description}
          </p>
        </div>

        <p className='text-sm text-gray-400'>
          Created on: {new Date(plan.createdAt).toLocaleDateString()}
        </p>
      </div>
      <EventsCalendar events={[...plan.notes, ...plan.tasks]} />
    </div>
  )
}

export default Plan
