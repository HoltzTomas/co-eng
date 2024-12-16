import { DashboardOptions } from "./components/DashboardOptions"
import { FileUploadButton } from "./components/FileUploadButton"

export default function Page() {
  return (
        <main className="flex-1 overflow-auto bg-gray-100">
          <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Dashboard de Estudio</h1>
              <FileUploadButton />
            </div>
            <DashboardOptions />
          </div>
        </main>
  )
}

