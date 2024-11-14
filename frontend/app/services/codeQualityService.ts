import axios from 'axios';
const baseURl = 'http://localhost:3001'
const axiosInstance = axios.create({
    baseURL: baseURl
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