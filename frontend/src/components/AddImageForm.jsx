import { useState } from "react";
import { useAddImageMutation } from "../services/api";

export const AddImageForm=({setIsFormOpen})=>{
const [formData, setFormData] = useState({
   description: "",
   price: "",
   name: "",
    img: null,
      });

  const [addImage]=useAddImageMutation();  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const imgFile = e.target.files?.[0] || null;
    setFormData((prevData) => ({ ...prevData, img: imgFile }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("description", formData.description);
    data.append("img", formData.img);
    data.append("price", formData.price);
    data.append("name", formData.name);
   
    //await add(data);
    console.log(formData);

    await addImage(data);

    setFormData((prevData) => ({
      ...prevData,
           description: "",
           img: null,
           price: "",
           name: "",
     
    }));

    setIsFormOpen(false);
  };

  return(
    <form onSubmit={handleSubmit}>
  <div className="space-y-12">
    <div className="border-b border-gray-900/10 pb-12">
      

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-4">
          <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
               <input id="name" type="text" name="name" value={formData.name} onChange={handleInputChange} className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
            </div>
          </div>
        </div>
        
        <div className="sm:col-span-4">
          <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">Price</label>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
               <input id="price" type="text" name="price" value={formData.price} onChange={handleInputChange} className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">Description</label>
          <div className="mt-2">
            <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} rows="3" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
          </div>
          </div>

        

        <div className="col-span-full">
          <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">Upload file</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              <svg viewBox="0 0 24 24" fill="currentColor" data-slot="icon" aria-hidden="true" className="mx-auto size-12 text-gray-300">
                <path d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
              <div className="mt-4 flex text-sm/6 text-gray-600">
                <label htmlFor="img" className="relative cursor-pointer rounded-md bg-transparent font-semibold text-green-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-green-600 hover:text-green-500">
                  <span>Upload a file</span>
                  <input id="img" type="file" name="img" onChange={handleFileChange}
              accept="image/*,.png,.jpg,.gif,.web" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="mt-6 flex items-center justify-end gap-x-6">
    <button type="button" className="text-sm/6 font-semibold text-gray-900">Cancel</button>
    <button type="submit" className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Save</button>
  </div>
</form>

  )
}