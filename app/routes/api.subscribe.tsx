import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return json({ success: false, message: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();
    const email = formData.get("email");

    if (!email || typeof email !== "string") {
      return json({ success: false, message: "Email is required" }, { status: 400 });
    }

    // Here you would typically save the email to your database or send it to your email service
    console.log("Subscribing email:", email);

    // For now, we'll just return a success response
    return json({ success: true, message: "Subscription successful" });
  } catch (error) {
    console.error("Error processing subscription:", error);
    return json(
      { success: false, message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
