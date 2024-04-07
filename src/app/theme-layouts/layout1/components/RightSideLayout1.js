import { memo } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse"; // Added missing import
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { useDispatch, useSelector } from 'react-redux';
import { setChangeForm } from "app/store/changeFormReducer";


function RightSideLayout1(props) {
  const [openMenus, setOpenMenus] = React.useState([]);
  const dispatch = useDispatch();
  
  const handleClick = (id) => {
    setOpenMenus((prevOpenMenus) => {
      const isOpen = prevOpenMenus.includes(id);
      return isOpen ? prevOpenMenus.filter((menuId) => menuId !== id) : [...prevOpenMenus, id];
    });
  };

  const drawerWidth = 240;
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
    dispatch(setChangeForm(`${name}`)); // تغییر متغیر changeForm
    console.log("changeForm",changeForm)
  };
  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
         
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor:'rgb(32 123 350)',
          },
        }}
        variant="permanent"
        // anchor="right"
        
      >
        <Toolbar />
        <h1 className="text-white text-center">نام شرکت</h1>
        <List
          sx={{ width: "100%", maxWidth: 360 }}
          component="nav"
          dir="rtl"
          aria-labelledby="nested-list-subheader"
          className="text-white "
        >
          {Menu.map((item) => (
            <React.Fragment key={item.id} dir="rtl">
              <ListItemButton onClick={() => handleClick(item.id)} className="bg-[#6695ff] m-8 rounded-xl text-right" >
                <ListItemText primary={item.title} />
                {openMenus.includes(item.id) ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openMenus.includes(item.id)} sx={{
                background: 'rgb(98,149,255)',
                background: 'linear-gradient(90deg, rgba(98,149,255,1) 0%, rgba(41,111,255,1) 75%)',
              }} timeout="auto" unmountOnExit className="-mt-8 rounded-xl mx-8 ">
                <List component="div" disablePadding >
                  {item.items.map((subItem) => (
                    <ListItemButton key={subItem.id} sx={{ pl: 4 }} className="text-right" >
                      <ListItemText primary={subItem.name} onClick={()=>handleChangeForm(subItem.name)} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default RightSideLayout1;
