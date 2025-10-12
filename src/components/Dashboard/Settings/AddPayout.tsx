import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormInput from "../../../components/FormInput";
import {
  useGetVendorBankDetailsQuery,
  useUpdateVendorBankDetailsMutation,
  useDeleteVendorBankDetailsMutation,
} from "../../../service/vendor";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";
import { toast } from "react-toastify";
import Spinner from "../../Spinner/Spinner";

const AddPayout = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { userInfo } = useAppSelector(selectAuth);
  const vendorId = userInfo?.Vendor?.id;

  const {
    data: bankDetails,
    isLoading: isLoadingBankDetails,
    refetch,
  } = useGetVendorBankDetailsQuery(vendorId, {
    skip: !vendorId,
  });

  const [updateBankDetails, { isLoading: isUpdating }] =
    useUpdateVendorBankDetailsMutation();
  const [deleteBankDetails, { isLoading: isDeleting }] =
    useDeleteVendorBankDetailsMutation();

  const initialValues = {
    bankName: "",
    accountNumber: "",
    accountName: "",
  };

  const formSchema = Yup.object().shape({
    bankName: Yup.string().required("Bank name is required"),
    accountNumber: Yup.string()
      .required("Account number is required")
      .matches(/^\d+$/, "Account number must be numeric"),
    accountName: Yup.string().required("Account name is required"),
  });

  // Use effect to populate form with existing bank details
  useEffect(() => {
    if (bankDetails && isEditing) {
      formik.setValues({
        bankName: bankDetails?.data?.bankName || "",
        accountNumber: bankDetails?.data?.accountNumber || "",
        accountName: bankDetails?.data?.accountName || "",
      });
    }
  }, [bankDetails, isEditing]);

  const onSubmit = async (data: typeof initialValues) => {
    if (!vendorId) {
      toast.error("Vendor ID not found");
      return;
    }

    try {
      await updateBankDetails({
        vendorId,
        body: data,
      }).unwrap();

      toast.success(
        isEditing
          ? "Bank details updated successfully!"
          : "Bank details added successfully!"
      );
      setShowModal(false);
      setIsEditing(false);
      refetch();
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "data" in error
          ? (error.data as { message?: string })?.message ||
            "Failed to save bank details"
          : "Failed to save bank details";
      toast.error(errorMessage);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!vendorId) {
      toast.error("Vendor ID not found");
      return;
    }

    if (window.confirm("Are you sure you want to delete your bank details?")) {
      try {
        await deleteBankDetails(vendorId).unwrap();
        toast.success("Bank details deleted successfully!");
        refetch(); // Refresh the data
      } catch (error: unknown) {
        const errorMessage =
          error && typeof error === "object" && "data" in error
            ? (error.data as { message?: string })?.message ||
              "Failed to delete bank details"
            : "Failed to delete bank details";
        toast.error(errorMessage);
      }
    }
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setShowModal(true);
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    ...formik
  } = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit,
    validateOnChange: true,
    validateOnBlur: true,
  });

  console.log(bankDetails);
  return (
    <>
      <div className="py-6">
        <div className="bg-white border rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Payout Account</h2>

          {isLoadingBankDetails ? (
            <div className="flex justify-center py-4">
              <Spinner />
            </div>
          ) : bankDetails ? (
            <div className="border p-4 rounded-md mb-4 bg-gray-50">
              <p className="font-semibold text-gray-800">Bank Details</p>
              <div className="mt-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Bank Name:</span>{" "}
                  {bankDetails?.data?.bankName}
                </p>
                <p>
                  <span className="font-medium">Account Number:</span>{" "}
                  {bankDetails?.data?.accountNumber}
                </p>
                <p>
                  <span className="font-medium">Account Name:</span>{" "}
                  {bankDetails?.data?.accountName}
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 mb-4">No payout account added yet.</p>
          )}

          <button
            onClick={handleAddNew}
            className="bg-pryColor text-white px-4 py-2 rounded hover:bg-secColor transition-colors"
            disabled={isUpdating || isDeleting}
          >
            {bankDetails ? "Update Payout Account" : "Add Payout Account"}
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white p-10 rounded-lg w-full max-w-xl relative shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowModal(false);
                setIsEditing(false);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-4xl cursor-pointer"
              aria-label="Close"
            >
              &times;
            </button>

            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Payout Account" : "Add Payout Account"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 ">
                {/* Bank Name */}
                <FormInput
                  placeholder="Bank Name"
                  type="text"
                  id="bankName"
                  name="bankName"
                  error={touched.bankName ? errors.bankName : undefined}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values.bankName as string}
                />

                {/* Account Number */}
                <FormInput
                  placeholder="Account Number"
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  error={
                    touched.accountNumber ? errors.accountNumber : undefined
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values.accountNumber as string}
                />

                {/* Account Name */}
                <FormInput
                  placeholder="Account Name"
                  type="text"
                  id="accountName"
                  name="accountName"
                  error={touched.accountName ? errors.accountName : undefined}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values.accountName as string}
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6 text-right">
                <button
                  type="submit"
                  className="bg-pryColor text-white px-6 py-3 rounded-md hover:bg-secColor transition-colors disabled:opacity-50"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPayout;
