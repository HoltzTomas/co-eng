import { signIn } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

export default function LoginPage() {

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form action={async () => {
          "use server"
          await signIn("google", {
            redirectTo: "/dashboard",
          });
        }}>
          <CardFooter>
            <Button type="submit" className="w-full">Login with Google</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

