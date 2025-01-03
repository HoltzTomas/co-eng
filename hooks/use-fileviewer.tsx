"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import { File } from "@/lib/db/types"

const actionTypes = {
  OPEN_FILE: "OPEN_FILE",
  CLOSE_FILE: "CLOSE_FILE",
} as const

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["OPEN_FILE"]
      file: File
    }
  | {
      type: ActionType["CLOSE_FILE"]
    }

interface State {
  file?: File
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "OPEN_FILE":
      return {
        ...state,
        file: action.file,
      }
    case "CLOSE_FILE":
      return {
        ...state,
        file: undefined,
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { file: undefined }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function fileViewer(file: File) {
  const close = () => dispatch({ type: "CLOSE_FILE" })

  dispatch({
    type: "OPEN_FILE",
    file
  })

  return {
    close
  }
}

function useFileViewer() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    fileViewer,
    close: () => dispatch({ type: "CLOSE_FILE" }),
  }
}

export { useFileViewer, fileViewer }