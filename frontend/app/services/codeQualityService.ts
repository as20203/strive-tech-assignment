import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: process.env.API_URL
});


export const generateCodeQuality = async (sha: string, repoUrl: string) => {
    try {
        const codeQuality = await axiosInstance.post("/api/code-quality", { sha, repoUrl })
        console.log({ codeQuality })
        return codeQuality.data.quality
    } catch (error) {
        return []
    }
}   