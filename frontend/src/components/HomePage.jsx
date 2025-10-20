import { useState } from "react";
import { useGetImagesQuery } from "../services/api";
import { AddImageForm } from "./AddImageForm";
import { Popup } from "./Popup";

export const HomePage = () => {
  const [isFormOpen, setIsFormOpen]=useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: images, error, isLoading, isSuccess } = useGetImagesQuery();

   const handlePurchaseClick = (image) => {
    setSelectedImage(image);
    setIsPopupOpen(true);
  };

  let content

  if (isLoading) content=(<div>...Loding</div>);
  if (error) content=(<div>Something went wrong</div>);
  if (isSuccess) content=(
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {images.map((image)=>{
        return(
          <div key={image._id} className="max-w-sm rounded overflow-hidden shadow-lg">
       <img className="w-full" src={image.url} alt="Sunset in the mountains"/>
       <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{image.name}</div>
            <p className="text-gray-700 text-base">
               {image.description}
        </p>
      </div>
          <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{image.prise}$</span>
        
      </div>
      <button
          onClick={() => handlePurchaseClick(image)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          Purchase
        </button>
      </div>
        )
      })}
    </div>
  )

  return (<>
  <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Mini-Marketplace for "NFT"</h2>
    {content}

   <button onClick={()=>{setIsFormOpen(true)}} className="mt-10 ml-20 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
 ADD
</button>
{isFormOpen && <AddImageForm setIsFormOpen={setIsFormOpen}/>}
{isPopupOpen && selectedImage && (
        <Popup 
          setIsPopupOpen={setIsPopupOpen} 
          prise={selectedImage.prise} 
          name={selectedImage.name} 
        />
      )}
  </>
    
  );
};
