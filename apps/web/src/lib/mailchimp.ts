import axios from "axios";
import crypto from "crypto";

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY!;
const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX!;

/**
 * Upserts (creates or updates) a subscriber in Mailchimp.
 * @param email - Subscriber's email
 * @param city - Subscriber's city (optional)
 * @param country - Subscriber's country (optional)
 */
export async function upsertMailchimpSubscriber(email: string, city?: string, country?: string) {
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_AUDIENCE_ID || !MAILCHIMP_SERVER_PREFIX) {
    throw new Error("Mailchimp API credentials are missing");
  }

  const subscriberHash = crypto.createHash("md5").update(email.toLowerCase().trim()).digest("hex");
  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_AUDIENCE_ID}/members/${subscriberHash}`;

  try {
    // Use a single `PUT` request to upsert the subscriber
    const response = await axios.put(
      url,
      {
        email_address: email,
        status_if_new: "subscribed",
        merge_fields: { CITY: city || "", COUNTRY: country || "" },
      },
      {
        headers: { Authorization: `Bearer ${MAILCHIMP_API_KEY}` },
      }
    );

    console.log("Mailchimp Upsert Success:", response.data);
  } catch (error) {
    console.error(
      "Mailchimp API Error:",
      (error as any).response?.data || (error as any).message
    );
    throw new Error("Failed to upsert Mailchimp subscriber");
  }
}
