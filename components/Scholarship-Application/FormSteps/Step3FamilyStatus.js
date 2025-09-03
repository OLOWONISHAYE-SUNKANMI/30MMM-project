import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Step3FamilyStatus = ({ register, watch, setValue, errors }) => {
  // Watch relevant fields for conditional rendering
  const relationshipStatus = watch("relationshipStatus");
  const hasChildren = watch("hasChildren");
  const childrenCount = watch("childrenCount") || 0;

  // Set up state to track child forms
  const [childForms, setChildForms] = useState([]);

  // Update child forms when childrenCount changes
  useEffect(() => {
    const numChildren = parseInt(childrenCount, 10) || 0;

    // Create array of child forms based on count
    setChildForms(Array.from({ length: numChildren }, (_, i) => i + 1));

    // Clear data for children that no longer exist
    if (numChildren < childForms.length) {
      for (let i = numChildren + 1; i <= childForms.length; i++) {
        setValue(`child${i}Name`, "");
        setValue(`child${i}Age`, "");
        setValue(`child${i}Relationship`, "");
        setValue(`child${i}CurrentMarriage`, "");
        setValue(`child${i}PreviousRelationship`, "");
        setValue(`child${i}OtherRelationship`, "");
        setValue(`child${i}OtherPreviousRelationship`, "");
      }
    }
  }, [childrenCount, setValue, childForms.length]);

  // Handle relationship status change
  const handleRelationshipStatusChange = (value) => {
    setValue("relationshipStatus", value);

    // Clear the "other" field if not needed
    if (value !== "other") {
      setValue("otherRelationshipStatus", "");
    }

    // Clear marriage date if not married
    if (value !== "married") {
      setValue("marriageDate", "");
    }
  };

  // Handle has children change
  const handleHasChildrenChange = (value) => {
    setValue("hasChildren", value);

    // Clear children data if no children
    if (value === "no") {
      setValue("childrenCount", "0");
      setChildForms([]);
    }
  };

  // Helper function for handling relationship changes
  const handleRelationshipChange = (childNumber, value) => {
    setValue(`child${childNumber}Relationship`, value);

    // Clear "other" field if not needed
    if (value !== "other") {
      setValue(`child${childNumber}OtherRelationship`, "");
    }
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">
        Family and Relationship Status
      </h2>

      <div className="space-y-6">
        {/* Relationship Status */}
        <div className="space-y-2">
          <Label htmlFor="relationshipStatus">
            What is your current relationship status?
          </Label>
          <Select
            value={relationshipStatus}
            onValueChange={handleRelationshipStatusChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {["Single", "Married", "Divorced", "Widowed", "Other"].map(
                (option) => (
                  <SelectItem
                    key={option}
                    value={option.toLowerCase()}
                  >
                    {option}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>

          {/* Other relationship status field */}
          {relationshipStatus === "other" && (
            <div className="mt-2">
              <Label htmlFor="otherRelationshipStatus">Please specify:</Label>
              <Input
                id="otherRelationshipStatus"
                {...register("otherRelationshipStatus", {
                  required: relationshipStatus === "other",
                })}
                placeholder="Please specify your relationship status"
              />
              {errors.otherRelationshipStatus && (
                <span className="text-sm text-red-500">
                  Please specify your relationship status
                </span>
              )}
            </div>
          )}
        </div>

        {/* Marriage Date - Only shown if married */}
        {relationshipStatus === "married" && (
          <div className="space-y-2">
            <Label htmlFor="marriageDate">
              What is the date of your marriage?
            </Label>
            <Input
              id="marriageDate"
              type="date"
              {...register("marriageDate", {
                required: relationshipStatus === "married",
              })}
            />
            {errors.marriageDate && (
              <span className="text-sm text-red-500">
                Please provide your marriage date
              </span>
            )}
          </div>
        )}

        {/* Number of marriages */}
        <div className="space-y-2">
          <Label htmlFor="marriageCount">
            How many times have you been married?
          </Label>
          <Input
            id="marriageCount"
            type="number"
            min="0"
            defaultValue="0"
            {...register("marriageCount", {
              required: true,
              min: 0,
              valueAsNumber: true,
            })}
          />
          {errors.marriageCount && (
            <span className="text-sm text-red-500">
              Please provide a valid number
            </span>
          )}
        </div>

        {/* Do you have children? */}
        <div className="space-y-2">
          <Label>Do you have children?</Label>
          <RadioGroup
            defaultValue="no"
            value={hasChildren}
            onValueChange={handleHasChildrenChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes"
                id="hasChildrenYes"
              />
              <Label htmlFor="hasChildrenYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no"
                id="hasChildrenNo"
              />
              <Label htmlFor="hasChildrenNo">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* If has children, show count field */}
        {hasChildren === "yes" && (
          <div className="space-y-2">
            <Label htmlFor="childrenCount">
              How many children do you have?
            </Label>
            <Input
              id="childrenCount"
              type="number"
              min="0"
              defaultValue="0"
              {...register("childrenCount", {
                required: hasChildren === "yes",
                min: 1,
                valueAsNumber: true,
              })}
            />
            {errors.childrenCount && (
              <span className="text-sm text-red-500">
                Please provide a valid number of children
              </span>
            )}
          </div>
        )}

        {/* Child details forms - generated based on childrenCount */}
        {hasChildren === "yes" &&
          childForms.map((childNumber) => (
            <Card
              key={`child-${childNumber}`}
              className="mt-4"
            >
              <CardHeader>
                <CardTitle>Child {childNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Child name */}
                  <div>
                    <Label htmlFor={`child${childNumber}Name`}>Name:</Label>
                    <Input
                      id={`child${childNumber}Name`}
                      {...register(`child${childNumber}Name`, {
                        required: true,
                      })}
                    />
                    {errors[`child${childNumber}Name`] && (
                      <span className="text-sm text-red-500">
                        Name is required
                      </span>
                    )}
                  </div>

                  {/* Child age */}
                  <div>
                    <Label htmlFor={`child${childNumber}Age`}>Age:</Label>
                    <Input
                      id={`child${childNumber}Age`}
                      type="number"
                      min="0"
                      {...register(`child${childNumber}Age`, {
                        required: true,
                        min: 0,
                        valueAsNumber: true,
                      })}
                    />
                    {errors[`child${childNumber}Age`] && (
                      <span className="text-sm text-red-500">
                        Valid age is required
                      </span>
                    )}
                  </div>

                  {/* Relationship to you - FIXED VERSION */}
                  <div>
                    <Label className="mb-2 block">Relationship to You:</Label>
                    <RadioGroup
                      defaultValue=""
                      value={watch(`child${childNumber}Relationship`) || ""}
                      onValueChange={(value) =>
                        handleRelationshipChange(childNumber, value)
                      }
                      className="space-y-2"
                    >
                      {["Biological", "Adopted", "Stepchild", "Other"].map(
                        (type) => (
                          <div
                            key={`${childNumber}-${type}`}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={type.toLowerCase()}
                              id={`child${childNumber}Relationship${type}`}
                            />
                            <Label
                              htmlFor={`child${childNumber}Relationship${type}`}
                            >
                              {type}
                            </Label>
                          </div>
                        ),
                      )}
                    </RadioGroup>
                    {errors[`child${childNumber}Relationship`] && (
                      <span className="mt-1 block text-sm text-red-500">
                        Please select a relationship
                      </span>
                    )}

                    {/* Show "please specify" if Other is selected */}
                    {watch(`child${childNumber}Relationship`) === "other" && (
                      <div className="mt-2">
                        <Label htmlFor={`child${childNumber}OtherRelationship`}>
                          Please specify:
                        </Label>
                        <Input
                          id={`child${childNumber}OtherRelationship`}
                          {...register(`child${childNumber}OtherRelationship`, {
                            required:
                              watch(`child${childNumber}Relationship`) ===
                              "other",
                          })}
                        />
                      </div>
                    )}
                  </div>

                  {/* Is this child from current marriage */}
                  <div>
                    <Label className="mb-2 block">
                      Is this child from your current marriage?
                    </Label>
                    <RadioGroup
                      defaultValue="no"
                      value={watch(`child${childNumber}CurrentMarriage`) || ""}
                      onValueChange={(value) =>
                        setValue(`child${childNumber}CurrentMarriage`, value)
                      }
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="yes"
                          id={`child${childNumber}CurrentMarriageYes`}
                        />
                        <Label
                          htmlFor={`child${childNumber}CurrentMarriageYes`}
                        >
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="no"
                          id={`child${childNumber}CurrentMarriageNo`}
                        />
                        <Label htmlFor={`child${childNumber}CurrentMarriageNo`}>
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors[`child${childNumber}CurrentMarriage`] && (
                      <span className="text-sm text-red-500">
                        Please make a selection
                      </span>
                    )}
                  </div>

                  {/* If not from current marriage, ask about relationship source */}
                  {watch(`child${childNumber}CurrentMarriage`) === "no" && (
                    <div>
                      <Label className="mb-2 block">
                        Is this child from a previous marriage or relationship?
                      </Label>
                      <RadioGroup
                        defaultValue=""
                        value={
                          watch(`child${childNumber}PreviousRelationship`) || ""
                        }
                        onValueChange={(value) => {
                          setValue(
                            `child${childNumber}PreviousRelationship`,
                            value,
                          );

                          // Clear "other" field if not needed
                          if (value !== "other") {
                            setValue(
                              `child${childNumber}OtherPreviousRelationship`,
                              "",
                            );
                          }
                        }}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="previous-marriage"
                            id={`child${childNumber}PrevMarriage`}
                          />
                          <Label htmlFor={`child${childNumber}PrevMarriage`}>
                            Previous Marriage
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="previous-relationship"
                            id={`child${childNumber}PrevRelationship`}
                          />
                          <Label
                            htmlFor={`child${childNumber}PrevRelationship`}
                          >
                            Previous Relationship
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="other"
                            id={`child${childNumber}PrevOther`}
                          />
                          <Label htmlFor={`child${childNumber}PrevOther`}>
                            Other
                          </Label>
                        </div>
                      </RadioGroup>
                      {errors[`child${childNumber}PreviousRelationship`] && (
                        <span className="text-sm text-red-500">
                          Please make a selection
                        </span>
                      )}

                      {/* Show "please specify" if Other is selected */}
                      {watch(`child${childNumber}PreviousRelationship`) ===
                        "other" && (
                        <div className="mt-2">
                          <Label
                            htmlFor={`child${childNumber}OtherPreviousRelationship`}
                          >
                            Please specify:
                          </Label>
                          <Input
                            id={`child${childNumber}OtherPreviousRelationship`}
                            {...register(
                              `child${childNumber}OtherPreviousRelationship`,
                              {
                                required:
                                  watch(
                                    `child${childNumber}PreviousRelationship`,
                                  ) === "other",
                              },
                            )}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
};

export default Step3FamilyStatus;
