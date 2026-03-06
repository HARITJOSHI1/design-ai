// ℹ️ Import the middleware from the middleware sub-package:
import { realtimeMiddleware } from "@inngest/realtime/middleware";
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "design-ai",
  middleware: [realtimeMiddleware()],
});