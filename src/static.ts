// export const backHost = "https://opensquare.kro.kr";

export const backHost = 'http://localhost:8080'

export const headersNoToken = {
  'ngrok-skip-browser-warning': '69420',
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export const getHeadersWithToken = () => {
  if (typeof window === 'undefined') {
    return {
      'ngrok-skip-browser-warning': '69420',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
  }

  return {
    'ngrok-skip-browser-warning': '69420',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    access: `${localStorage.getItem('access')}`,
  }
}

export const navUrl = {
  home: '/',
  signUp: '/signUp',
  posts: '/posts',
  postDetail: '/posts/:id',
  addPost: '/posts/new',
  updatePost: '/posts/:id/update',
  updateProfile: '/setting',
  updatePassword: '/setting/password',
  codingPosts: '/posts?type=coding',
  otherPosts: '/posts?type=other',
  myPosts: '/posts?type=my',
}

export const fetchUrl = {
  logOut: `${backHost}/api/users/logOut`,
  reissue: `${backHost}/api/reissue`,
  posts: `${backHost}/api/posts`,
  email: `${backHost}/api/users/email`,
  nickname: `${backHost}/api/users/nickname`,
  profile: `${backHost}/api/users/user/profile`,
  checkPostOwner: `${backHost}/api/posts/checkOwner`,
  signUpNickname: `${backHost}/api/users/signup/nickname`,
  user: `${backHost}/api/users/user`,
  logIn: `${backHost}/api/users/logIn`,
  signUp: `${backHost}/api/users/signup`,
  userPassword: `${backHost}/api/users/user/password`,
  userWriteCount: `${backHost}/api/users/myWrite`,
  myPosts: `${backHost}/api/posts/myPosts`,
  otherPosts: `${backHost}/api/posts/other`,
  codingPosts: `${backHost}/api/posts/coding`,
}
