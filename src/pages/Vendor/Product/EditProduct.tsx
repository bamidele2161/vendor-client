import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../../components/FormInput";
import Navbar from "../../../components/Navbar/Navbar";
import {
  VENDOR_COLORS,
  fashionMaterials,
  fashionSizes,
  gender,
} from "../../../util";
// import ImageUpload from "../../../components/Upload/ImageUpload";
import MultipleUpload from "../../../components/Upload/MultipleUpload";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";
import {
  useEditproductMutation,
  useGetAllProductCategoryQuery,
} from "../../../service/product";
import Spinner from "../../../components/Spinner/Spinner";
import { toast } from "react-toastify";
import MultiSelectDropdown from "../../../components/FormInput/MultiSelectDropDown";
import { useLocation, useNavigate } from "react-router-dom";
import { BackArrowIcon } from "../../../assets/svg/CustomSVGs";
import { Button } from "../../../components/ui/button";
import { PackageCheck } from "lucide-react";

const EditProduct: React.FC = () => {
  const [editProduct, { isLoading }] = useEditproductMutation();
  const { userInfo } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  //   const [mainImage, setMainImage] = useState<string>("");
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const { data } = useGetAllProductCategoryQuery();
  const location = useLocation();
  const { product } = location.state || {};

  console.log(product, "remilekun");
  const initialValues = {
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    categoryId: product?.categoryId || 0,
    gender: product?.gender || "",
    material: product?.material || "",
    stock: product?.stock || 0,
  };

  const onSubmit = async (formData: {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    gender: string;
    material: string;
    stock: number;
  }) => {
    try {
      const requiredData = {
        name: formData.name,
        material: formData.material,
        price: formData.price,
        gender: formData.gender,
        description: formData.description,
        sizes: sizes.length === 0 ? product.sizes : sizes,
        colors: colors.length === 0 ? product.colors : colors,
        // mainImage: mainImage,
        thumbnails: thumbnails.length === 0 ? product.thumbnails : thumbnails,
        stock: formData.stock,
        vendorId: userInfo?.Vendor?.id,
        categoryId: formData.categoryId,
      };
      const response = await editProduct({
        body: requiredData,
        productId: product.id,
      }).unwrap();
      console.log(response);
      toast.success(response?.message || "Product updated successfully!");
      resetForm({ values: initialValues });
      setColors([]);
      setSizes([]);
      // setMainImage("");
      setThumbnails([]);
      navigate("/product-management");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Product description is required"),
    gender: Yup.string().required("Product gender is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    categoryId: Yup.string().required("Product category is required"),
    material: Yup.string().required("Material is required"),
    stock: Yup.number().required("Stock number is required"),
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const subcategoryItems = data?.data
    .flatMap((category: any) => category.subCategories)
    .flatMap((subCategory: any) => subCategory.items)
    .map((item: any) => ({ id: item.id, name: item.name }));

  return (
    <div className="">
      <Navbar title="Product Management" subtitle="Manage your products here" />
      <div className="mx-auto max-w-[1500px] px-4 py-6 md:px-8 md:py-8 lg:px-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 flex items-center gap-2 text-xs font-semibold text-[#566170] hover:text-[#151A22]"
      >
        <BackArrowIcon />
        Back to products
      </button>
        <div className="overflow-hidden rounded-[2rem] border border-[#151A22]/[.07] bg-[#F8F7F3]">
          <div className="flex justify-between gap-4 bg-[#151A22] p-6 text-white md:items-end md:p-8"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#AEBCC7]">Catalogue editor</p><h2 className="mt-2 font-spaceGrotesk text-3xl font-semibold tracking-[-.04em]">Edit product</h2><p className="mt-2 text-sm text-white/55">Refine this listing without disrupting its existing storefront data.</p></div><PackageCheck className="hidden text-white/25 md:block" size={46}/></div>

          <form onSubmit={handleSubmit} className="space-y-8 p-5 md:p-8">
            <section className="rounded-[1.5rem] border border-[#151A22]/[.07] bg-white p-5 md:p-6"><div className="mb-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#6F8294]">01 · Essentials</p><h3 className="mt-1 font-spaceGrotesk text-xl font-semibold">Product information</h3></div><div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormInput
                id="name"
                label="Product Name"
                name="name"
                placeholder="Enter product name"
                type="text"
                onChange={handleChange}
                defaultValue={values.name}
                required
                onBlur={handleBlur}
                error={touched.name ? (errors.name as string) : undefined}
              />
              <FormInput
                id="gender"
                label="Gender"
                name="gender"
                placeholder="Enter gender"
                type="cSelect"
                selectOptions={gender}
                keyPropertyName="name"
                defaultValue={values.gender}
                valuePropertyName="name"
                required
                itemPropertyName="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.gender ? (errors.gender as string) : undefined}
              />
            </div><div className="mt-5">

            <FormInput
              id="description"
              label="Product Description"
              type="textarea"
              name="description"
              required
              placeholder="Enter product description"
              onChange={handleChange}
              defaultValue={values.description}
              onBlur={handleBlur}
              error={
                touched.description ? (errors.description as string) : undefined
              }
            />
            </div></section><section className="rounded-[1.5rem] border border-[#151A22]/[.07] bg-[#EEF1F3] p-5 md:p-6"><div className="mb-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#6F8294]">02 · Classification</p><h3 className="mt-1 font-spaceGrotesk text-xl font-semibold">Category & variants</h3></div><div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormInput
                id="price"
                label="Product Price"
                name="price"
                type="number"
                placeholder="Enter product price"
                required
                defaultValue={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price ? (errors.price as string) : undefined}
              />

              <FormInput
                id="categoryId"
                label="Product Category"
                name="categoryId"
                placeholder="Enter product category"
                type="cSelect"
                selectOptions={subcategoryItems}
                keyPropertyName="name"
                required
                searchFunc
                defaultValue={values.categoryId === 0 ? "" : values.categoryId}
                valuePropertyName="id"
                itemPropertyName="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.categoryId ? (errors.categoryId as string) : undefined
                }
              />
            </div><div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <MultiSelectDropdown
                label="Sizes"
                options={fashionSizes}
                onChange={(values) => setSizes(values as string[])}
              />
              <MultiSelectDropdown
                label="Colors"
                options={VENDOR_COLORS}
                onChange={(values) => setColors(values as string[])}
              />
            </div></section>
            {/* <ImageUpload
              setDocument={setMainImage}
              isBase64={true}
              title="Main Image"
            /> */}
            <section className="rounded-[1.5rem] border border-[#151A22]/[.07] bg-white p-5 md:p-6"><div className="mb-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#6F8294]">03 · Presentation</p><h3 className="mt-1 font-spaceGrotesk text-xl font-semibold">Product imagery</h3></div><div className="flex flex-col">
              <p className="font-medium text-[#15191E] text-sm flex gap-2 items-center">
                Product Images <span className="text-base text-red-500">*</span>
              </p>
              <MultipleUpload images={thumbnails} setImages={setThumbnails} />
            </div></section>

            <section className="rounded-[1.5rem] border border-[#151A22]/[.07] bg-[#DCE4E8] p-5 md:p-6"><div className="mb-5"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#566170]">04 · Commerce</p><h3 className="mt-1 font-spaceGrotesk text-xl font-semibold">Inventory & material</h3></div><div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormInput
                id="stock"
                label="Stock"
                name="stock"
                type="number"
                required
                placeholder="Enter stock"
                onChange={handleChange}
                onBlur={handleBlur}
                defaultValue={values.stock}
                error={touched.price ? (errors.price as string) : undefined}
              />

              <FormInput
                id="material"
                label="Product material"
                name="material"
                placeholder="Enter product material"
                type="cSelect"
                selectOptions={fashionMaterials}
                keyPropertyName="name"
                searchFunc
                defaultValue={values.material}
                required
                valuePropertyName="name"
                itemPropertyName="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.material ? (errors.material as string) : undefined
                }
              />
            </div></section>

            <Button size="lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Save product changes"}
            </Button>
          </form>
        </div>
      </div></div>
  );
};

export default EditProduct;
