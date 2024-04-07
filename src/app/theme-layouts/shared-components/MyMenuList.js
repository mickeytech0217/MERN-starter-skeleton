import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, ListItemButton, ListItemText } from '@mui/material';
import { setChangeForm } from 'app/store/userSlice';
import { List } from 'immutable';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const MyMenuList = () => {
    const [openMenus, setOpenMenus] = useState([]);
    const dispatch = useDispatch();
    
    const handleClick = (id) => {
      setOpenMenus((prevOpenMenus) => {
        const isOpen = prevOpenMenus.includes(id);
        return isOpen ? prevOpenMenus.filter((menuId) => menuId !== id) : [...prevOpenMenus, id];
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
      dispatch(setChangeForm(`${name}`)); // تغییر متغیر changeForm
      console.log("changeForm", name); // اصلاح شد: name به جای changeForm
    };

    return (
        <div>
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
        </div>
    );
}

export default MyMenuList;
