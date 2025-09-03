import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Step8AdditionalInfo({ register }) {
  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Additional Information</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="additionalInfo">
            Is there anything else you&apos;d like us to know about you?
          </Label>
          <Textarea
            id="additionalInfo"
            {...register("additionalInfo")}
            className="min-h-32"
          />
        </div>
      </div>
    </>
  );
}
