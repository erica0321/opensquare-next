'use client'

import LoginSection from './components/login/LoginSection'
import PostCountSection from './components/login/PostCountSection'
import DescriptionSection from './components/login/DescriptionSection'
import ReplySection from './components/login/ReplySection'
import BottomSection from './components/login/BottomSection'

export default function Page() {
  return (
    <div>
      <LoginSection />
      <PostCountSection />
      <DescriptionSection />
      <ReplySection />
      <BottomSection />
    </div>
  )
}
