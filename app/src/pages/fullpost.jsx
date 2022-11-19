import { AnchorProvider, Program } from "@project-serum/anchor";
import {
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "src/context/functions/getPostById";
import idl from "src/idl.json";
import { useBlog } from "src/context/Blog";




const PROGRAM_KEY = new PublicKey(idl.metadata.address);

function getProgram(provider) {
  return new Program(idl, PROGRAM_KEY, provider);
}

export const FullPost = () => {
  const { id } = useParams();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [provider, setProvider] = useState();
  const [post, setPost] = useState();
  const {user} = useBlog();

  useEffect(() => {
    try {
      if (provider) {
        const getPost = async () => {
          const program = getProgram(provider);
          const post = await getPostById(id.toString(), program);
          setPost(post);
        };
        getPost();
      }
    } catch { }
  }, [provider]);

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      setProvider(provider);
    }
  }, [connection, wallet]);


  return (
    
    <article className="hentry bgg">
      <header className="fixed py-4 mb-6 flex z-10 w-full">
        <div className="flex justify-between mt-4 items-center h-full container">
          <h2 className="text-2xl font-bold">
            <div className="bg-clip-text bg-gradient-to-br text-white"
            >
              TWEEPER
            </div>
            
          </h2>
            <ul>
              <a href="/"><li className="cursor-pointer transition ease-in-out delay-150 text-blue-500 hover:scale-110 bg-white hover:bg-blue-500 duration-300 rounded-3xl px-7 py-3 uppercase transform transition-all hover:text-white scale-110">
                HOME
              </li></a>
            </ul>
          </div>
      </header>
      <h1 className="entry-title text-white mt-28 mx-auto">{post?.title}</h1>
      <div className="featured-image w-full mx-0">
        <img
          src="https://coinpare.io/img/banner/solana.jpg"
          alt=""
        />
      </div>
      <div className="entry-meta">
        <p>
          <span className="author text-purple-900">
            Written by <a href="#">{user?.name}</a>
          </span>{" "}
          <span className="date text-purple-900">November 19 2022</span>
        </p>
      </div>
      <div className="entry-content text-gray-200 mr-96">
        <p>{post?.content}</p>
      </div>
    </article>
  );
};
