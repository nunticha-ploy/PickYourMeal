import MenuItem from "./MenuItem";

const MenuItemList = ({ menuItems }) => {
  return (
    <div>
      {menuItems && menuItems.length > 0 ? (
        menuItems.map((item) => (
          <MenuItem key={item._id} menuItem={item} />
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default MenuItemList;