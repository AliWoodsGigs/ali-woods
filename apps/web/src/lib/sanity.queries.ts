import { Gig, Video } from "@/types";
import sanityClient from "./sanity.client";

type HomeProps = {
  gigs: Gig[];
  videos: Video[];
};

const gigQuery = `*[_type == "gig"] | order(date asc)`;
const videoQuery = `*[_type == "video"] | order(date desc)`;

const homeQuery = `{
  "gigs": ${gigQuery},
  "videos": ${videoQuery}
}`;

export async function getHomeProps(): Promise<HomeProps> {
  const response = await sanityClient.fetch(homeQuery);
  return response;
}

export async function postEmail(email: string, city?: string, country?: string): Promise<any> {
  const response = await sanityClient.create({
    _type: "subscribers",
    email,
    city,
    country
  });
  return response;
}
