import personalBlog from '../data/personalBlog'

export interface Blog {
  id: number
  date: string
  time: string
  texts: string
  imgsaddr: string[]
}

export async function pullGithubBlogs(): Promise<Blog[]> {
  return personalBlog
}