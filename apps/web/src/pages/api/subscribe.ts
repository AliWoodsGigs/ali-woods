import { postEmail } from "@/lib/sanity.queries";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, city, country } = req.body;

    // Validate email (country and city are optional)
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      // Step 1: Save to Sanity
      const response = await postEmail(email, city, country);

      if (response?.email !== email) {
        throw new Error("Error saving email to Sanity");
      }

      // Step 2: Add to Mailchimp (if applicable)
      // To be added

      // Success response
      res.status(200).json({ message: "Successfully signed up!" });
    } catch (error) {
      console.error("Error in handler:", error);
      res.status(500).json({ message: "Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

