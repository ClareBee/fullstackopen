import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    console.log('event', event.target.value)
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// module can have several named exports
// export const useAnotherHook = () => {
//   // ...
// }
