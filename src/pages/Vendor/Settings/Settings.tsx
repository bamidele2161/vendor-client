import { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { useAppSelector } from "../../../hooks";
import { selectAuth } from "../../../store/slice/authSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormInput from "../../../components/FormInput";
import AddPayout from "../../../components/Dashboard/Settings/AddPayout";
import ResetPassword from "../../../components/Dashboard/Settings/ResetPassword";
import { Button } from "../../../components/ui/button";

const Settings = () => {
  const { userInfo } = useAppSelector(selectAuth);
  const [activeTab, setActiveTab] = useState("personal");
  const initialValues = {
    fullName: userInfo?.fullName || "",
    email: userInfo?.email || "",
    phoneNumber: userInfo?.phoneNumber || "",
    address: userInfo?.address || "",
    businessName: userInfo?.Vendor?.businessName,
  };

  const formSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().required("Email or Phone number is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
      validateOnChange: true,
      validateOnBlur: true,
      validateOnMount: true,
    });

  return (
    <div className="">
      <Navbar title="Settings" subtitle="Manage your profile here" />
      <div className="mx-auto max-w-[1500px] p-4 md:p-8 lg:p-10">
        <div className="mb-6">
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#6F8294]">Workspace preferences</p>
          <h1 className="font-spaceGrotesk text-3xl font-semibold tracking-[-.04em] text-[#151A22]">Store settings</h1>
          <p className="mt-1 text-sm text-[#566170]">
            Update and manage your account settings
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto rounded-full border border-[#151A22]/[.07] bg-[#F8F7F3] p-1.5">
          <ul className="flex min-w-max text-sm font-medium">
            <li>
              <button
                onClick={() => setActiveTab("personal")}
                className={`rounded-full px-5 py-2.5 transition ${
                  activeTab === "personal"
                    ? "bg-[#151A22] text-white"
                    : "text-[#566170] hover:bg-[#EEF1F3] hover:text-[#151A22]"
                }`}
              >
                Personal Information
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("pay")}
                className={`rounded-full px-5 py-2.5 transition ${
                  activeTab === "pay"
                    ? "bg-[#151A22] text-white"
                    : "text-[#566170] hover:bg-[#EEF1F3] hover:text-[#151A22]"
                }`}
              >
                Payout
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("store")}
                className={`rounded-full px-5 py-2.5 transition ${
                  activeTab === "store"
                    ? "bg-[#151A22] text-white"
                    : "text-[#566170] hover:bg-[#EEF1F3] hover:text-[#151A22]"
                }`}
              >
                Security
              </button>
            </li>
          </ul>
        </div>

        {/* Personal Information Tab Content */}
        {activeTab === "personal" && (
          <div className="rounded-[1.75rem] border border-[#151A22]/[.07] bg-[#F8F7F3] p-5 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Profile Picture */}
                <div className="md:col-span-2 mb-2 flex items-center rounded-[1.25rem] bg-[#DCE4E8] p-4">
                  <div className="mr-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#151A22]">
                    <span className="font-spaceGrotesk text-2xl text-white">
                      {userInfo?.fullName?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#151A22]">Profile identity</p><p className="mt-1 text-xs text-[#566170]">Your account details appear across the vendor workspace.</p>
                  </div>
                </div>

                {/* Full name */}
                <FormInput
                  label="Full name"
                  placeholder="Full name"
                  type="text"
                  id={"fullName"}
                  name="fullName"
                  error={
                    touched.fullName ? (errors.fullName as string) : undefined
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values?.fullName}
                />

                <FormInput
                  label="Business name"
                  placeholder="Business name"
                  type="text"
                  id={"businessName"}
                  name="businessName"
                  error={
                    touched.businessName
                      ? (errors.businessName as string)
                      : undefined
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values?.businessName}
                />

                <FormInput
                  label="Email address"
                  placeholder="Email address"
                  type="text"
                  id={"email"}
                  name="email"
                  error={touched.email ? (errors.email as string) : undefined}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values?.email}
                />

                <FormInput
                  label="Phone number"
                  placeholder="Phone number"
                  type="text"
                  id={"phoneNumber"}
                  name="phoneNumber"
                  error={
                    touched.phoneNumber
                      ? (errors.phoneNumber as string)
                      : undefined
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values?.phoneNumber}
                />

                <FormInput
                  label="Business address"
                  placeholder="Business address"
                  type="text"
                  id={"address"}
                  name="address"
                  error={
                    touched.address ? (errors.address as string) : undefined
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values?.address}
                />
              </div>
              {/* Submit Button */}
              <div className="md:col-span-2 mt-6">
                <Button size="lg" type="submit">Save changes</Button>
              </div>
            </form>
          </div>
        )}

        {/* Store Settings Tab Content */}
        {activeTab === "store" && (
          // <div className="bg-white p-6 rounded-lg shadow-sm">
          //   <h3 className="text-lg font-medium text-gray-900 mb-4">
          //     Store Settings
          //   </h3>
          //   <p className="text-gray-500">
          //     Manage your store settings, including location, currency, and
          //     shipping options.
          //   </p>
          //   <ComingSoon />
          // </div>
          <ResetPassword />
        )}

        {/* Payout*/}
        {activeTab === "pay" && <AddPayout />}
      </div>
    </div>
  );
};

export default Settings;
