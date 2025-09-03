import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Step6BackgroundInterests({
  register,
  watch,
  setValue,
  errors,
}) {
  // Watch for fields that might need conditional rendering
  const educationLevel = watch("educationLevel");
  const employmentStatus = watch("employmentStatus");
  const industry = watch("industry");

  // Handle education level change
  const handleEducationLevelChange = (value) => {
    setValue("educationLevel", value);

    // Clear other specification if not needed
    if (value !== "other") {
      setValue("otherEducationLevel", "");
    }
  };

  // Handle employment status change
  const handleEmploymentStatusChange = (value) => {
    setValue("employmentStatus", value);

    // Clear other specification if not needed
    if (value !== "other") {
      setValue("otherEmploymentStatus", "");
    }

    // Clear industry if not employed
    if (value === "unemployed" || value === "student" || value === "retired") {
      setValue("industry", "");
      setValue("otherIndustry", "");
    }
  };

  // Handle industry change
  const handleIndustryChange = (value) => {
    setValue("industry", value);

    // Clear other specification if not needed
    if (value !== "other") {
      setValue("otherIndustry", "");
    }
  };

  // Handle hobby selection changes

  const handleHobbyChange = (hobby, checked) => {
    // Get current hobbies array from form state
    const currentHobbies = watch("hobbies") || [];

    // Update the form value (adding or removing the hobby)
    if (checked) {
      setValue("hobbies", [...currentHobbies, hobby]);
    } else {
      setValue(
        "hobbies",
        currentHobbies.filter((h) => h !== hobby),
      );

      // Clear other specification if "other" is unchecked
      if (hobby === "other") {
        setValue("otherHobbies", "");
      }
    }
  };

  // Helper to check if a hobby is selected
  const isHobbySelected = (hobby) => {
    const hobbies = watch("hobbies") || [];
    return hobbies.includes(hobby);
  };

  // Helper to determine if industry field should be shown
  const shouldShowIndustry = () => {
    const status = watch("employmentStatus");
    return (
      status === "fullTime" ||
      status === "partTime" ||
      status === "selfEmployed" ||
      status === "other"
    );
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Background and Interests</h2>

      <div className="space-y-6">
        {/* Origin Location */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">
            Where are you from originally?
          </Label>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="originCity">City:</Label>
              <Input
                id="originCity"
                {...register("originCity", { required: true })}
              />
              {errors.originCity && (
                <span className="text-sm text-red-500">
                  Please provide your city of origin
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="originStateCountry">State/Country:</Label>
              <Input
                id="originStateCountry"
                {...register("originStateCountry", { required: true })}
              />
              {errors.originStateCountry && (
                <span className="text-sm text-red-500">
                  Please provide your state or country of origin
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Education Level */}
        <div className="space-y-2">
          <Label>What is your highest level of education?</Label>
          <Select
            value={educationLevel}
            onValueChange={handleEducationLevelChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="highSchool">High School Diploma</SelectItem>
              <SelectItem value="associate">Associate Degree</SelectItem>
              <SelectItem value="bachelor">Bachelor&apos;s Degree</SelectItem>
              <SelectItem value="master">Master&apos;s Degree</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.educationLevel && (
            <span className="text-sm text-red-500">
              Please select your education level
            </span>
          )}

          {/* Other education specification */}
          {educationLevel === "other" && (
            <div className="mt-2">
              <Label htmlFor="otherEducationLevel">Please specify:</Label>
              <Input
                id="otherEducationLevel"
                {...register("otherEducationLevel", {
                  required: educationLevel === "other",
                })}
              />
              {errors.otherEducationLevel && (
                <span className="text-sm text-red-500">
                  Please specify your education level
                </span>
              )}
            </div>
          )}
        </div>

        {/* Employment Status */}
        <div className="space-y-2">
          <Label>What is your current employment status?</Label>
          <Select
            value={employmentStatus}
            onValueChange={handleEmploymentStatusChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select employment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fullTime">Employed Full-Time</SelectItem>
              <SelectItem value="partTime">Employed Part-Time</SelectItem>
              <SelectItem value="selfEmployed">Self-Employed</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.employmentStatus && (
            <span className="text-sm text-red-500">
              Please select your employment status
            </span>
          )}

          {/* Other employment specification */}
          {employmentStatus === "other" && (
            <div className="mt-2">
              <Label htmlFor="otherEmploymentStatus">Please specify:</Label>
              <Input
                id="otherEmploymentStatus"
                {...register("otherEmploymentStatus", {
                  required: employmentStatus === "other",
                })}
              />
              {errors.otherEmploymentStatus && (
                <span className="text-sm text-red-500">
                  Please specify your employment status
                </span>
              )}
            </div>
          )}
        </div>

        {/* Industry - Only shown if employed */}
        {shouldShowIndustry() && (
          <div className="space-y-2">
            <Label>What industry do you work in?</Label>
            <Select
              value={industry}
              onValueChange={handleIndustryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="businessFinance">
                  Business/Finance
                </SelectItem>
                <SelectItem value="ministryNonprofit">
                  Ministry/Nonprofit
                </SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.industry && (
              <span className="text-sm text-red-500">
                Please select your industry
              </span>
            )}

            {/* Other industry specification */}
            {industry === "other" && (
              <div className="mt-2">
                <Label htmlFor="otherIndustry">Please specify:</Label>
                <Input
                  id="otherIndustry"
                  {...register("otherIndustry", {
                    required: industry === "other",
                  })}
                />
                {errors.otherIndustry && (
                  <span className="text-sm text-red-500">
                    Please specify your industry
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Hobbies and Interests */}
        <div className="space-y-3">
          <Label className="block text-lg font-medium">
            What are your hobbies or interests?
          </Label>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Card className="border p-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hobbySports"
                  checked={isHobbySelected("sports")}
                  onChange={(e) =>
                    handleHobbyChange("sports", e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label
                  htmlFor="hobbySports"
                  className="pt-0.5 leading-none"
                >
                  Sports/Exercise
                </Label>
              </div>
            </Card>

            <Card className="border p-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hobbyReading"
                  checked={isHobbySelected("reading")}
                  onChange={(e) =>
                    handleHobbyChange("reading", e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label
                  htmlFor="hobbyReading"
                  className="pt-0.5 leading-none"
                >
                  Reading/Writing
                </Label>
              </div>
            </Card>

            <Card className="border p-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hobbyMusic"
                  checked={isHobbySelected("music")}
                  onChange={(e) => handleHobbyChange("music", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label
                  htmlFor="hobbyMusic"
                  className="pt-0.5 leading-none"
                >
                  Music/Arts
                </Label>
              </div>
            </Card>

            <Card className="border p-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hobbyVolunteering"
                  checked={isHobbySelected("volunteering")}
                  onChange={(e) =>
                    handleHobbyChange("volunteering", e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label
                  htmlFor="hobbyVolunteering"
                  className="pt-0.5 leading-none"
                >
                  Volunteering
                </Label>
              </div>
            </Card>

            <Card className="border p-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hobbyOther"
                  checked={isHobbySelected("other")}
                  onChange={(e) => handleHobbyChange("other", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label
                  htmlFor="hobbyOther"
                  className="pt-0.5 leading-none"
                >
                  Other
                </Label>
              </div>
            </Card>
          </div>

          {/* Other hobby specification */}
          {isHobbySelected("other") && (
            <div className="mt-2">
              <Label htmlFor="otherHobbies">
                Please specify other hobbies:
              </Label>
              <Input
                id="otherHobbies"
                {...register("otherHobbies", {
                  required: isHobbySelected("other"),
                })}
              />
              {errors.otherHobbies && (
                <span className="text-sm text-red-500">
                  Please specify your other hobbies
                </span>
              )}
            </div>
          )}
        </div>

        {/* Additional information fields from original form */}
        <div>
          <Label htmlFor="cleanInterestReason">
            Please explain why CLEAN interests you and what you hope to gain
            from the program. Also, please include any information about
            scholarship needs.
          </Label>
          <Textarea
            id="cleanInterestReason"
            {...register("cleanInterestReason", { required: true })}
            className="min-h-32"
            placeholder="Share your interest in the program and any scholarship needs..."
          />
          {errors.cleanInterestReason && (
            <span className="text-sm text-red-500">
              Please provide information about your interest in the program
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="futurePlans">
            Is there anything you feel called to do or become involved in?
          </Label>
          <Textarea
            id="futurePlans"
            {...register("futurePlans", { required: false })}
            className="min-h-32"
            placeholder="Share about any callings or future plans you may have..."
          />
        </div>
      </div>
    </>
  );
}
