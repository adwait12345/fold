import Axios from "axios"

const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api`,
})

export const fetcher = async <T>(url: string) => {
  try {
    const { data } = await axios.get<T>(url)
    return data
  } catch (error) {
    throw error
  }
}

export default axios