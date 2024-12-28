import { DashboardOptions } from "@/components/dashboard-options"

export default async function Page() {
  return (
        <main className="flex-1 overflow-auto bg-gray-100">
          <div className="container mx-auto p-6 space-y-4">
            <DashboardOptions />
          </div>
        </main>
  )
}

