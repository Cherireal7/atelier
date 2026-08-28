import { RoutePlaceholder } from '../../components/RoutePlaceholder';

export default function ConciergePage() {
  return (
    <RoutePlaceholder
      route="/concierge"
      tag="WS"
      strategy="CSR + WebSocket"
      transport="wss:// duplex socket"
      arrives="Step 8"
    />
  );
}
