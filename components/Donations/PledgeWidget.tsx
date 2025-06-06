export function PledgeWidget({
  widgetId,
  onLoaded = () => {},
}: {
  widgetId: string;
  onLoaded?: () => void;
}) {
  console.log(widgetId);
  return <div>Pledge Widget Placeholder</div>;
}
