import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { protectedNavItems } from "../../constants";
import { Collapse } from "antd";

type Props = {
  to: string;
  children: ReactNode;
};

const SidebarNavLink = ({ to, children }: Props) => {
  const className =
    "text-white hover:text-primary rounded-lg font-medium px-4 py-1.5";
  const activeClassName =
    "bg-primary text-white rounded-lg font-medium px-4 py-1.5";

  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? activeClassName : className)}
    >
      {children}
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <div className="md:col-span-2 h-max ">
      {/* <div className="md:hidden">
        <Collapse
          items={[
            {
              key: "1",
              label: "Menu",
              children: (
                <div className="grid gap-2">
                  {protectedNavItems.map((item) => (
                    <SidebarNavLink key={item.path} to={item.path}>
                      {item.name}
                    </SidebarNavLink>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>

      <div className="hidden md:grid gap-2">
        {protectedNavItems.map((item) => (
          <SidebarNavLink key={item.path} to={item.path}>
            {item.name}
          </SidebarNavLink>
        ))}
      </div> */}
    </div>
  );
};

export default Sidebar;
