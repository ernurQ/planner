import { EventClickArg } from '@fullcalendar/core'
import daygridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import { FC } from 'react'

import { INote } from '@Entities/note'
import { ITask } from '@Entities/task'

interface IProps {
  events: (INote | ITask)[]
}

export const EventsCalendar: FC<IProps> = ({ events }) => {
  const onEventClick = (args: EventClickArg) => {
    console.log(args.event.id)
    console.log(args.event.toPlainObject().extendedProps.isDone === undefined)
  }

  return (
    <FullCalendar
      plugins={[daygridPlugin]}
      initialView='dayGridMonth'
      events={events}
      eventClick={onEventClick}
      aspectRatio={2.5}
      headerToolbar={{
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek',
      }}
    />
  )
}

// TODO: disable next button if there is no events next month
// TODO: on event click open modal
