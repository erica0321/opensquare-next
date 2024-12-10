import { fetchUrl } from '@/static'
import { apiRequest } from '@/utils/fetchData'

export const checkCommentOwner = async ({
  postId,
  commentId,
}: {
  postId: number
  commentId: number
}) => {
  const checkData = await apiRequest({
    url: `${fetchUrl.posts}/${postId}/comments/checkOwner`,
    method: 'POST',
    body: {
      comment_id: commentId,
    },
  })

  return checkData
}

export const checkPostOwner = async (postId: number) => {
  const checkData = await apiRequest({
    url: fetchUrl.checkPostOwner,
    method: 'POST',
    body: { post_id: postId },
  })
  return checkData
}
