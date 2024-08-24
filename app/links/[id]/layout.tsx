import AuthButton from "@/components/AuthButton"
import GoBackBUtton from "@/components/GoBackButton"
import { redirectToLoginIfNotAuthenticated } from "@/utils/authUtils"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  redirectToLoginIfNotAuthenticated()
  return (
    <>
      <nav className="w-full content-end flex justify-right border-b border-b-foreground/10 h-16">
        <div className="w-full flex justify-start p-3 text-sm">
          <GoBackBUtton />
        </div>
        <div className="w-full flex justify-end p-3 text-sm">
          <AuthButton />
        </div>
      </nav>
      {children}
    </>
  )
}
