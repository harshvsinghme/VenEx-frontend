import { useEffect, useState } from "react";
import { IEmployeeRecord } from "../types/employee";
import { Button, Card, Input, InputNumber, Modal } from "antd";
import axiosAPI from "../api/axios";

interface IPredictionAPIInput {
  id: string;
  projectKey: string;
  summary: string;
  description: string;
  assignee: string;
  status: string;
  issueType: string;
  sprint: number;
}

const EmployeesPerformance = () => {
  const [employees, setEmployees] = useState<IEmployeeRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState<IPredictionAPIInput>({
    id: "ISSUE-6",
    projectKey: "TEST",
    summary: "Implement payment gateway integration",
    description: "Integrate Stripe payment gateway for handling transactions",
    assignee: "",
    status: "In Progress",
    issueType: "Task",
    sprint: 2,
  });
  const [predictedValue, setPredictedValue] = useState<null | number>(null);

  const showModal = (name: string) => {
    setIsModalOpen(true);
    setInput({ ...input, assignee: name });
  };

  const handleOk = async () => {
    const predicted_story_points = await predictEmployeeStoryPoints(input);
    setPredictedValue(predicted_story_points);
    setTimeout(() => {
      setIsModalOpen(false);
      setPredictedValue(null);
    }, 3000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (employees.length === 0) {
      (async () => {
        const employeesData = await fetchEmployeesData();
        if (employeesData.length > 0) {
          setEmployees(employeesData);
        }
      })();
    }
  }, [employees]);

  return (
    <div className="bg-[teal] min-h-[100vh]">
      <p className="text-white text-[2em] text-center py-5">
        Employees Performance
      </p>
      <div className="flex justify-around align-center flex-wrap gap-4 md:gap-9">
        {employees.map((employee) => (
          <Card className="w-60">
            <p className="text-center text-[1.3em]">
              <span>({employee.id}).</span>{" "}
              <span className="ml-1">{employee.name}</span>
            </p>
            <div className="flex justify-center mt-2">
              <Button
                className="bg-[teal] text-white"
                onClick={() => showModal(employee.name)}
              >
                Predict
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        okText="Submit"
        onCancel={handleCancel}
      >
        <p className="ml-1 font-bold">Issue Id:</p>
        <Input
          className="mb-2"
          value={input.id}
          onChange={(e) => setInput({ ...input, id: e.target.value })}
        />
        <p className="ml-1 font-bold">Project Key:</p>
        <Input
          className="mb-2"
          value={input.projectKey}
          onChange={(e) => setInput({ ...input, projectKey: e.target.value })}
        />
        <p className="ml-1 font-bold">Summary:</p>
        <Input
          className="mb-2"
          value={input.summary}
          onChange={(e) => setInput({ ...input, summary: e.target.value })}
        />
        <p className="ml-1 font-bold">Description:</p>
        <Input
          className="mb-2"
          value={input.description}
          onChange={(e) => setInput({ ...input, description: e.target.value })}
        />
        <p className="ml-1 font-bold">Assignee:</p>
        <Input
          className="mb-2"
          value={input.assignee}
          onChange={(e) => setInput({ ...input, assignee: e.target.value })}
        />
        <p className="ml-1 font-bold">Status:</p>
        <Input
          className="mb-2"
          value={input.status}
          onChange={(e) => setInput({ ...input, status: e.target.value })}
        />
        <p className="ml-1 font-bold">Issue Type:</p>
        <Input
          className="mb-2"
          value={input.issueType}
          onChange={(e) => setInput({ ...input, issueType: e.target.value })}
        />
        <p className="ml-1 font-bold">Sprint:</p>
        <InputNumber
          min={1}
          value={input.sprint}
          onChange={(v) => setInput({ ...input, sprint: v! })}
        />
        {predictedValue === null ? null : (
          <p className="font-bold text-[tomato]">
            Predicted Value: {predictedValue}
          </p>
        )}
      </Modal>
    </div>
  );
};

const fetchEmployeesData = async () => {
  try {
    const response = await axiosAPI.get("/employee-service/employees");
    console.log(response.data);
    return response.data.data.employees.slice(0, 5);
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

const predictEmployeeStoryPoints = async (payload: IPredictionAPIInput) => {
  try {
    const response = await axiosAPI.post(
      `/intelligence-service/predict`,
      payload
    );
    console.log("Story point predicted successfully:", response.data);
    return response.data.data.predicted_story_points;
  } catch (error) {
    console.error(
      `Error predicting story point for employee ${payload.assignee}:`,
      error
    );
  }
};

export default EmployeesPerformance;
