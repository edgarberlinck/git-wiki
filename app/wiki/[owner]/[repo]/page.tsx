import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BookOpen, Home } from "lucide-react";

async function getWikiContent(owner: string, repo: string) {
  // TODO: Implement GitHub API integration to fetch actual content from /docs folder
  // See: https://docs.github.com/en/rest/repos/contents
  // For now, return a placeholder
  return `# Welcome to ${owner}/${repo} Wiki

This is a placeholder for your wiki content. In production, this would fetch content from your repository's /docs folder.

## Features

- Automatic documentation from /docs folder
- Markdown support with GFM
- Public or private access control
- User invitations

## Getting Started

1. Add documentation to your repository's \`/docs\` folder
2. Configure access settings
3. Share your wiki URL

## Example Content

Here's some example markdown content:

\`\`\`javascript
function hello() {
  console.log("Hello from Git Wiki!");
}
\`\`\`

### Lists

- Item 1
- Item 2
- Item 3

### Links

- [GitHub](https://github.com)
- [Documentation](https://docs.github.com)
`;
}

export default async function WikiPage({
  params,
}: {
  params: Promise<{ owner: string; repo: string }>;
}) {
  const { owner, repo } = await params;
  const session = await getServerSession(authOptions);

  const wiki = await prisma.wiki.findFirst({
    where: {
      repoOwner: owner,
      repoName: repo,
    },
  });

  if (!wiki) {
    notFound();
  }

  // Check access permissions
  if (!wiki.isPublic) {
    if (!session?.user?.id) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Private Wiki</h1>
            <p className="mb-4">This wiki is private. Please sign in to access it.</p>
            <Link href="/api/auth/signin">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      );
    }

    const isOwner = wiki.userId === session.user.id;
    const hasAccess = await prisma.wikiAccess.findFirst({
      where: {
        wikiId: wiki.id,
        userId: session.user.id,
      },
    });

    if (!isOwner && !hasAccess) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="mb-4">You don&apos;t have permission to view this wiki.</p>
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      );
    }
  }

  const content = await getWikiContent(owner, repo);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <h1 className="text-xl font-bold">{wiki.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
                <Link href="/api/auth/signout">
                  <Button variant="outline" size="sm">Sign Out</Button>
                </Link>
              </>
            ) : (
              <Link href="/api/auth/signin">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
