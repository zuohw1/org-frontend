import Request from '../../utils/request';

const MenuService = {
  async addLogRecord(param) {
    return Request.post('leaderLogRecord/addPageName', param);
  },
};

export default MenuService;
