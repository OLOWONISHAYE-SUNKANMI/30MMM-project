export default function DiscountCodeInput({
  onApplyDiscount = (newWidgetId, percentage) => {},
}: {
  onApplyDiscount?: (newWidgetId: string, percentage: number) => void;
}) {
  console.log(onApplyDiscount);
  return <div>Discount Code Input Placeholder</div>;
}
