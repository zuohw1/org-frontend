import Request from '../../utils/request';

const MenuService = {
  async getList() {
    return Request.get('menuItemReg/menuList');
  },
};

export default MenuService;
