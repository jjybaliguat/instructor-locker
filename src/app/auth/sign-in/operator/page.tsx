import { OperatorLoginForm } from "@/components/forms/operator-login";

export default function OperatorLogin() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <OperatorLoginForm />
      </div>
    </div>
  )
}
