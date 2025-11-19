import React from 'react'

import * as persisted from '#/state/persisted'

type StateContext = persisted.Schema['showExternalShareButtons']
type SetContext = (v: persisted.Schema['showExternalShareButtons']) => void

const stateContext = React.createContext<StateContext>(
  persisted.defaults.showExternalShareButtons,
)
const setContext = React.createContext<SetContext>(
  (_: persisted.Schema['showExternalShareButtons']) => {},
)

export function Provider({children}: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState(
    persisted.get('showExternalShareButtons'),
  )

  const setStateWrapped = React.useCallback(
    (
      showExternalShareButtons: persisted.Schema['showExternalShareButtons'],
    ) => {
      setState(showExternalShareButtons)
      persisted.write('showExternalShareButtons', showExternalShareButtons)
    },
    [setState],
  )

  React.useEffect(() => {
    return persisted.onUpdate(
      'showExternalShareButtons',
      nextShowExternalShareButtons => {
        setState(nextShowExternalShareButtons)
      },
    )
  }, [setStateWrapped])

  return (
    <stateContext.Provider value={state}>
      <setContext.Provider value={setStateWrapped}>
        {children}
      </setContext.Provider>
    </stateContext.Provider>
  )
}

export function useShowExternalShareButtons() {
  return React.useContext(stateContext)
}

export function useSetShowExternalShareButtons() {
  return React.useContext(setContext)
}
