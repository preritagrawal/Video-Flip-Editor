import React from "react";
import useAppStore, { session } from "../store/videostore";
import clsx from "clsx";

const Header: React.FC = () => {
  return (
    <header className="flex items-center w-full px-3 py-5">
      <h1 className="px-3 py-2 text-xl font-bold text-primary">Cropper</h1>
      <div className="flex justify-center w-full text-center">
        <div className="flex px-2 py-1 text-sm bg-secondary rounded-xl text-primary">
          <SessionButton type="Preview">Preview Session</SessionButton>
          <SessionButton type="Generate">Generate Session</SessionButton>
        </div>
      </div>
    </header>
  );
};

export default Header;

function SessionButton({
  children,
  type,
}: {
  children: React.ReactNode;
  type: session;
}) {
  const { session, setSession } = useAppStore();
  return (
    <button
      className={clsx("px-3 py-2", type === session && "selected")}
      onClick={() => setSession(type)}
    >
      {children}
    </button>
  );
}
