import { RoutePlaceholder } from '../../components/RoutePlaceholder';

export default function CollectionPage() {
  return (
    <RoutePlaceholder
      route="/collection"
      tag="SSR"
      strategy="Server-side rendering"
      transport="GraphQL over HTTP"
      arrives="Step 5"
    />
  );
}
