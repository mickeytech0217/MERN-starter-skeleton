import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { styled } from "@mui/system";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import clsx from "clsx";
import UserNavbarHeader from "../../../../shared-components/UserNavbarHeader";
import { setChangeForm } from "app/store/changeFormReducer";

const Root = styled("div")(({ theme }) => ({
  backgroundColor: "rgb(32, 123, 350)", // Fixed RGB value
  color: theme.palette.text.primary,
  "& ::-webkit-scrollbar-thumb": {
    boxShadow: `inset 0 0 0 20px ${
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.24)"
        : "rgba(255, 255, 255, 0.24)"
    }`,
  },
  "& ::-webkit-scrollbar-thumb:active": {
    boxShadow: `inset 0 0 0 20px ${
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.37)"
        : "rgba(255, 255, 255, 0.37)"
    }`,
  },
}));


const StyledContent = styled(FuseScrollbars)(({ theme }) => ({
  overscrollBehavior: "contain",
  overflowX: "hidden",
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 40px, 100% 10px",
  backgroundAttachment: "local, scroll",
}));

function NavbarStyle1Content(props) {
  const [openMenus, setOpenMenus] = useState([]);
  const dispatch = useDispatch();

  const handleClick = (id) => {
    setOpenMenus((prevOpenMenus) => {
      const isOpen = prevOpenMenus.includes(id);
      return isOpen
        ? prevOpenMenus.filter((menuId) => menuId !== id)
        : [...prevOpenMenus, id];
    });
  };

  const Menu = [
    {
      id: 1,
      title: "اطلاعات پایه",
      items: [
        { id: 1, name: "تعریف درختواره سازمانی" },
        { id: 2, name: "تعریف سامانه" },
        { id: 3, name: "تعریف لاگ" },
        { id: 4, name: "تعریف / تایید عامل" },
      ],
    },
    { id: 2, title: "عملیات اصلی", items: [] },
    { id: 3, title: "تنظیمات", items: [] },
  ];

  const handleChangeForm = (name) => {
    dispatch(setChangeForm(`${name}`)); // Fixed dispatch parameter

  };

  return (
    <Root
      className={clsx(
        "flex flex-auto flex-col overflow-hidden h-full",
        props.className
      )}
    >
      <div className="flex flex-row items-center shrink-0 h-48 md:h-72 px-20">
        <div className="w-full flex flex-row items-center space-x-4 justify-center">
          <div className="bg-[#D9D9D9] w-14 h-14 rounded-full" />
          <h1 className="text-center pr-4">نام شرکت</h1>
        </div>
      </div>

      <StyledContent
        className="flex flex-1 flex-col min-h-0"
        option={{ suppressScrollX: true, wheelPropagation: false }}
      >
        <UserNavbarHeader />
        <List
          sx={{ width: "100%", maxWidth: 360 }}
          component="nav"
          dir="rtl"
          aria-labelledby="nested-list-subheader"
          className="text-white"
        >
          {Menu.map((item) => (
            <React.Fragment key={item.id}>
              <ListItemButton
                onClick={() => handleClick(item.id)}
                className="bg-[#6695ff] m-8 rounded-xl text-right"
              >
                <ListItemText primary={item.title} />
                {openMenus.includes(item.id) ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse
                in={openMenus.includes(item.id)}
                sx={{
                  background: 'rgb(102,152,255)',
                  background: 'linear-gradient(90deg, rgba(102,152,255,1) -10%, rgba(53,104,212,1) 10%)',
                }}                
                timeout="auto"
                unmountOnExit
                className="-mt-8 rounded-xl mx-8"
              >
                <List
                  component="div"
                  disablePadding
                >
                  {item.items.map((subItem) => (
                    <ListItemButton
                      key={subItem.id}
                      className="text-right"
                      onClick={() => handleChangeForm(subItem.name)}
                    >
                      <ListItemText primary={subItem.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </StyledContent>
    </Root>
  );
}

export default NavbarStyle1Content;
