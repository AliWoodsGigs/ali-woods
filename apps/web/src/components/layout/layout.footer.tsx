import { LinkAnchor, SocialIcons } from "../common";

const LayoutFooter = () => {
  return (
    <footer className="bg-gray-dark text-white-light">
      <div className="container grid grid-cols-1 gap-12 py-16 sm:grid-cols-2">
        {/* Name & Links */}
        <div className="flex h-full flex-col justify-between gap-8">
          <h2 className="text-heading text-red">Ali Woods</h2>
          <LinkAnchor hasUnderline={false} href="/#gigs">
            Live Shows
          </LinkAnchor>
          <LinkAnchor hasUnderline={false} href="/#videos">
            Videos
          </LinkAnchor>
          <LinkAnchor hasUnderline={false} href="/#newsletter">
            Newsletter
          </LinkAnchor>
        </div>
        {/* Contact */}
        <div className="flex flex-col justify-between gap-8">
          <div className="flex gap-16 fill-red sm:justify-end ">
            <SocialIcons />
          </div>
          <div className="flex flex-col gap-2 sm:text-end">
            <p className="font-bold">Contact</p>
            <LinkAnchor href="https://gagreflex.co.uk/acts/ali-woods/">
              Booking Enquiries
            </LinkAnchor>
            <LinkAnchor href="mailto:georgi@gagreflex.co.uk">
              Live bookings
            </LinkAnchor>
            <LinkAnchor href="mailto:elena@themillaragency.com">
              Social Media Partnerships
            </LinkAnchor>
            <LinkAnchor href="mailto:hannah@gagreflex.co.uk">
              Corporate bookings
            </LinkAnchor>
            <LinkAnchor href="mailto:lawrence@thegaltonagency.com">
              Acting & Commercial Work
            </LinkAnchor>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LayoutFooter;
