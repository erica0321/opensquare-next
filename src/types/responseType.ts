export interface Response {
  data:
    | {
        profileImage: string
        nickname: string
        email?: string
      }
    | {
        type: string
        profileImage?: string
        profile_image?: string
        nickname: string
        created_at: string
        title: string
        post_id: number
        view: number
        commentCount: number
        post_image?: string
        content: string
      }
    | {
        title: string
        content: string
        post_image?: string
        type: string
      }
}
