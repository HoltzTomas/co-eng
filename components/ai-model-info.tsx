import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AIModelInfo() {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-center mb-6">Our AI Models</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gemini</CardTitle>
            <CardDescription>Process large documents</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Gemini excels at processing and analyzing large documents, making it perfect for comprehensive study materials and research papers.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>GPT-4</CardTitle>
            <CardDescription>Problem-solving and critical thinking</CardDescription>
          </CardHeader>
          <CardContent>
            <p>GPT-4 is optimized for complex problem-solving and critical thinking tasks, ideal for tackling challenging engineering concepts and questions.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

