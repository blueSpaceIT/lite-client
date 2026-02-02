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
