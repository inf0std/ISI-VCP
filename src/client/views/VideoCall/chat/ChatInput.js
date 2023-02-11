import React, { useContext, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
export default function () {
  const [message, setMessage] = useState();
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMessage("");
        }}
        className="btn1"
      >
        <div>
          <div className="flex">
            <textarea
              className=" border rounded h-8"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />

            <button type="submit" className="px-2">
              <RiSendPlaneFill color="blue" size="1.5rem" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
