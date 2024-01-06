/* eslint-disable */
import React, {useEffect,createContext, useState, useRef } from 'react';
import axios from 'axios'
import './App.css';
import ImageCard from './components/imgthumbnail';
import ReactSwitch from 'react-switch';
import Navbar from './components/navbar';
export const Themecontext=createContext(null);
const baseurl =`https://api.unsplash.com/search/photos`;
const accesskey=process.env.REACT_APP_API_KEY;
const imagesperpage=20;
function App() {
  const [query, setQuery] = useState("nature");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [theme,setTheme]=useState("light");
  const searchinput=useRef(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggletheme =()=>{
    setTheme((curr) => (curr ==="light" ? "dark":"light"));
  };
  const fetchimages= async () => {
    try {
      const {data} =await axios.get(
        `${baseurl}?query=${query}&page=${page}&per_page=${imagesperpage}&client_id=${accesskey}`
      );
     // console.log('data',data);
      setImages(data.results);
      setTotalPages(data.total_pages);
    }
    catch (error){
      console.log(error);
    }
    finally {
      setLoading(false); 
     }
  };
  const handlesearch =(event) =>{
    event.preventDefault();
   // console.log(searchinput.current.value);
    setQuery(searchinput.current.value)
    resetSearch();

  };
  useEffect(() => {
    const randomQuery = 'nature'; 
    fetchimages(randomQuery);
}, [page,query]);
  const resetSearch = () => {
    setPage(1);
    fetchimages();
  };

  //console.log('page',page);
  return (
    <Themecontext.Provider value={{theme,toggletheme}}>
   {loading ? (
  <div className="loading-indicator">Loading...</div>
) : (
    <div className="App" id={theme}>   
    <div className='nav'>
    <Navbar/>
    </div>
   <div className='seach-wrap'>
   <div className='container'>
   <div className="switch-container">
      <p>{theme === "dark" ? "Dark Mode" : "Light Mode"}</p>
      <ReactSwitch
        onChange={toggletheme}
        checked={theme === "dark"}
        className="custom-switch"
      />
    </div>
      <h1 className='title'>Image Search</h1>
      <div className='search-section'>
      <input
        type="text"
        placeholder="Search..."
        ref={searchinput}
      />
      </div>
      <div className='btn'> <button onClick={handlesearch}
   type='submit'
   >submit</button></div>
    </div>
    
  
   </div>
   <div className="pagination">
  <div className="buttons">
    {page > 1 && (
      <button onClick={() => setPage(page - 1)}>Previous</button>
    )}
    <span className="page-number">{page}</span>
    {page < totalPages && (
      <button onClick={() => setPage(page + 1)}>Next</button>
    )}
  </div>
</div>

   <div className="image-container">{images.map((image)=> (
   <div><ImageCard 
   image={image.urls.regular}
   ownerName={image.user.username}
   ownerUsername={image.user.name}
   userProfile={image.user.profile_image.small}
   likes={image.likes}
   downloadLinks={image.links.download_location}
    id={theme}/>
    </div>
    ))}</div>
   
    </div>)}
    </Themecontext.Provider>
  );
}

export default App;