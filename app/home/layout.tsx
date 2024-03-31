import { redirectToLoginIfNotAuthenticated } from "@/utils/authUtils"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    redirectToLoginIfNotAuthenticated()
    return (
        <>
            {children} 
        </>
    )
  }
  