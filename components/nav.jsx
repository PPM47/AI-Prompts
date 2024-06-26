"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  // useEffect(() => {
  //   if (toggleDropdown) {
  //     setToggleDropdown(true);
  //   } else {
  //     const timeoutId = setTimeout(() => {
  //       setToggleDropdown(false);
  //     }, 2000); // Duration of the fade-out animation
  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [toggleDropdown]);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="nav_bar">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.png"
          alt="Promptopia Logo"
          width={40}
          height={40}
          className="object-contain rounded-full"
        />
        <p className=" font-inter text-lg">AI Prompt</p>
      </Link>
      {/* Desktop navigation --------------------------------------------------------------- */}
      <div className="sm:flex hidden reletive">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button href="/" 
            className="outline_btn"
            type="button"
            onClick={() => {
              setToggleDropdown(false);
              signOut();
            }}
            >
              LogOut
            </button>
            <Link href="/profile">
              <Image
                src={session.user.image}
                alt="prfile"
                width={37}
                height={37}
                className="rounded-full"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation --------------------------------------------------------------- */}
      <div className="sm:hidden flex reletive">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session.user.image}
              alt="prfile"
              width={37}
              height={37}
              className="dropdown_Image_btn"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              // {`dropdown ${toggleDropdown ? 'animate-fade-left' : 'animate-fade-right'}`}
              <div className="dropdown">
                 <Image
                src={session.user.image}
                alt="prfile"
                width={37}
                height={37}
                className="rounded-full self-center drop-shadow-md"
                
              ></Image>
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <Link
                  href="/Settings"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Settings
                </Link>
                <Link
                  href="help"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  HELP
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
export default Nav;
