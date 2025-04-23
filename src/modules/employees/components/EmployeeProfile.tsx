tsx
const EmployeeProfile = ({ employee }) => {
  return (
    <div>
      <h1>{employee.name}</h1>
      <p>{employee.position}</p>
      {/* Placeholder for additional information */}
    </div>
  );
};

export default EmployeeProfile;