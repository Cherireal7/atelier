import { RoutePlaceholder } from '../../components/RoutePlaceholder';

export default function CartPage() {
  return (
    <RoutePlaceholder
      route="/cart"
      tag="CSR"
      strategy="Client-side rendering"
      transport="fetch on mount"
      arrives="Step 6"
    />
  );
}
