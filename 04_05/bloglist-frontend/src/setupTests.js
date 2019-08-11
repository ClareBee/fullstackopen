import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

let currentUser = {}

const localStorageMock = {
  setItem: (key, item) => {
    currentUser[key] = item
  },
  getItem: (key) => currentUser[key],
  clear: currentUser = {}
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// silencing console error
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
