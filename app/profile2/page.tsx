"use client";

import { updateProfile } from "@/actions/update-profile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Profile() {
  const [firstTabActive, setFirstTabActive] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    maritalStatus: "",
    childrenCount: "",
    churchAffiliation: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const router = useRouter();

  // Every field uses this function to update the form data.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // The name and value of the targeted field is deconstructed from the event object.
    // We plug in the previous state of the form data, then overwrite only the targeted field and value.

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    console.log(`Submitting: ${JSON.stringify(formData)}`);
    console.dir("Updated formData: ", formData);

    const formattedData = {
      ...formData,
      birthDate: formData.birthDate ? new Date(formData.birthDate) : null,
      childrenCount: parseInt(formData.childrenCount) || 0,
    };

    const data = await updateProfile({
      profileData: formattedData,
    });
    if (data.success === true && data.updatedUser) {
      console.log("Profile updated successfully:", data);
      toast.success("Profile updated successfully!");
      // Redirect to payment page
      router.push(
        Boolean(data.updatedUser.premium) ? "/Dashboard" : "/payment",
      );
    } else {
      console.error("Failed to update profile");
      toast.error(data.message);
    }
    // try {
    //   const response = await fetch("/api/create-profile", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to save profile");
    //   }

    //   const data = await response.json();
    //   console.log("Profile saved:", data);

    //   // Redirect to payment page
    //   window.location.href = "/payment";
    // } catch (error) {
    //   console.error("Error saving profile:", error);
    //   alert("Error saving profile. Please try again.");
    // }
  };

  return (
    <div className="inset-auto flex md:flex-row flex-col w-screen min-w-[400px] min-h-screen">
      <div className="top-2 left-2 z-20 before:static fixed bg-white/80 max-md:shadow-md py-1 rounded-md" />

      {/* Image Container - Matched to reference styling */}
      <div className="-z-50 sm:self-stretch md:order-2 bg-jesus-hero bg-white md:bg-clip-border md:bg-origin-border bg-cover md:bg-cover bg-no-repeat bg-center max-md:bg-top md:bg-top-4 max-md:w-full md:w-3/4 max-md:h-fit min-h-72 aspect-[773/499] md:overflow-x-clip max-xs:scale-x-125" />

      {/* Form Container - Updated to match reference */}
      <div className="z-10 flex flex-col max-md:justify-between md:justify-between md:items-center gap-1 md:gap-3 md:pt-7 w-full md:w-1/2 md:h-full">
        <Image
          className="block z-10 mx-auto -mt-16 md:mt-16"
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
        />

        <h1 className="md:mb-6 font-semibold text-4xl text-center">
          Create Your Profile
        </h1>

        {/* Tab Selector */}
        <div className="inline-flex flex-row justify-between items-stetch gap-x-3 bg-gray-bg mx-10 my-mx-52 rounded-3xl min-h-max md:overflow-y-hidden text-center md: my">
          <button
            onClick={() => setFirstTabActive(true)}
            className={`h-full w-full text-nowrap rounded-3xl py-2 pe-2 ps-4 text-base font-light hover:bg-almost-black hover:font-medium hover:text-white active:bg-almost-black active:font-medium active:text-white ${
              firstTabActive ? "bg-almost-black font-medium text-white" : ""
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setFirstTabActive(false)}
            className={`h-full w-full text-nowrap rounded-3xl py-2 pe-4 ps-3 text-base font-light hover:bg-almost-black hover:font-medium hover:text-white active:bg-almost-black active:font-medium active:text-white ${
              firstTabActive ? "" : "bg-almost-black font-medium text-white"
            }`}
          >
            Address
          </button>
        </div>

        {/* Form */}
        <form className="flex-auto space-y-4 px-4 pt-4 w-full h-full">
          {firstTabActive ? (
            <>
              <label
                htmlFor="firstName"
                className="block mx-8"
              >
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
                  className="block bg-blue-50/75 focus:bg-blue-50/50 focus:shadow-md mt-1 focus:border-white border-transparent rounded-xl focus:ring-0 w-full"
                  placeholder="First Name"
                />
              </label>
              <label
                htmlFor="lastName"
                className="block mx-8"
              >
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={formData.lastName}
                  className="block bg-blue-50/75 focus:bg-blue-50/50 focus:shadow-md mt-1 focus:border-white border-transparent rounded-xl focus:ring-0 w-full"
                  placeholder="Last Name"
                />
              </label>
              <label
                htmlFor="birthdate"
                className="block mx-8"
              >
                <input
                  type="date"
                  name="birthdate"
                  onChange={handleChange}
                  value={formData.birthDate}
                  className="block bg-blue-50/75 focus:bg-blue-50/50 focus:shadow-md mt-1 focus:border-white border-transparent rounded-xl focus:ring-0 w-full"
                  placeholder="Birthdate"
                />
              </label>
              <label
                htmlFor="maritalStatus"
                className="block mx-8"
              >
                <input
                  type="text"
                  name="maritalStatus"
                  onChange={handleChange}
                  value={formData.maritalStatus}
                  className="block bg-blue-50/75 focus:bg-blue-50/50 focus:shadow-md mt-1 focus:border-white border-transparent rounded-xl focus:ring-0 w-full"
                  placeholder="Marital Status"
                />
              </label>
              <div className="block px-8">
                <button
                  onClick={() => setFirstTabActive(false)}
                  className="flow-root relative place-self-center bg-primary-red hover:bg-primary-red/90 my-6 py-2 rounded-2xl w-full"
                >
                  <span className="font-medium text-white text-lg text-center tracking-wider">
                    NEXT
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <label
                htmlFor="email"
                className="block mx-8"
              >
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="block bg-blue-50/75 focus:bg-blue-50/50 focus:shadow-md mt-1 focus:border-white border-transparent rounded-xl focus:ring-0 w-full"
                  placeholder="Email"
                />
              </label>
              <label
                htmlFor="telephone"
                className="block mx-8"
              >
                <input
                  type="tel"
                  name="telephone"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                  className="block bg-blue-50/75 focus:bg-blue-50/50 focus:shadow-md mt-1 focus:border-white border-transparent rounded-xl focus:ring-0 w-full"
                  placeholder="Phone Number"
                />
              </label>
              <label
                htmlFor="address"
                className="block mx-8"
              >
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  value={formData.address}
                  className="block bg-blue-50/75 focus:bg-blue-50/50 focus:shadow-md mt-1 focus:border-white border-transparent rounded-xl focus:ring-0 w-full"
                  placeholder="Address"
                />
              </label>
              <div className="block px-8">
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="flow-root relative place-self-center bg-primary-red hover:bg-primary-red/90 my-6 py-2 rounded-2xl w-full"
                >
                  <span className="font-medium text-white text-lg text-center tracking-wider">
                    Create Profile and Move to Payment
                  </span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
