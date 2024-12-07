export function changeDate(timestamp: string) {
  const date = new Date(timestamp)

  // 원하는 형식으로 변환 (로컬 시간)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const formattedTimestamp = `${year}-${month}-${day} ${hours}:${minutes}`

  return formattedTimestamp
}
