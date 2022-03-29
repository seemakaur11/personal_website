import create from 'zustand'

export const color = {}

export const useTheme = create((set) => ({
  darkMode: false,
  toggleDarkMode: () => set(({ darkMode }) => ({ darkMode: !darkMode })),
}))
