import { RoutePlaceholder } from '../../components/RoutePlaceholder';

export default function CheckoutPage() {
  return (
    <RoutePlaceholder
      route="/checkout"
      tag="SSE"
      strategy="SSR + EventSource"
      transport="Server-Sent Events"
      arrives="Step 7"
    />
  );
}
