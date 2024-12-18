import { useEffect, useState } from "react";
import PerformanceSummary from "../components/performace-summary";
import { IEmployee, IEmployeeRecord } from "../types/employee";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  TableProps,
  Typography,
} from "antd";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import axiosAPI from "../api/axios";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IEmployee;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? <InputNumber min={0} max={100} /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Employees = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const [summary, setSummary] = useState({
    productivity: 0,
    collaboration: 0,
    communication: 0,
  });

  useEffect(() => {
    if (employees.length === 0) {
      (async () => {
        const employeesData = await fetchEmployeesData();
        if (employeesData.length > 0) {
          setEmployees(
            employeesData.map((employee: IEmployeeRecord) => {
              return { ...employee, key: employee.id, id: undefined };
            }) as IEmployee[]
          );
        }
      })();
    } else {
      const total = employees.reduce(
        (acc, emp) => ({
          productivity: acc.productivity + emp.productivity,
          collaboration: acc.collaboration + emp.collaboration,
          communication: acc.communication + emp.communication,
        }),
        { productivity: 0, collaboration: 0, communication: 0 }
      );

      setSummary({
        productivity: parseFloat(
          (total.productivity / employees.length).toFixed(2)
        ),
        collaboration: parseFloat(
          (total.collaboration / employees.length).toFixed(2)
        ),
        communication: parseFloat(
          (total.communication / employees.length).toFixed(2)
        ),
      });
    }
  }, [employees]);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: IEmployee) => record.key === editingKey;

  const edit = (record: Partial<IEmployee> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IEmployee;

      const newData = [...employees];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        const updateResult = await updateEmployeePerformanceById(
          key as string,
          row.productivity,
          row.collaboration,
          row.communication
        );
        if (updateResult) {
          setEmployees(newData);
          setEditingKey("");
          toast.success(
            `Successfully updated the details of ${newData[index].name}(${newData[index].key})`
          );
        }
      }
    } catch (errInfo) {
      console.error("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Productivity",
      dataIndex: "productivity",
      key: "productivity",
      editable: true,
    },
    {
      title: "Collaboration",
      dataIndex: "collaboration",
      key: "collaboration",
      editable: true,
    },
    {
      title: "Communication",
      dataIndex: "communication",
      key: "communication",
      editable: true,
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, record: IEmployee) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="flex cursor-pointer">
            <Typography
              onClick={() => save(record.key)}
              style={{ marginInlineEnd: 8 }}
            >
              <FaCheckCircle size={20} className="text-[lightgreen]" />
            </Typography>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <FaTimesCircle size={20} className="text-[red]" />
            </Popconfirm>
          </span>
        ) : (
          <Typography onClick={() => edit(record)} className="cursor-pointer">
            <MdEdit size={16} />
          </Typography>
        );
      },
    },
  ];

  const mergedColumns: TableProps<IEmployee>["columns"] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IEmployee) => ({
        record,
        inputType: ["productivity", "collaboration", "communication"].includes(
          col.dataIndex
        )
          ? "number"
          : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <PerformanceSummary summary={summary} />
      <div className="mt-20 mb-5 mx-2 md:mx-40 max-w-full overflow-x-auto border rounded-md">
        <Form form={form} component={false}>
          <Table<IEmployee>
            components={{
              body: { cell: EditableCell },
            }}
            bordered
            dataSource={employees as IEmployee[]}
            columns={mergedColumns}
            pagination={{ onChange: cancel, pageSize: 5 }}
          />
        </Form>
      </div>
    </div>
  );
};

const fetchEmployeesData = async () => {
  try {
    const response = await axiosAPI.get("/employee-service/employees");
    console.log(response.data);
    return response.data.data.employees;
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

const updateEmployeePerformanceById = async (
  empId: string,
  productivity: number,
  collaboration: number,
  communication: number
) => {
  try {
    const response = await axiosAPI.patch(
      `/employee-service/employees/${empId}`,
      {
        productivity,
        collaboration,
        communication,
      }
    );
    console.log("Performance updated successfully:", response.data);
    return true;
  } catch (error) {
    console.error(`Error updating performance for employee ${empId}:`, error);
    return false;
  }
};

export default Employees;
