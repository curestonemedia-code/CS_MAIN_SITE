"use client";

import { useState } from "react";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14033.273570394473!2d77.045641!3d28.485092!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19559d21f213%3A0xa736733167a5023b!2sCure%20Stone!5e0!3m2!1sen!2sin!4v1782981388299!5m2!1sen!2sin";

/**
 * Footer map. An embedded map swallows wheel events, so scrolling the page with
 * the cursor over it stalls. The map stays inert until clicked and locks again
 * when the cursor leaves.
 */
export default function MapEmbed() {
  const [active, setActive] = useState(false);
  return (
    <div className="absolute inset-0" onMouseLeave={() => setActive(false)}>
      <iframe
        src={MAP_SRC}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="opacity-90"
        title="Cure Stone Hospital Location"
      />
      {!active && (
        <button
          type="button"
          aria-label="Click to interact with the map"
          onClick={() => setActive(true)}
          className="absolute inset-0 cursor-pointer bg-transparent"
        />
      )}
    </div>
  );
}
