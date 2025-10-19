import { useState } from 'react';

export const Popup=({setIsPopupOpen, name, prise})=>{
  const [quantity, setQuantity] = useState(1);
  
  const totalPrice = (quantity * prise).toFixed(2);
   
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  
  const handleConfirmPurchase = () => {
    alert(`Purchase confirmed!\nProduct: ${name}\nQuantity: ${quantity}\nTotal: $${totalPrice}`);
    handleClosePopup();
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        
        <div className="fixed inset-0 bg-gray bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border-4 border-blue-600">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Complete Your Purchase
            </h3>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-2">{name}</p>
              <p className="text-sm text-gray-500">Unit Price: ${prise}</p>
            </div>
            
            {/* Quantity Input */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* Total Price Display */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Total Price:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${totalPrice}
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleClosePopup}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPurchase}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
     </div>
  );
}