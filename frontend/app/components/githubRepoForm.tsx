'use client'

import { useState } from 'react'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert"
import { generateCodeQuality } from '../services'

export default function GitHubRepoForm() {
    const [repoUrl, setRepoUrl] = useState('')
    const [sha, setSha] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [apiResponse, setApiResponse] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {

            const codeQuality = await generateCodeQuality(sha, repoUrl)
            // Simulating API call

            setApiResponse(codeQuality)
        } catch (err) {
            setError('An error occurred while fetching the data. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleBack = () => {
        setApiResponse(null)
        setRepoUrl('')
        setSha('')
    }

    if (apiResponse) {
        return (
            <div className="space-y-4 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Code Review</h2>
                <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap">{apiResponse}</pre>
                </div>
                <Button onClick={handleBack} className="w-full">Back to Form</Button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <div className="space-y-2">
                <Label htmlFor="repoUrl">GitHub Repository URL</Label>
                <Input
                    id="repoUrl"
                    type="url"
                    placeholder="https://github.com/username/repo"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="sha">SHA Value</Label>
                <Input
                    id="sha"
                    type="text"
                    placeholder="Enter SHA value"
                    value={sha}
                    onChange={(e) => setSha(e.target.value)}
                    required
                />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </>
                ) : (
                    'Submit'
                )}
            </Button>
        </form>
    )
}