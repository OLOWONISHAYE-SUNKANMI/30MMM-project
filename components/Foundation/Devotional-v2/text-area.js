export default function ReflectionResponse({
  label = "Your Response",
  placeholder = "Enter your reflection...",
  rows = 5,
  maxLength,
  required = false,
  className = "",
  onSubmit,
}) {
  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      <label className="mb-2 block text-sm font-medium text-black">
        {label}
        {required && <span className="ml-1 text-gray-600">*</span>}
      </label>

      {/* Textarea */}
      <textarea
        rows={rows}
        maxLength={maxLength}
        required={required}
        placeholder={placeholder}
        className="w-full resize-none rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-black transition-all duration-200 ease-in-out placeholder:text-gray-400 hover:border-gray-400 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
      />

      {/* Character Counter (if maxLength is provided) */}
      {maxLength && (
        <div className="mt-2 text-right text-xs text-gray-500">
          0 / {maxLength} characters
        </div>
      )}

      {/* Submit Button */}
      <button
        type="button"
        onClick={onSubmit}
        className="mx-auto mt-4 flex rounded-lg bg-primary-red px-6 py-3 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-primary-red focus:ring-offset-2 active:scale-[0.98]"
      >
        Submit Reflection
      </button>
    </div>
  );
}
