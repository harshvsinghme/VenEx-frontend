import { useEffect, useState } from "react";
import PerformanceSummary from "../components/performace-summary";
import { IEmployee } from "../types/employee";

const employeesData = [
  {
    id: 1,
    name: "John Doe",
    productivity: 85,
    collaboration: 90,
    communication: 88,
  },
  {
    id: 2,
    name: "Jane Smith",
    productivity: 78,
    collaboration: 84,
    communication: 80,
  },
  {
    id: 3,
    name: "Alice Johnson",
    productivity: 92,
    collaboration: 88,
    communication: 95,
  },
  {
    id: 4,
    name: "Bob Brown",
    productivity: 70,
    collaboration: 75,
    communication: 72,
  },
  {
    id: 5,
    name: "Eve Davis",
    productivity: 88,
    collaboration: 92,
    communication: 90,
  },
];

const Employees = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const [summary, setSummary] = useState({
    productivity: 0,
    collaboration: 0,
    communication: 0,
  });

  useEffect(() => {
    console.log("A");
    if (employees.length === 0) {
      console.log("B");
      setEmployees(employeesData);
    } else {
      console.log("C");
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

  return (
    <div>
      <PerformanceSummary summary={summary} />
      <div>Table</div>
    </div>
  );
};

export default Employees;
