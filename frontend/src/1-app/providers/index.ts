import compose from 'compose-function'

import { withRouter } from './router'
import { withStore } from './store'

export const withProviders = compose(withRouter, withStore)
