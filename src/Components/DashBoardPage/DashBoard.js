import React from "react";
import "./DashBoard.css";
import { useState } from "react";

const DashBoard = () => {
  const [empDetails, setEmpDetails] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [mode, setMode] = useState("Add");
  const [empData, setEmpData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [save, setSave] = useState("saved");
  const [deletModal, setDeleteModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const [deleteEmpId, setDeleteEmpId] = useState(null);

  const handleAddModal = () => {
    setAddModal(true);
    setErrors({});
    setEmpData({name: "", email: "", phone: "", address: "", gender: ""});
  };

  const handleCloseModal = () => {
    setAddModal(false);
    setDeleteModal(false);
    setErrors({});
    setMode("Add");
    setSaveModal(false);
    setSave("saved");
    setDeleteEmpId(null);
  };

  const handleEditModal = (emp) => {
    setEmpData(emp);
    setAddModal(true);
    setMode("Edit"); //update title as "Edit" in Modal
    setSave("updated");
  };

  const handleDeleteModal = (id) => {
    setDeleteEmpId(id);
    setDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteEmpId) {
      setEmpDetails((prevDetails) =>
        prevDetails.filter((emp) => emp.id !== deleteEmpId)
      );
    }
    setDeleteModal(false); // Close the delete modal
    setDeleteEmpId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (name === "phone") {
      if (!/^\d*$/.test(value)) return; // allow only numbers
    }
    setEmpData({
      ...empData,
      [name]: value,
    });
    if (name === "name" && value.trim()) delete newErrors.name;
      if (name === "emailId" && value.trim() && /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) delete newErrors.emailId;
      else if (name === "emailId" && !value.trim()) newErrors.emailId = "Email is required!"
      else if (name === "emailId" && value.trim()&& !/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) newErrors.emailId = "Invalid email!";


    if (name === "phone" && /^\d{10}$/.test(value)) delete newErrors.phone;
    else if (name === "phone" && !value.trim()) newErrors.phone = "Phone number is required!";
    else if (name === "phone" && value.trim() && !/^\d{10}$/.test(value)) newErrors.phone = "Phone number must be 10 digits";

    if (name === "address" && value.trim()) delete newErrors.address;
    if (name === "gender" && value) delete newErrors.gender;

    setErrors(newErrors);
  };

  const handleSave = () => {
    const newErrors = {};
    if (!empData.name?.trim()) newErrors.name = "Name is required!";
    if (!empData.emailId?.trim()) newErrors.emailId = "Email is required!";
    else if (!/^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(empData.emailId))
      newErrors.emailId = "Invalid email!";

    if (!empData.phone?.trim()) newErrors.phone = "Phone number is required!";
    else if (!/^\d{10}$/.test(empData.phone))
      newErrors.phone = "Phone number must be 10!";

    if (!empData.address?.trim()) newErrors.address = "Address is required!";
    if (!empData.gender) newErrors.gender = "Gender is required!";

    if (Object.keys(newErrors).length === 0) {
      if (mode === "Add") {
        const maxId = empDetails.reduce(
          (max, emp) => Math.max(max, parseInt(emp.id)),
          0
        ); 
        const newId = String(maxId + 1);

        setEmpDetails((prevDetails) => [
          ...prevDetails,
          { id: newId, ...empData },
        ]);
      } else if (mode === "Edit") {
        setEmpDetails((prevDetails) =>
          prevDetails.map((emp) => (emp.id === empData.id ? empData : emp))
        );
      }
      setAddModal(false);
      setSaveModal(true);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="container ">
      <h1 className="title">Employee details</h1>
      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className=" btn-primary  addBtn"
          onClick={handleAddModal}
        >
          Add
        </button>
      </div>

      <div>
        <div class="row  text-center  py-2 bg-primary text-white fw-bold    ">
          <div class="col-1  ">Emp id </div>
          <div class="col ">Name </div>
          <div class="col ">Email id </div>
          <div class="col ">Gender </div>
          <div class="col ">Phone number </div>
          <div class="col ">Address </div>
          <div class="col-1 "> </div>
        </div>

        {empDetails.map((empDetails) => (
          <div
            key={empDetails.id}
            className="row text-center py-2 border-start border-end border-top border-bottom"
          >
            <div className="col-1">{empDetails.id} </div>
            <div className="col">{empDetails.name} </div>
            <div className="col">{empDetails.emailId} </div>
            <div className="col">{empDetails.gender} </div>
            <div className="col">{empDetails.phone} </div>
            <div className="col">{empDetails.address}</div>
            <div className="col-1 d-flex justify-content-around align-items-center">
              <i
                class="bi bi-pencil-square icon"
                onClick={() => handleEditModal(empDetails)}
              >
                {" "}
              </i>
              <i
                class="bi bi-trash icon"
                onClick={() => handleDeleteModal(empDetails.id)}
              ></i>
            </div>
          </div>
        ))}
      </div>

      {/* Add and edit Modal */}

      {addModal && (
        <>
          <div className="modal-backdrop fade show"> </div>
          <div className="modal  show d-block" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{mode} Employee details </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                {/* Name field */}
                <div className="modal-body">
                  <form autoComplete="off">
                    <div className=" input-group mb-3">
                      <label className="form-label">Name</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control input"
                          id="empName"
                          placeholder="Enter name"
                          required
                          name="name"
                          value={empData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      {errors.name && (
                        <div className=" text-danger">{errors.name} </div>
                      )}
                    </div>

                    {/*Email id field */}
                    <div className="input-group mb-3">
                      <label className="form-label">Email</label>
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control"
                          id="empEmail"
                          placeholder="Enter email"
                          required
                          name="emailId"
                          value={empData.emailId}
                          onChange={handleInputChange}
                        />
                      </div>

                      {errors.emailId && (
                        <div className="text-danger">{errors.emailId}</div>
                      )}
                    </div>

                    {/*Phone number filed  */}
                    <div className="input-group mb-3">
                      <label className="form-label">Phone number</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="empPhone"
                          placeholder="Enter phone number"
                          required
                          maxlength="10"
                          name="phone"
                          value={empData.phone}
                          onChange={handleInputChange}
                        />
                      </div>

                      {errors.phone && (
                        <div className="text-danger">{errors.phone}</div>
                      )}
                    </div>

                    {/* Address field */}
                    <div className="input-group mb-3">
                      <label className="form-label">Address</label>
                      <div className="input-group">
                        <textarea
                          className="form-control"
                          id="empAddress"
                          placeholder="Enter address"
                          required
                          name="address"
                          value={empData.address}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                      {errors.address && (
                        <div className="text-danger">{errors.address}</div>
                      )}
                    </div>

                    {/* Gender field */}
                    <div className="input-group mb-3 d-flex flex-row flex-column">
                      <label className="form-label d-block mb-2">Gender </label>

                      <div className=" d-flex flex-row gap-2">
                        <div className="form-check mb-2 ">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="genderMale"
                            value="Male"
                            checked={empData.gender === "Male"}
                            onChange={handleInputChange}
                          />

                          <label
                            className="form-check-label "
                            onClick={() => {
                              setEmpData({ ...empData, gender: "Male" });
                            }}
                          >
                            Male
                          </label>
                        </div>

                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="genderFemale"
                            value="Female"
                            checked={empData.gender === "Female"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label "
                            onClick={() => {
                              setEmpData({ ...empData, gender: "Female" });
                            }}
                          >
                            {" "}
                            Female
                          </label>
                        </div>

                        <div className="form-check mb-2 ">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="genderOther"
                            value="Other"
                            checked={empData.gender === "Other"}
                            onChange={handleInputChange}
                          />
                          <label
                            className="form-check-label"
                            onClick={() => {
                              setEmpData({ ...empData, gender: "Other" });
                            }}
                          >
                            {" "}
                            Other
                          </label>
                        </div>
                      </div>
                    </div>
                    {errors.gender && (
                      <div className="text-danger">{errors.gender}</div>
                    )}
                  </form>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    {" "}
                    Save{" "}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCloseModal}
                  >
                    {" "}
                    Close{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Display Delete popup msg */}
      {deletModal && (
        <>
          <div className="modal-backdrop fade show"> </div>
          <div className="modal  show d-block" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Employee Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>

                <div>
                  <p className="modal-body">
                    {" "}
                    Are you sure you want to delete this?{" "}
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleDeleteConfirm}
                  >
                    {" "}
                    Yes{" "}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    {" "}
                    No{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Display save popup message */}
      {saveModal && (
        <>
          <div className="modal-backdrop fade show"> </div>
          <div className="modal  show d-block" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Employee Form</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div>
                  <p className="modal-body">Details {save} successfully!</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashBoard;
