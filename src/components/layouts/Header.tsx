import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Badge } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import { FaBars, FaCartShopping } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { navItems } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { examService } from "../../store/services/examService";
import { signout, useCurrentToken } from "../../store/slices/authSlice";
import { useCurrentCartCount } from "../../store/slices/cartSlice";
import type { TCourseContent } from "../../types";
import Form from "../common/Form/Form";
import HeaderSearchField from "../common/Form/HeaderSearchField";
import logo from "/Logo.png";

type Props = {
  to: string;
  label: boolean;
  children: ReactNode;
};

const OditiNavLink = ({ to, label, children }: Props) => {
  const className = "relative text-white/80 hover:text-white px-4 py-1.5 rounded-full transition-all text-sm font-medium inline-flex items-center";
  const activeClassName = "relative bg-primary text-white px-4 py-1.5 rounded-full text-sm font-semibold inline-flex items-center";

  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? activeClassName : className)}
    >
      {label && (
        <span className="bg-white text-primary text-[8px] font-bold px-1.5 py-0.5 rounded-full absolute -top-2 -right-1 leading-none">
          Live
        </span>
      )}
      {children}
    </NavLink>
  );
};

const LogoutModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const signoutHandler = () => {
    setIsOpen(false);
    dispatch(signout());
  };

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-white text-primary border border-primary text-[10px] md:text-xs font-semibold py-1 px-2.5 lg:px-4 lg:py-2 rounded lg:rounded-lg cursor-pointer"
      >
        Logout
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-40 focus:outline-none"
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 z-50 w-screen bg-black/40 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-rose-600"
              >
                Signout Modal
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-slate-800">
                Are you sure you want to signout?
              </p>
              <div className="flex justify-end items-center gap-2 mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-slate-200 px-3 py-1.5 text-sm/6 font-semibold text-slate-700 shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-rose-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white cursor-pointer"
                  onClick={signoutHandler}
                >
                  Signout!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

// const items: MenuProps["items"] = [
//   {
//     label: <a href="/about-us">About us</a>,
//     key: "0",
//   },

//   {
//     label: <a href="/articles">Blog</a>,
//     key: "1",
//   },
// ];

const OditiNav = ({
  isNavOpen,
  setIsNavOpen,
}: {
  isNavOpen: boolean;
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [exams, setExams] = useState<TCourseContent[]>([]);
  const { data: examData, isSuccess: examSuccess } =
    examService.useGetTodaysExamsQuery(undefined);

  useEffect(() => {
    if (examSuccess && examData?.data) {
      setExams(examData.data.result);
    }
  }, [examData, examSuccess]);

  // const categoryItems: MenuProps["items"] = categories.map((c, i) => ({
  //   label: <a href={`/courses?category=${c._id}`}>{c.name}</a>,
  //   key: i,
  // }));

  return (
    <div
      className={`${isNavOpen ? "right-0" : "-right-[250px]"
        } fixed lg:relative top-0 lg:block bg-black  lg:bg-transparent z-50 w-[250px] lg:w-auto lg:right-0 h-full lg:h-auto p-7 lg:p-0 shadow-lg lg:shadow-none transition-all`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-1 lg:border lg:border-primary/40 lg:px-3 lg:py-2 lg:rounded-full lg:shadow-[0_0_18px_rgba(32,178,87,0.25)] lg:bg-white/5 lg:backdrop-blur-sm">
        {/* <Dropdown menu={{ items: categoryItems }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
            <Space className="hover:text-primary hover:-translate-y-0.5 transition-all">
              Our Courses
              <IoIosArrowDown />
            </Space>
          </a>
        </Dropdown> */}
        {navItems.map((item, index) => (
          <OditiNavLink key={index} to={item.path} label={exams?.length > 0}>
            {item.name}
          </OditiNavLink>
        ))}
        {/* <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
            <Space className="hover:text-primary hover:-translate-y-0.5 transition-all">
              More
              <IoIosArrowDown />
            </Space>
          </a>
        </Dropdown> */}
      </div>
      <div
        className="size-8 bg-black text-white flex justify-center items-center  absolute top-0 right-0 lg:hidden"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <IoClose className="size-7" />
      </div>
    </div>
  );
};

const Header = () => {
  const token = useAppSelector(useCurrentToken);
  const cartCount = useAppSelector(useCurrentCartCount);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const searchHandler = (data: FieldValues) => {
    if (data?.searchTerm) {
      window.location.href = `/courses?searchTerm=${data?.searchTerm}`;
    }
  };

  return (
    <div className="xl:bg-header lg:bg-header pt-6 pb-4 lg:py-3 lg:shadow-md   bg-gradient-to-r from-[#090913]  to-[#0d0d15] border-b border-white/10">
      <div className="max-w-[1240px] xl:w-full bg-header flex justify-between items-center mx-5 xl:mx-auto px-3 py-3 rounded-4xl gap-2 shadow-md lg:shadow-none lg:py-0 bg-gradient-to-r from-[#090913]  to-[#0d0d15] text-white">
        <Link to={"/"}>
          <div className="w-12 lg:w-20">
            <img src={logo} alt="" className="w-full" />
          </div>
        </Link>

        <OditiNav isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />

        <div className="flex justify-end items-center gap-2 lg:gap-3 text-white">
          <Form onSubmit={searchHandler}>
            <HeaderSearchField name="searchTerm" placeholder="Search Courses" />
          </Form>
          <div className="flex items-center gap-1.5">
            <Link to={`${token ? "/dashboard" : "/auth/login"}`}>
              <Button className="bg-primary border border-primary text-white text-[10px] md:text-xs font-semibold py-1 px-2.5 lg:px-4 lg:py-2 rounded lg:rounded-lg lg:ml-3 cursor-pointer">
                {token ? "Dashboard" : "Login"}
              </Button>
            </Link>
            {token && <LogoutModal />}
          </div>
          <Link to={"/checkout"}>
            <Badge count={cartCount} showZero>
              <FaCartShopping className="size-5 lg:size-6 text-white mt-2.5" />
            </Badge>
          </Link>
          <div
            className="lg:hidden cursor-pointer"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <FaBars className="size-5 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
