import GitHubRepoForm from './components/githubRepoForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">GitHub Repo Info</h1>
      <GitHubRepoForm />
    </main>
  )
}
