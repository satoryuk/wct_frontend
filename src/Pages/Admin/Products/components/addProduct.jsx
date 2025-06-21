import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Save,
  Upload,
  X,
  Package,
  DollarSign,
  Calendar,
  Hash,
  FileText,
  Tag,
  Building,
  Image,
  Plus,
} from "lucide-react";
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
  const [errors, setErrors] = React.useState({});
  const [isEditMode, setIsEditMode] = React.useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");

  const [productData, setProductData] = useState({
    product_name: "",
    image: null,
    price: "",
    category: "",
    brand: "",
    stock_qty: "",
    expiry_date: "",
    description: "",
    status: 1,
  });

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { refetch } = useGetProductsQuery();
  const { data: existingProduct } = useGetProductByIdQuery(id);
  const { data: categoryData } = useGetCategoryQuery();
  const categories = categoryData?.data?.data;

  const { data: brandData } = useGetBrandQuery();
  const brands = brandData?.data?.data;

  useEffect(() => {
    if (existingProduct) {
      setIsEditMode(true);
      setProductData({
        product_name: existingProduct.data.product_name || "",
        image: existingProduct.data.image || null,
        price: existingProduct.data.price || "",
        category: existingProduct.data.category || "",
        brand: existingProduct.data.brand || "",
        stock_qty: existingProduct.data.stock_qty || "",
        expiry_date: existingProduct.data.expiry_date || "",
        description: existingProduct.data.description || "",
        status: existingProduct.data.status || 1,
      });
      if (existingProduct.data.image) {
        setPreviewImage(existingProduct.data.image);
      }
    }
  }, [id, existingProduct]);

  const validate = () => {
    const errors = {};
    if (!productData.product_name)
      errors.product_name = "Product name is required";
    if (!productData.price) errors.price = "Price is required";
    if (!productData.stock_qty) errors.stock_qty = "Stock quantity is required";
    if (!isEditMode && !productData.image) errors.image = "Image is required";
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
          ? Number(value)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData({
        ...productData,
        image: file,
      });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProductData({
      ...productData,
      image: null,
    });
    setPreviewImage("");
  };

  const cancel = () => {
    navigate("/products");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", productData);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation errors:", validationErrors);
      setErrors(validationErrors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("product_name", productData.product_name);
      if (productData.image instanceof File) {
        formData.append("image", productData.image);
      } else if (productData.image && typeof productData.image === "string") {
        formData.append("image", productData.image);
      }
      formData.append("price", productData.price);
      formData.append("category", productData.category);
      formData.append("brand", productData.brand);
      formData.append("stock_qty", productData.stock_qty);
      formData.append("expiry_date", productData.expiry_date);
      formData.append("description", productData.description);
      formData.append("status", productData.status);

      if (isEditMode) {
        console.log("Updating product...");
        const result = await updateProduct({ id, data: formData }).unwrap();
        console.log("Update result:", result);
        toast.success("Product updated successfully");
      } else {
        console.log("Creating product...");
        const result = await createProduct(formData).unwrap();
        console.log("Create result:", result);
        toast.success("Product created successfully");
      }

      await refetch();
      navigate("/admin/products");
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error(
        error?.data?.message || error.message || "Failed to submit product"
      );
    }
  };

  return (
    <div>
      <div className="flex gap-4 my-6">
        <button
          onClick={() => navigate("/products/createBrand")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Brand
        </button>
        <button
          onClick={() => navigate("/products/createCategory")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white">
            Product Information
          </h2>
          <p className="text-blue-100 mt-1">
            Enter all required product details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Basic Information Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Package className="w-4 h-4 text-gray-500" />
                  Product Name *
                </label>
                <input
                  type="text"
                  name="product_name"
                  placeholder="Enter product name"
                  value={productData.product_name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 ${
                    errors.product_name
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  } rounded-xl focus:ring-4 focus:ring-blue-50 transition-all duration-200 placeholder-gray-400`}
                  required
                />
                {errors.product_name && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.product_name}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  Price *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <span className="text-gray-500 font-medium">$</span>
                  </div>
                  <input
                    type="text"
                    name="price"
                    placeholder="0.00"
                    className={`w-full pl-10 pr-4 py-3 border-2 ${
                      errors.price
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-blue-500"
                    } rounded-xl focus:ring-4 focus:ring-blue-50 transition-all duration-200 placeholder-gray-400`}
                    value={productData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {errors.price && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.price}
                  </p>
                )}
              </div>

              {/* Stock Quantity */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Hash className="w-4 h-4 text-gray-500" />
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock_qty"
                  placeholder="Enter quantity"
                  min="0"
                  className={`w-full px-4 py-3 border-2 ${
                    errors.stock_qty
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  } rounded-xl focus:ring-4 focus:ring-blue-50 transition-all duration-200 placeholder-gray-400`}
                  value={productData.stock_qty}
                  onChange={handleInputChange}
                  required
                />
                {errors.stock_qty && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.stock_qty}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Category & Brand Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
              Classification
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Tag className="w-4 h-4 text-gray-500" />
                  Category *
                </label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200"
                  name="category"
                  value={productData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories?.map((category) => (
                    <option
                      key={category.category_id}
                      value={category.category_id}
                    >
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Building className="w-4 h-4 text-gray-500" />
                  Brand *
                </label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200"
                  name="brand"
                  value={productData.brand}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select Brand
                  </option>
                  {brands?.map((brand) => (
                    <option key={brand.brand_id} value={brand.brand_id}>
                      {brand.brand_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-violet-600 rounded-full"></div>
              Additional Details
            </h3>

            <div className="space-y-6">
              {/* Expiry Date */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  Expiry Date *
                </label>
                <input
                  type="date"
                  className={`w-full md:w-1/3 px-4 py-3 border-2 ${
                    errors.expiry_date
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  } rounded-xl focus:ring-4 focus:ring-blue-50 transition-all duration-200`}
                  name="expiry_date"
                  value={productData.expiry_date}
                  onChange={handleInputChange}
                  required
                />
                {errors.expiry_date && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.expiry_date}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FileText className="w-4 h-4 text-gray-500" />
                  Product Description
                </label>
                <textarea
                  rows="4"
                  name="description"
                  placeholder="Enter detailed product description..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200 placeholder-gray-400 resize-none"
                  value={productData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
              Product Image {!isEditMode && "*"}
            </h3>

            <div className="space-y-4">
              {previewImage ? (
                <div className="relative inline-block">
                  <div className="w-48 h-48 border-2 border-gray-200 rounded-2xl overflow-hidden bg-gray-50">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
                  <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">No image selected</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl cursor-pointer hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 w-fit">
                  <Upload className="w-5 h-5" />
                  {previewImage ? "Change Image" : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required={!isEditMode}
                  />
                </label>
                {errors.image && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {errors.image}
                  </p>
                )}
                {isEditMode && !previewImage && (
                  <p className="text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    No image currently uploaded
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-8 border-t border-gray-200">
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
              <Save className="w-5 h-5" />
              {isEditMode ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
