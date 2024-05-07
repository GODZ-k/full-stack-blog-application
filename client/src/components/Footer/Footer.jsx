import React from "react";

function Footer() {
  const footer = [
    {
      name: "Help",
      slug: "/help",
    },
    {
      name: "Status",
      slug: "/help",
    },
    {
      name: "About",
      slug: "/help",
    },
    {
      name: "Careers",
      slug: "/help",
    },{
      name: "Blog",
      slug: "/help",
    },{
      name: "Privacy",
      slug: "/help",
    }
  ];
  return (
    <div className=" border-t border-black flex justify-center items-center py-7">
      <div className="flex gap-4 text-gray-700">
        {footer.map((item) => (
          <div>{item.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Footer;
