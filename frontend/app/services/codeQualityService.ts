import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
});


export const generateCodeQuality = async (sha: string, repoUrl: string, type: 'file' | 'commit') => {
    try {
        const codeQuality = await axiosInstance.post("/api/code-quality", { sha, repoUrl, type })
        console.log({ codeQuality })
        return codeQuality.data.quality
    } catch (error) {
        return []
    }
}   