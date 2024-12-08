import { fetchUrl } from '@/static'
import { apiRequest } from '@/utils/fetchData'

export const checkCommentOwner = async ({
  postId,
  commentId,
}: {
  postId: number
  commentId: number
}) => {
  try {
    const checkData = await apiRequest({
      url: `${fetchUrl.posts}/${postId}/comments/checkOwner`,
      method: 'POST',
      body: {
        comment_id: commentId,
      },
    })

    return checkData
  } catch (error) {}
}

export const checkPostOwner = async (postId: number) => {
  try {
    const checkData = await apiRequest({
      url: fetchUrl.checkPostOwner,
      method: 'POST',
      body: { post_id: postId },
    })
    return checkData
  } catch (error) {}
}
