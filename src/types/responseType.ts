export interface Response {
  data:
    | {
        profileImage: string
        nickname: string
      }
    | {
        type: string
        profileImage: string
        nickname: string
        created_at: string
        title: string
        post_id: number
        view: number
        commentCount: number
        post_image?: string
        content: string
      }
}
