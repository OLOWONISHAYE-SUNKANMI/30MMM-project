"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Settings() {
  const { authState } = useAuth();
  const [firstTabActive, setFirstTabActive] = useState(true);
  const [loading, setLoading] = useState(true);
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

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (authState.isAuthenticated && authState.user?.id) {
        try {
          const response = await fetch(`/api/create-profile`);
          if (response.ok) {
            const data = await response.json();
            if (data.profile) {
              setFormData({
                firstName: data.profile.firstName || "",
                lastName: data.profile.lastName || "",
                birthDate: data.profile.birthDate
                  ? new Date(data.profile.birthDate).toISOString().split("T")[0]
                  : "",
                maritalStatus: data.profile.maritalStatus || "",
                childrenCount: data.profile.childrenCount?.toString() || "",
                churchAffiliation: data.profile.churchAffiliation || "",
                email: data.profile.email || authState.user.email || "",
                phoneNumber: data.profile.phoneNumber || "",
                address: data.profile.address || "",
                city: data.profile.city || "",
                state: data.profile.state || "",
                zipcode: data.profile.zipcode || "",
              });
            }
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [authState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/create-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating profile");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    if (formData.firstName && formData.lastName) {
      return `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase();
    }
    return (
      authState.user?.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "AD"
    );
  };

  if (authState.loading || loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-start gap-2 2xs:gap-3 px-2 2xs:px-4">
        <h1 className="mt-16 2xs:mt-18 xs:mt-20 text-center text-2xl 2xs:text-3xl xs:text-4xl font-semibold">
          Edit Profile
        </h1>
        <div className="grid size-16 2xs:size-18 xs:size-20 items-center justify-center rounded-full bg-rose-600">
          <span className="text-2xl 2xs:text-3xl xs:text-4xl font-extrabold tracking-wider text-white">
            {getInitials()}
          </span>
        </div>
        <Link
          href="/settings/account/avatar"
          className="text-sm 2xs:text-base font-semibold tracking-tight text-primary-red hover:scale-95"
        >
          Upload Picture
        </Link>
        <div className="flex min-h-[200px] w-full max-w-4xl flex-col items-center px-2 2xs:px-4">
          <div className="items-stetch my-2 inline-flex min-h-max flex-row justify-between gap-x-1 2xs:gap-x-2 xs:gap-x-3 overflow-y-hidden rounded-2xl 2xs:rounded-3xl bg-gray-bg p-0.5 text-center">
            <button
              onClick={() => setFirstTabActive(true)}
              className={`h-full w-full text-nowrap rounded-2xl 2xs:rounded-3xl px-1 2xs:px-2 py-1.5 2xs:py-2 text-[10px] 2xs:text-xs font-light hover:bg-almost-black hover:font-medium hover:text-white active:bg-almost-black active:font-medium active:text-white ${firstTabActive ? "bg-almost-black font-medium text-white" : ""}`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setFirstTabActive(false)}
              className={`h-full w-full text-nowrap rounded-2xl 2xs:rounded-3xl px-1 2xs:px-2 py-1.5 2xs:py-2 text-[10px] 2xs:text-xs font-light hover:bg-almost-black hover:font-medium hover:text-white active:bg-almost-black active:font-medium active:text-white ${firstTabActive ? "" : "bg-almost-black font-medium text-white"}`}
            >
              Address
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="text-sm 2xs:text-base my-2 2xs:my-3 grid h-min w-full flex-auto grid-cols-1 content-baseline items-center gap-y-1.5 2xs:gap-y-2 font-normal sm:grid-cols-2"
          >
            {!!firstTabActive && (
              <>
                <label
                  htmlFor="firstName"
                  className="block px-2 2xs:px-4 xs:px-6 sm:px-8"
                >
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-xl 2xs:rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0 text-sm 2xs:text-base py-2 2xs:py-3"
                    placeholder="First Name"
                  />
                </label>
                <label
                  htmlFor="lastName"
                  className="block px-2 2xs:px-4 xs:px-6 sm:px-8"
                >
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-xl 2xs:rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0 text-sm 2xs:text-base py-2 2xs:py-3"
                    placeholder="Last Name"
                  />
                </label>
                <label
                  htmlFor="birthDate"
                  className="block px-2 2xs:px-4 xs:px-6 sm:px-8"
                >
                  <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-xl 2xs:rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0 text-sm 2xs:text-base py-2 2xs:py-3"
                    placeholder="12-25-1979"
                  />
                </label>
                <label
                  htmlFor="maritalStatus"
                  className="block px-2 2xs:px-4 xs:px-6 sm:px-8"
                >
                  <input
                    type="text"
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-xl 2xs:rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0 text-sm 2xs:text-base py-2 2xs:py-3"
                    placeholder="Marital Status"
                  />
                </label>
                <label
                  htmlFor="childrenCount"
                  className="block px-2 2xs:px-4 xs:px-6 sm:px-8"
                >
                  <input
                    type="number"
                    name="childrenCount"
                    value={formData.childrenCount}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-xl 2xs:rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0 text-sm 2xs:text-base py-2 2xs:py-3"
                    placeholder="Number of Children"
                  />
                </label>
                <label
                  htmlFor="churchAffiliation"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="churchAffiliation"
                    value={formData.churchAffiliation}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="Church Affiliation"
                  />
                </label>
              </>
            )}
            {/* Second Tab */}
            {!firstTabActive && (
              <>
                <label
                  htmlFor="email"
                  className="block px-8"
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="Email"
                  />
                </label>
                <label
                  htmlFor="phoneNumber"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="Phone Number"
                  />
                </label>
                <label
                  htmlFor="address"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="Street Address"
                  />
                </label>
                <label
                  htmlFor="city"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="City"
                  />
                </label>
                <label
                  htmlFor="state"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="State"
                  />
                </label>
                <label
                  htmlFor="zipcode"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="Zip Code"
                  />
                </label>
              </>
            )}
          </form>
          <div className="items-stetch my-2 inline-flex min-h-max w-full flex-row gap-x-2 2xs:gap-x-3 rounded-2xl 2xs:rounded-3xl px-2 2xs:px-4 xs:px-6 sm:px-8 max-sm:order-2 max-sm:flex-col max-sm:gap-1.5">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="peer-hover:saturate[0.1] peer w-full rounded-xl 2xs:rounded-2xl border-2 border-primary-red py-2 2xs:py-3 text-sm 2xs:text-base text-primary-red transition-all hover:scale-[.98] hover:bg-primary-red hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="peer w-full rounded-xl 2xs:rounded-2xl bg-primary-red py-2 2xs:py-3 text-sm 2xs:text-base text-white transition-all hover:scale-[.98] hover:border-2 hover:border-primary-red hover:bg-white hover:text-primary-red disabled:opacity-50 peer-hover:saturate-[0.1]"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
