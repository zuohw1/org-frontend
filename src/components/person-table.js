import React from 'react';
import {
  Button, Col, Form, Input, Modal, Pagination, Row, Table,
} from 'antd';
import request from '../utils/request';
import AsyncTreeSelect from './async-tree-select';

const FormItem = Form.Item;

/**
 * 带组织的人员选择参照
 * 组织是根据所属权限加载的异步树
 * 使用方法
 * <PersonTable
 * searchEmpNumber={searchEmpNumber}
 * personModal={personModal}
 * setPersonModel={setPersonModel}
 * parentForm={form}
 * />
 * 其中searchEmpNumber：临时存参照选中记录的员工编码
 * personModal: 参照modal框是否弹出
 * setPersonModel: 更新是否弹出属性方法
 * parentForm：父表单，用于回写参照选择的人员编码到父表单
 */
class PersonTable extends React.PureComponent {
  state = {
    search: {
      pageNumber: 1,
      pageSize: 10,
      empName: '',
      empNumber: '',
      orgId: '',
    },
    refData: {
      current: 1, pages: 0, records: Array(0), size: 10, total: 0,
    },
    tableCols: [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
      width: '12%',
    }, {
      title: '员工编号',
      dataIndex: 'empNumber',
      key: 'empNumber',
      align: 'center',
      width: '22%',
    }, {
      title: '员工姓名',
      dataIndex: 'empName',
      key: 'empName',
      align: 'center',
      width: '20%',
    }, {
      title: '所属组织',
      dataIndex: 'orgName',
      key: 'orgName',
      align: 'center',
      width: '40%',
    }],
    refUrl: 'auth/getPersonByOrgId',
    tableLoading: false,
    selectedRowKeys: [],
    onSelect: (row) => {
      const { searchEmpNumber } = this.props;
      this.setState({ selectedRowKeys: [row.key] });
      searchEmpNumber.empNumber = row.empNumber;
    },
  };

  formatTableData = (tableData) => {
    const num = tableData.current * 10 - 10;
    const table = tableData.records.map((item, index) => {
      return { ...item, key: index + 1 + num };
    });
    return { ...tableData, records: table };
  };

  onChangePage = (pageNumber, pageSize) => {
    const { search, refUrl } = this.state;
    const searchF = { ...search, pageSize, pageNumber };
    this.refreshData(refUrl, searchF);
  };

  onChangePageSize = (current, size) => {
    const { search, refUrl } = this.state;
    const searchF = { ...search, pageSize: size, pageNumber: current };
    this.refreshData(refUrl, searchF);
  };

  refreshData = (refUrl, search) => {
    this.setState({ tableLoading: true });
    return new Promise(async (resolve) => {
      let url = `${refUrl}?pageNumber=${search.pageNumber}&pageSize=${search.pageSize}`;
      if (search.orgId && search.orgId !== '') {
        url += `&orgId=${search.orgId}`;
      }
      if (search.empNumber && search.empNumber !== '') {
        url += `&empNumber=${search.empNumber}`;
      }
      if (search.empName && search.empName !== '') {
        url += `&empName=${search.empName}`;
      }
      const tableData = await request.get(url);
      const formatTable = this.formatTableData(tableData);
      this.setState({ refData: formatTable, tableLoading: false, selectedRowKeys: [] });
      resolve();
    });
  };

  render() {
    const {
      searchEmpNumber, form, personModal, setPersonModel, parentForm,
    } = this.props;
    const {
      refData, tableLoading, selectedRowKeys, onSelect, search, tableCols, refUrl,
    } = this.state;
    const {
      current, size, total, records,
    } = refData;
    const { getFieldDecorator } = form;

    /* 异步树相关参数 */
    const treeRefUrl = 'auth/getAuthSubOrgs?topId=';
    const url = 'auth/getInitTree?id=';
    const treeSelectChange = (value, label, extra) => {
      form.setFieldsValue({
        orgId: `${extra.triggerNode.props.id}`,
        orgName: `${extra.triggerNode.props.title}`,
      });
    };

    const onSearch = (e) => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          const select = { ...search, ...values };
          this.setState({ search: select });
          this.refreshData(refUrl, select);
        }
      });
    };

    const onRefSubmit = () => {
      parentForm.setFieldsValue({
        empNumber: searchEmpNumber.empNumber,
      });
      setPersonModel(false);
    };

    const onRefCancel = () => {
      searchEmpNumber.empNumber = '';
      setPersonModel(false);
    };

    const rowSelection = {
      columnWidth: '30px',
      selectedRowKeys,
      onSelect,
    };
    return (
      <Modal
        title="人员参照"
        visible={personModal}
        onOk={onRefSubmit}
        onCancel={onRefCancel}
        maskClosable={false}
        destroyOnClose
        width={900}
      >
        <Form>
          <Row gutter={16}>
            <Col span={6} key={1}>
              <FormItem>
                {getFieldDecorator('orgName', {
                  rules: [{
                    required: true,
                    message: '组织不能为空!',
                  }],
                })(
                  <AsyncTreeSelect
                    treeSelectChange={treeSelectChange}
                    refUrl={treeRefUrl}
                    url={url}
                    treeId={-9999}
                    placeholder="组织"
                  />,
                )}
              </FormItem>
              {getFieldDecorator('orgId')(
                <Input type="hidden" />,
              )}
            </Col>
            <Col span={6} key={2}>
              <FormItem>
                {getFieldDecorator('empNumber')(
                  <Input placeholder="员工编号" />,
                )}
              </FormItem>
            </Col>
            <Col span={6} key={3}>
              <FormItem>
                {getFieldDecorator('empName')(
                  <Input placeholder="员工姓名" />,
                )}
              </FormItem>
            </Col>
            <Col span={6} key={4}>
              <Button onClick={onSearch}>查询</Button>
            </Col>
          </Row>
        </Form>
        <Row>
          <Table
            columns={tableCols}
            dataSource={records}
            size="small"
            rowSelection={rowSelection}
            pagination={false}
            bordered
            scroll={{ y: 300 }}
            loading={tableLoading}
            onRow={(record) => {
              return {
                /* 单击行事件 */
                onClick: () => {
                  this.setState({ selectedRowKeys: [record.key] });
                  searchEmpNumber.empNumber = record.empNumber;
                },
                /* 双击行事件，执行确定动作，回写选中数据，关闭modal框 */
                onDoubleClick: () => {
                  onRefSubmit();
                },
              };
            }}
          />
          <Pagination
            size="small"
            showQuickJumper
            current={current}
            total={total}
            pageSize={size}
            onChange={this.onChangePage}
            onShowSizeChange={this.onChangePageSize}
            showTotal={tota => `共 ${tota} 条`}
            showSizeChanger
            style={{ marginTop: 10, float: 'right' }}
          />
        </Row>
      </Modal>
    );
  }
}
const SearchForm = Form.create()(PersonTable);
export default SearchForm;
