import { postEmail } from "@/lib/sanity.queries";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { email, country } = req.body;

    // Validate email and country
    if (!email || !country) {
      return res.status(400).json({ message: "Email and Country are required" });
    }

    try {
      const response = await postEmail(email, country);

      if (response?.email === email) {
        res.status(200).json({ message: "Successfully signed up!" });
      } else {
        res.status(500).json({ message: "Error submitting email" });
      }
    } catch (error) {
      console.error("Error in handler:", error);
      res.status(500).json({ message: "Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
