import React from "react";
import { Product } from "@/types/product";

interface DetailElementsProps {
  productData: Product;
}

const DetailElements: React.FC<DetailElementsProps> = ({ productData }) => {
  const {
    name,
    category,
    rack,
    stock,
    pricePurchase,
    priceSell,
    imageUrl,
  } = productData;

  return (
    <div className="flex flex-col gap-6 rounded-lg border border-stroke bg-white shadow-lg dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
      <div className="relative flex flex-col md:flex-row gap-6 p-6">
        {/* Product Image (Left Side) */}
        {imageUrl && (
          <div className="w-full md:w-1/3 relative">
            <img
              src={imageUrl}
              alt="Product Image"
              className="h-64 w-full rounded-lg object-cover"
            />
            {/* Stock Badge */}
            <div className="absolute top-2 right-2 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white shadow-md">
              Stock: {stock}
            </div>
          </div>
        )}

        {/* Product Details (Right Side) */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-dark dark:text-white mb-2">
            Product Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Input Fields Disabled */}
            <div>
              <label className="block text-sm font-medium text-dark dark:text-white">
                Product Name
              </label>
              <input
                type="text"
                value={name}
                disabled
                className="mt-1 w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 dark:bg-dark-3 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark dark:text-white">
                Category
              </label>
              <input
                type="text"
                value={category.name}
                disabled
                className="mt-1 w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 dark:bg-dark-3 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark dark:text-white">
                Rack Location
              </label>
              <input
                type="text"
                value={rack.location}
                disabled
                className="mt-1 w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 dark:bg-dark-3 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark dark:text-white">
                Stock
              </label>
              <input
                type="number"
                value={stock}
                disabled
                className="mt-1 w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 dark:bg-dark-3 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark dark:text-white">
                Purchase Price
              </label>
              <input
                type="text"
                value={pricePurchase.toLocaleString()}
                disabled
                className="mt-1 w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 dark:bg-dark-3 dark:text-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark dark:text-white">
                Selling Price
              </label>
              <input
                type="text"
                value={priceSell.toLocaleString()}
                disabled
                className="mt-1 w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-700 dark:bg-dark-3 dark:text-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailElements;
