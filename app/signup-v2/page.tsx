import Divider from "@/components/signup-v2/divider";
import Form from "@/components/signup-v2/form";
import FormHeader from "@/components/signup-v2/form-header";
import GoogleBtn from "@/components/signup-v2/google-btn";

export default function SignUp() {
  return (
    <div className="inset-auto flex min-h-screen w-screen min-w-[400px] flex-col md:flex-row">
      {/* Image Container - Matched to reference styling */}
      <div className="-z-50 aspect-[773/499] min-h-72 bg-white bg-jesus-hero bg-cover bg-center bg-no-repeat max-md:w-full max-md:bg-top max-xs:scale-x-125 sm:self-stretch md:order-2 md:w-3/4 md:overflow-x-clip md:bg-cover md:bg-clip-border md:bg-top-4 md:bg-origin-border" />

      {/* Form Header: Image and Text */}
      <div className="w-full md:w-3/4">
        <FormHeader />

        {/* Google Sign Up Button */}
        <GoogleBtn />

        {/* Divider */}
        <Divider />

        {/* Form */}
        <Form />
      </div>
    </div>
  );
}
