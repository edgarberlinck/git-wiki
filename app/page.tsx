import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Github, Lock, Users } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            Git Wiki
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Beautiful documentation for your GitHub repositories
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/api/auth/signin">
              <Button size="lg" className="gap-2">
                <Github className="w-5 h-5" />
                Sign in with GitHub
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <BookOpen className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Simple Documentation</CardTitle>
              <CardDescription>
                Place your documentation in a /docs folder and we&apos;ll present it beautifully
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Support for Markdown files with GitHub Flavored Markdown (GFM)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Lock className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Public or Private</CardTitle>
              <CardDescription>
                Choose whether your wiki is publicly accessible or restricted
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Full control over who can access your documentation
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-12 h-12 mb-4 text-primary" />
              <CardTitle>Invite Collaborators</CardTitle>
              <CardDescription>
                Invite users by their GitHub username to access private wikis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Manage access with fine-grained permissions
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">How It Works</h2>
          <div className="max-w-3xl mx-auto text-left space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">1. Connect Your Repository</h3>
              <p className="text-gray-600">
                Sign in with GitHub and authorize access to your repositories
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">2. Add Documentation</h3>
              <p className="text-gray-600">
                Create a /docs folder in your repository and add Markdown files
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">3. Configure Access</h3>
              <p className="text-gray-600">
                Set your wiki as public or private and invite collaborators if needed
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">4. Share Your Wiki</h3>
              <p className="text-gray-600">
                Your documentation is now live and accessible at a shareable URL
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
