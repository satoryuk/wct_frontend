import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../../../redux/hooks/productApiSlice";

import { useGetCategoryQuery } from "../../../../redux/hooks/categoryApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBrandQuery } from "../../../../redux/hooks/brandApiSlice";

const AddProduct = () => {
  const [errors, setErrors] = React.useState("");
  const [isEditMde, setIsEditMode] = React.useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    product_name: "",
    image: "",
    price: "",
    category: "",
    brand: "",
    stock_qty: "",
    expiry_date: "",
    description: "",
    status: 1, // 1 for active, 0 for inactive
  });
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { refetch } = useGetProductsQuery();
  const { data: existingProduct } = useGetProductByIdQuery(id);
  const { data: categoryData } = useGetCategoryQuery();
  const categories = categoryData?.data?.data;

  const { data: brandData } = useGetBrandQuery();
  const brands = brandData?.data?.data;
  console.log("brand:", brands);

  console.log("category", categories);
  console.log("exits product", existingProduct);

  useEffect(() => {
    if (existingProduct) {
      setIsEditMode(true);
      setProductData({
        product_name: existingProduct.data.product_name || "",
        image: existingProduct.data.image || "",
        price: existingProduct.data.price || "",
        category: existingProduct.data.category || "",
        brand: existingProduct.data.brand || "",
        stock_qty: existingProduct.data.stock_qty || "",
        expiry_date: existingProduct.data.expiry_date || "",
        description: existingProduct.data.description || "",
        status: existingProduct.data.status || 1, // Default to active if not set
      });
    }
  }, [id, existingProduct]);

  const validate = () => {
    const errors = {};
    if (!productData.product_name)
      errors.product_name = "Product name is required";
    if (!productData.image) errors.image = "Image URL is required";
    if (!productData.price) errors.price = "Price is required";
    if (!productData.stock_qty) errors.stock_qty = "stock_qty is required";
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProductData((prevData) => ({
      ...prevData,
      [name]:
        name === "category" ||
        name === "brand" ||
        name === "stock_qty" ||
        name === "price"
          ? Number(value) // Convert to number
          : value, // Keep as string (for text inputs)
    }));
  };

  const cancel = () => {
    navigate("/products");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", productData); // Debug log

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors); // Debug log
      setErrors(validationErrors);
      return;
    }

    try {
      if (isEditMde) {
        console.log("Updating product..."); // Debug log
        const result = await updateProduct({ id, data: productData }).unwrap();
        console.log("Update result:", result); // Debug log
        toast.success("Product updated successfully");
      } else {
        console.log("Creating product..."); // Debug log
        const result = await createProduct(productData).unwrap();
        console.log("Create result:", result); // Debug log
        toast.success("Product created successfully");
      }

      await refetch();
      navigate("/admin/products"); // Make sure this path is correct
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error(
        error?.data?.message || error.message || "Failed to submit product"
      );
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 my-4">
      {/* Form */}
      <form className="grid" onSubmit={handleSubmit}>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          {/* product Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Product Name {!isEditMde && "*"}
              </label>
              <input
                type="text"
                name="product_name"
                placeholder="Enter product name"
                value={productData.product_name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  errors.product_name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                required={!isEditMde}
              />
              {errors.product_name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.product_name}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Price {!isEditMde && "*"}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  name="price"
                  placeholder="0.00"
                  className={`w-full pl-10 px-3 py-2 border ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                  value={productData.price}
                  onChange={handleInputChange}
                  required={!isEditMde}
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.product_name}
                  </p>
                )}
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Category {!isEditMde && "*"}
              </label>
              <select
                className="addProductLabel appearance-none bg-white"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select category
                </option>
                {categories?.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {`${category.category_name}`}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 pt-6">
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Brand*
              </label>
              <select
                className="addProductLabel appearance-none bg-white"
                name="brand"
                value={productData.brand}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Brand
                </option>
                {brands?.map((brand) => (
                  <option key={brand.brand_id} value={brand.brand_id}>
                    {`${brand.brand_name}`}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 pt-6">
                <svg
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Stock stock_qty {!isEditMde && "*"}
              </label>
              <input
                type="number"
                name="stock_qty"
                placeholder="Enter stock_qty"
                min="0"
                className={`w-full px-3 py-2 border ${
                  errors.stock_qty ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                value={productData.stock_qty}
                onChange={handleInputChange}
                required={!isEditMde}
              />
              {errors.stock_qty && (
                <p className="mt-1 text-sm text-red-600">{errors.stock_qty}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Expiry Date {!isEditMde && "*"}
              </label>
              <input
                type="date"
                className={`w-full px-3 py-2 border ${
                  errors.expiry_date ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                name="expiry_date"
                value={productData.expiry_date}
                onChange={handleInputChange}
                required={!isEditMde}
              />
              {errors.expiry_date && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.expiry_date}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
            Product Description
          </label>
          <textarea
            rows="4"
            name="description"
            placeholder="Enter product description"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={productData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end mt-4">
          <button
            type="button"
            onClick={cancel}
            className="px-6 py-2.5 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors mr-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center font-medium"
          >
            <Save className="w-5 h-5 mr-2" />
            {isEditMde ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
