import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Plus, Lock, Globe } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const wikis = await prisma.wiki.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">Git Wiki</h1>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session.user.email}</span>
            <Link href="/api/auth/signout">
              <Button variant="outline" size="sm">Sign Out</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Wikis</h2>
          <Link href="/dashboard/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Wiki
            </Button>
          </Link>
        </div>

        {wikis.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No wikis yet</h3>
              <p className="text-gray-600 mb-6">Create your first wiki to get started</p>
              <Link href="/dashboard/new">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Wiki
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wikis.map((wiki) => (
              <Card key={wiki.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{wiki.name}</CardTitle>
                    {wiki.isPublic ? (
                      <Globe className="w-5 h-5 text-green-600" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                  <CardDescription className="line-clamp-2">
                    {wiki.description || "No description"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Repository:</span> {wiki.repoOwner}/{wiki.repoName}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Link href={`/wiki/${wiki.repoOwner}/${wiki.repoName}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          View Wiki
                        </Button>
                      </Link>
                      <Link href={`/dashboard/wiki/${wiki.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          Manage
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
