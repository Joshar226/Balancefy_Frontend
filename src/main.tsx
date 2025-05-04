import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from './router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools />
      <ToastContainer 
        pauseOnHover={false}
        hideProgressBar={true}
        autoClose={1500}
        pauseOnFocusLoss={false}
      />
    </QueryClientProvider>
  </StrictMode>
)
