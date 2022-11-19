import { useWallet } from "@solana/wallet-adapter-react"
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"
import { useEffect, useState } from "react"
import { Button } from "src/components/Button"
import { PostForm } from "src/components/PostForm"
import { useBlog } from "src/context/Blog"
import { useHistory } from 'react-router-dom'



export const Dashboard = () => {
  const history = useHistory()
  const [connecting, setConnecting] = useState(false)
  const { connected, select } = useWallet()
  const { user, posts, initialized, initUser, createPost, showModal, setShowModal, } = useBlog()
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")

  const onConnect = () => {
    setConnecting(true)
    select(PhantomWalletName)
  }

  useEffect(() => {
    if (user) {
      setConnecting(false)
    }
  }, [user])

  return (
    <div className="dashboard flex-col bgg overflow-auto h-screen">
      <header className="fixed bgg flex z-10 w-full">
        <div className="flex justify-between mt-4 items-center h-full container">
          <a href="#hero"><h2 className="text-2xl font-bold">
            <div className="bg-clip-text bg-gradient-to-br text-white"
            >
              TWEEPER
            </div>
          </h2></a>
          
          {connected ? (
            <div className="flex items-center">
              <a href="#why"><p class="cursor-pointer transition ease-in-out delay-150 text-white hover:scale-110 hover:bg-white duration-300 rounded-3xl px-7 py-3 uppercase transform transition-all hover:text-purple-500 scale-110">Why Us</p></a>
            
              <a href="#post"><p class="cursor-pointer transition ease-in-out delay-150 text-white hover:scale-110 hover:bg-white duration-300 rounded-3xl px-7 py-3 uppercase transform transition-all hover:text-purple-500 scale-110">Posts</p></a>
              <a href="#about"><p class="cursor-pointer transition ease-in-out delay-150 text-white hover:scale-110 hover:bg-white duration-300 rounded-3xl px-7 py-3 uppercase transform transition-all hover:text-purple-500 scale-110">About Us</p></a>
          
      
              <img
                src={user?.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
              />
              <p className=" font-bold text-sm ml-2 capitalize">
                {user?.name}
              </p>
              {initialized ? (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    setShowModal(true)
                  }}
                >
                  Create Post
                </Button>
              ) : (
                <Button
                  className="ml-3 mr-2"
                  onClick={() => {
                    initUser()
                  }}
                >
                  Initialize User
                </Button>
              )}

            </div>
          ) : (
            <Button
              loading={connecting}
              className="w-28 flex justify-center"
              onClick={onConnect}
            >Connect</Button>
          )}
        </div>
      </header>
      <main id = "hero"className="dashboard-main pb-4 pt-0 container flex relative">
        <div className="pt-3">
          {/* <h1 className="title">The Blog</h1> */}
          <div className="row">

            <section class="text-gray-600 body-font border-t-2 border-gray-200  h-full mt-4 py-40">
              <div class="container mx-auto flex px-5 md:flex-row flex-col items-center">
                <div class="flex-col">
                  <h1 class="title-font py-10 appear text-8xl mb-10 font-medium text-white">What's Happening In Web3
                  </h1>
                  <p class="my-8 py- appear leading-relaxed text-3xl text-gray-200">We are a long format content sharing platform, built on solana blockchain, bringing your regular content sharing on web3.0 making it transparent, opensourced and censorship free.</p>
                  <h1 class="title-font py-10 appear text-5xl mb-10 font-medium text-white">And.....</h1>
                  <p class="my-8 py- appear leading-relaxed text-3xl text-gray-200">We let you mind NFTs.</p>

                </div>
              </div>
            </section>
            <div class="mt-40 flex justify-center mb-20">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-down" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-8a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1z" />
              </svg>
            </div>
            <h1 id="why" class="scroll-div text-5xl flex justify-center">Why Us?</h1>
            <div class="flex my-20">
              <div class="flex mx-auto justify-center">
                <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                  <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Decentralized</h5>
                  <p class="text-gray-700 text-base mb-4">
                    All posts and content on Tweeper is stored permanently on Solana Blockchain.
                  </p>
                </div>
              </div>
              <div class="flex mx-auto justify-center">
                <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                  <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Open Sourced</h5>
                  <p class="text-gray-700 text-base mb-4">
                    Tweeper is an open sourced project available on GitHub.
                  </p>
                </div>
              </div>
              <div class="flex mx-auto justify-center">
                <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                  <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Censorship Free</h5>
                  <p class="text-gray-700 text-base mb-4">
                    Tweeper doesnt enforce any censorship on content.
                  </p>
                </div>
              </div>
            </div>
            <h1 id="post" class="scroll-div text-5xl flex justify-center">Posts</h1>
            <div className="all__posts my-20">
              {posts.map((item) => {
                return (
                  <article className="post__card-2 bg-white p-4 rounded-xl"
                    onClick={() => {
                      history.push(`/read-post/${item.publicKey.toString()}`)
                    }}
                    key={item.account.id}
                  >
                    <div className="post__card_-2">
                      <div>
                        <div className="post__card_meta-2">
                          <div className="post__card_cat text-black text-xl">November 19, 2022<span className="dot"> </span>{item.account.title} </div>
                          <p className="post__card_alttitle-2">
                            {item.account.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
        <div className={`modal ${showModal && 'show-modal'}`} >
          <div className="modal-content">
            <span className="close-button"
              onClick={() => setShowModal(false)}
            >×</span>
            <PostForm
              postTitle={postTitle}
              postContent={postContent}
              setPostTitle={setPostTitle}
              setPostContent={setPostContent}
              onSubmit={() => createPost(postTitle, postContent)}
            />
          </div>
        </div>
      </main>
      <section id="about" class=" text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="text-5xl font-medium title-font mb-4 text-white tracking-widest">Our Team</h1>
          </div>
          <div class="flex flex-wrap -m-4">
            <div class="p-4 lg:w-1/2">
              <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <div class="flex-grow bg-white py-8 rounded-xl sm:pl-8">
                  <h2 class="title-font font-medium text-lg text-gray-900">Vishal</h2>
                  <h3 class="text-gray-500 mb-3">Full Stack Developer</h3>
                  <p class="mb-4">Love Gaming and Esports</p>
                  <span class="inline-flex">
                    <a class="ml-2 text-gray-500" href="https://twitter.com/vishal724536">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div class="p-4 lg:w-1/2">
              <div class="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <div class="flex-grow bg-white rounded-xl py-8 sm:pl-8">
                  <h2 class="title-font font-medium text-lg text-gray-900">Sanyam Saini</h2>
                  <h3 class="text-gray-500 mb-3">DevOps and Backened Developer</h3>
                  <p class="mb-4">Anime and RedBull is LOVE.</p>
                  <span class="inline-flex">
                    <a class="ml-2 text-gray-500" href="https://twitter.com/sanyam_810">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="text-gray-900 body-font">
        <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <span class="ml-3 text-xl text-purple-900">Tweeper</span>
          </a>
          <p class="text-sm text-gray-900 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2022 Tweeper —
            <a href="https://twitter.com/knyttneve" class="text-gray-900 ml-1" rel="noopener noreferrer" target="_blank">@viss_halll</a>
          </p>
          <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a class="ml-3 text-gray-900" href="https://twitter.com/vishal724536">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-900" href="https://www.instagram.com/viss_halll/">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-900" href="https://www.linkedin.com/in/vishal-singh-a58491216/">
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}