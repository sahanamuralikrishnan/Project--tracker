'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function ErrorPage({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong! Please try again later</h2>
      <button
        onClick={
          // Attempt to recover by re-rendering the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}