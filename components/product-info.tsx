import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProductInfo() {
  return (
    <div className="w-full md:w-1/2 bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">AI-Powered Learning for Engineers</h1>
      <p className="text-gray-600 mb-8">
        Harness the power of advanced AI models to enhance your engineering studies. 
        Process large documents, solve complex problems, and accelerate your learning.
      </p>
      
      <h2 className="text-2xl font-bold mb-4">Our AI Models</h2>
      <div className="space-y-4">
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

