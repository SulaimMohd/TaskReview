import { useState } from 'react'
import {FaStar} from 'react-icons/fa'
import Confetti from 'react-confetti'
import ReviewCard from './Component/ReviewCard'

function App() {
  const data = [{
    id:'21321334',
    starCount:3,
    text:'Brilliantly directed, this movie excels in storytelling and character development. The score perfectly complements the mood, but some scenes felt unnecessarily prolonged.'
  },
  {
    id:'21321354',
    starCount:2,
    text:'A visually stunning masterpiece with an emotionally driven story. The actors gave stellar performances, making each scene impactful. However, the pacing slowed near the end.'
  },
  {
    id:'21321374',
    starCount:4,
    text:'Fun and heartwarming, but the ending felt rushed.'
  } 
]
  const [selectedCount, setSelectedCount] = useState(0)
  const [hoverCount, setHoverCount] = useState(0)
  const [isFiveStar, setIsFiveStar] = useState(false)
  const [reviewText, setReviweTeaxt] = useState('')
  const [allReviews, setAllReviews] = useState(data)
  const [isClicked, setIsClicked] = useState(false)
  const zeroArray = new Array(5).fill(0)

  const hanldleOver = (index)=>{
    setHoverCount(index)
    if(selectedCount> index){
      setSelectedCount(index)
    }
  }
  const hanldleLeave = ()=>{
    setHoverCount(0)
  }
  const hanldleClick =(index)=>{
      if(selectedCount && index <= selectedCount){
        setSelectedCount(0)
      }else{
        setSelectedCount(index)
        if(index === 5){
          setIsFiveStar(true)
          setTimeout(()=>{
            setIsFiveStar(false)
          }, 10000)
        }
      }
      
  }
  const postReview = ()=>{
    if(reviewText){
      setAllReviews(preState => [...preState, {id:new Date().getTime().toString(),starCount: selectedCount, text:reviewText}])
      setReviweTeaxt('')
      setSelectedCount(0)
    }else{
      setIsClicked(true)
    }
    
  }
  const handleDelete = (id)=>{
    let updatedPosts = allReviews.filter(post => post.id !== id)
    setAllReviews(updatedPosts)
  }
  const handleChange = (e)=>{
    setReviweTeaxt(e.target.value) 
    setIsClicked(false)
  }
  console.log(allReviews)

  return (
    <div className='flex flex-col w-full h-full items-center pt-16'>
      
      <div className='flex flex-col w-96 '>
      <h1 className='self-start underline font-mono font-bold text-2xl mb-4'>Share your Review!!</h1>
        <textarea 
          className='border-2 rounded-md bg-gray-100 focus:bg-white focus:outline-none focus:border-gray-400 pl-2 pt-1 h-24 resize-none transition duration-300 ease-out'
          placeholder={`Share your opinion with us!!`}
          value={reviewText}
          onChange={(e)=> handleChange(e)}
        />
        {
          isClicked && <h2 className='text-red-700 font-medium text-sm italic mt-1'>Please write something!</h2>
        }
      <div className='flex justify-between items-center mt-4 border-b-2 pb-7'>
        <div className='flex cursor-pointer'>
          { 
            zeroArray.map((_,index)=>{
              return (<FaStar 
                          className={( hoverCount || selectedCount) > index ? `text-orange-500 transition duration-300 ease-in-out text-2xl`:'text-gray-500 transition duration-300 ease-in-out text-2xl'}
                          onMouseOver={()=> hanldleOver(index+1)} 
                          onMouseLeave={()=> hanldleLeave()}
                          onClick={()=> hanldleClick(index+1)}
                          key={index}
                      />)
            })
          }
          </div>
          
          
          <button 
              className="group relative h-9 w-20 overflow-hidden rounded-[4px] bg-gray-200 text-lg shadow"
              onClick={()=> postReview()}
              >
          <div className="absolute inset-0 w-3 bg-gray-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span className="relative text-gray-700 group-hover:text-gray-50">Post</span>
          </button>
        </div>
        <div className='flex mt-8 flex-col'>
          {
            allReviews.length > 0 ? (allReviews.map(post => <ReviewCard key={post.id} {...post} handleDelete={handleDelete}/>)):(
              <h1 className='text-gray-500 flex justify-center text-xl font-sans italic'>No review yet!!</h1>
            )
          }
        </div>
      </div> 
      {
        isFiveStar && <Confetti />
      } 
      
    </div>
  )
}

export default App
