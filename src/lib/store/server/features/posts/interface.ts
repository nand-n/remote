
export interface Post {
    description: string
    userId : number 
    id: string 
    title:string 
    body: string 
}

export interface AddPostData {
    id?:string
    title:string 
    description:string 
    image: string 
    price: number 
    itemCount: number
}