'use client'

import { useState, useEffect } from 'react';
import PromptCard from '@components/promptcard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
   <div className='mt-16 prompt_latout'>
    {data.map((post) => (
      <PromptCard
      key={post._id}
      post={post}
      handleTagClick={handleTagClick}
      />
    ))}
   </div>
  )

};
const Feed = () => {
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);
  return (
    <section className='w-full max-w-4xl flex-center flex-col'>
      <form action="" className='mt-10 w-full dropSm max-w-2xl flex-between gap-7 glassmorphism'>
        <input 
        type="text" 
        placeholder='Search for a Tag or UserName'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input'
        />

        {/* <button 
        className='search_btn glassmorphism dropSs' 
        type='submit'>
          <span className='orange_gradient'>Search</span>
          </button> */}
      </form>
      <PromptCardList
      className="w-full max-w-2xl"
      data={posts}
      handleTagClick={() => ({})}
      />
    
    </section>
  )
}

export default Feed