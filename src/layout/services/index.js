import Request from '../../utils/request';

const MenuService = {
  async getList() {
    return Request.get('menuitemReg/menulist');
  },
};

export default MenuService;
