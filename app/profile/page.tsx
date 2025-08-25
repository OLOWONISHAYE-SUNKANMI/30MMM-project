"use client";

import { useState } from "react";
import Image from "next/image";
import ErrorMessage from "@/components/common/Forms/error-message";
import * as validators from "./form-validators";

export default function Profile() {
  const [firstTabActive, setFirstTabActive] = useState(true);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    maritalStatus: "",
    email: "",
    telephone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    maritalStatus: "",
    childrenCount: "",
    churchAffiliation: "",
    email: "",
    telephone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const validateForm = () => {
    const newErrors = {
      firstName: validators.validateFirstName(formData.firstName),
      lastName: validators.validateLastName(formData.lastName),
      birthdate: validators.validateBirthdate(formData.birthdate),
      maritalStatus: validators.validateMaritalStatus(formData.maritalStatus),
      email: validators.validateEmail(formData.email),
      telephone: validators.validateTelephone(formData.telephone),
      address: validators.validateAddress(formData.address),
      city: validators.validateCity(formData.city),
      state: validators.validateState(formData.state),
      zipcode: validators.validateZipcode(formData.zipcode),
    };

    setErrors(newErrors);

    // Return true if no errors exist
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data as before
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate the field and update errors
    let errorMessage = "";

    switch (name) {
      case "firstName":
        errorMessage = validators.validateFirstName(value);
        break;
      case "lastName":
        errorMessage = validators.validateLastName(value);
        break;
      case "birthdate":
        errorMessage = validators.validateBirthdate(value);
        break;
      case "maritalStatus":
        errorMessage = validators.validateMaritalStatus(value);
        break;
      case "email":
        errorMessage = validators.validateEmail(value);
        break;
      case "telephone":
        errorMessage = validators.validateTelephone(value);
        break;
      case "address":
        errorMessage = validators.validateAddress(value);
        break;
      case "city":
        errorMessage = validators.validateCity(value);
        break;
      case "state":
        errorMessage = validators.validateState(value);
        break;
      case "zipcode":
        errorMessage = validators.validateZipcode(value);
        break;
    }

    // Update the error state for this specific field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate the entire form
    if (!validateForm()) {
      alert("Please correct the errors before submitting");
      return;
    }

    console.log(`Submitting: ${JSON.stringify(formData)}`);

    try {
      const response = await fetch("/api/create-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      const data = await response.json();
      console.log("Profile saved:", data);

      window.location.href = "/payment";
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    }
  };

  const validateFirstTab = () => {
    const firstTabErrors = {
      firstName: validators.validateFirstName(formData.firstName),
      lastName: validators.validateLastName(formData.lastName),
      birthdate: validators.validateBirthdate(formData.birthdate),
      maritalStatus: validators.validateMaritalStatus(formData.maritalStatus),
    };

    // Update errors for first tab fields
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...firstTabErrors,
    }));

    return Object.values(firstTabErrors).every((error) => error === "");
  };

  const handleNextTab = () => {
    if (validateFirstTab()) {
      setFirstTabActive(false);
    } else {
      alert("Please complete all fields on this tab before continuing");
    }
  };

  return (
    <div className="inset-auto flex min-h-screen w-screen min-w-[400px] flex-col md:flex-row">
      <div className="fixed left-2 top-2 z-20 rounded-md bg-white/80 py-1 before:static max-md:shadow-md" />

      {/* Image Container - Matched to reference styling */}
      <div className="-z-50 aspect-[773/499] min-h-72 bg-white bg-jesus-hero bg-cover bg-center bg-no-repeat max-md:h-fit max-md:w-full max-md:bg-top max-xs:scale-x-125 sm:self-stretch md:order-2 md:w-3/4 md:overflow-x-clip md:bg-cover md:bg-clip-border md:bg-top-4 md:bg-origin-border" />

      {/* Form Container - Updated to match reference */}
      <div className="z-10 flex w-full flex-col gap-1 max-md:justify-between md:h-full md:w-1/2 md:items-center md:justify-between md:gap-3 md:pt-7">
        <Image
          className="z-10 mx-auto -mt-16 block md:mt-16"
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
          priority
        />

        <h1 className="text-center text-4xl font-semibold md:mb-6">
          Create Your Profile
        </h1>

        {/* Tab Selector */}
        <div className="my-mx-52 md: my items-stetch mx-10 inline-flex min-h-max flex-row justify-between gap-x-3 rounded-3xl bg-gray-bg text-center md:overflow-y-hidden">
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
        <form className="h-full w-full flex-auto space-y-4 px-4 pt-4">
          {firstTabActive ? (
            <>
              <label
                htmlFor="firstName"
                className="mx-8 block"
              >
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
                  className={`mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0 ${
                    errors.firstName ? "bg-red-50/75 ring-2 ring-red-500" : ""
                  }`}
                  placeholder="First Name"
                />
                <ErrorMessage error={errors.firstName} />
              </label>

              <label
                htmlFor="lastName"
                className="mx-8 block"
              >
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={formData.lastName}
                  className={`mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0 ${
                    errors.lastName ? "bg-red-50/75 ring-2 ring-red-500" : ""
                  }`}
                  placeholder="Last Name"
                />
                <ErrorMessage error={errors.lastName} />
              </label>

              <label
                htmlFor="birthdate"
                className="mx-8 block"
              >
                <input
                  type="date"
                  name="birthdate"
                  onChange={handleChange}
                  value={formData.birthdate}
                  className={`mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0 ${
                    errors.birthdate ? "bg-red-50/75 ring-2 ring-red-500" : ""
                  }`}
                  placeholder="Birthdate"
                />
                <ErrorMessage error={errors.birthdate} />
              </label>

              <label
                htmlFor="maritalStatus"
                className="mx-8 block"
              >
                <select
                  name="maritalStatus"
                  onChange={handleChange}
                  value={formData.maritalStatus}
                  className={`mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0 ${
                    errors.maritalStatus
                      ? "bg-red-50/75 ring-2 ring-red-500"
                      : ""
                  }`}
                >
                  <option
                    value=""
                    disabled
                  >
                    Select Marital Status
                  </option>
                  <option value="single">Single</option>
                  <option value="dating">Dating</option>
                  <option value="engaged">Engaged</option>
                  <option value="married">Married</option>
                  <option value="separated">Separated</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
                <ErrorMessage error={errors.maritalStatus} />
              </label>

              <div className="block px-8">
                <button
                  type="button"
                  onClick={handleNextTab}
                  className="relative my-6 flow-root w-full place-self-center rounded-2xl bg-primary-red py-2 hover:bg-primary-red/90"
                >
                  <span className="text-center text-lg font-medium tracking-wider text-white">
                    NEXT
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <label
                htmlFor="email"
                className="mx-8 block"
              >
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  placeholder="Email"
                />
                <ErrorMessage error={errors.email} />
              </label>
              <label
                htmlFor="telephone"
                className="mx-8 block"
              >
                <input
                  type="tel"
                  name="telephone"
                  onChange={handleChange}
                  value={formData.telephone}
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  placeholder="Phone Number"
                />
                <ErrorMessage error={errors.telephone} />
              </label>
              <label
                htmlFor="address"
                className="mx-8 block"
              >
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  value={formData.address}
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  placeholder="Address"
                />
                <ErrorMessage error={errors.address} />
              </label>
              <label
                htmlFor="city"
                className="mx-8 block"
              >
                <input
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={formData.city}
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  placeholder="City"
                />
                <ErrorMessage error={errors.city} />
              </label>
              <label
                htmlFor="state"
                className="mx-8 block"
              >
                <input
                  type="text"
                  name="state"
                  onChange={handleChange}
                  value={formData.state}
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  placeholder="State"
                />
                <ErrorMessage error={errors.state} />
              </label>
              <label
                htmlFor="zipcode"
                className="mx-8 block"
              >
                <input
                  type="text"
                  name="zipcode"
                  onChange={handleChange}
                  value={formData.zipcode}
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  placeholder="Zipcode"
                />
                <ErrorMessage error={errors.zipcode} />
              </label>
              <div className="block px-8">
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="relative my-6 flow-root w-full place-self-center rounded-2xl bg-primary-red py-2 hover:bg-primary-red/90"
                >
                  <span className="text-center text-lg font-medium tracking-wider text-white">
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
