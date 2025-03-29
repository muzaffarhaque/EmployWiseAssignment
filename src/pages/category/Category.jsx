import React, { useEffect, useState } from "react";
import { commonAllAuthApi, commonDeleteAuthApi, commonGetAuthApi } from "../../server/Api";
import { toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import { isOk } from "../../utils/reusablefunctions";
import Loader from "../../components/Loader";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useSearchParams } from "react-router-dom";

export default function Category() {
    const [aLlCategory, setALlCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: ""
    });
    const [searchParams, setSearchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState( 1);
    const [totalPages, setTotalPages] = useState(1);
    const {first_name,last_name,email}=formData;

    const getALlCategory = async (page = 1) => {
        setLoading(true);
        try {
            const res = await commonGetAuthApi(`users?page=${page}`);
            if (isOk(res.status)) {
                setALlCategory(res.data.data);
                setTotalPages(res.data.total_pages); 
            } else {
                toast.error(res?.response?.data?.message || "Something went wrong!");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getALlCategory(currentPage);
        setSearchParams({ "page": currentPage });
    }, [currentPage]); 

    const handlePageChange = (newPage) => {
        console.log("newPage", newPage)
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    useEffect(() => {
        scrollTo(0,0)
        getALlCategory();
    }, []);

    async function deleteHandler(id) {
        const res = await commonDeleteAuthApi(`users/${selectedCategory}`);
        if (isOk(res.status)) {
            toast.success("Successfully Deleted.");
            setShowModal(false)
            getALlCategory();
        } else {
            toast.error(res?.response?.data?.message || "Something went wrong!");
        }
    }

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleAddCategory = async () => {
      if(!first_name){toast.warn("Enter User Name..");return ''}
      if(!last_name){toast.warn("Enter User Name..");return ''}
      if(!email){toast.warn("Enter User Name..");return ''}
      const formdata1 = new FormData();
      formdata1.append("first_name", first_name);
      formdata1.append("last_name", last_name);
      formdata1.append("email", email);
        try {
            const res = await commonAllAuthApi("user", formdata1,'post');
            if (isOk(res.status)) {
                scrollTo(0,0)
                toast.success("Category added successfully.");
                setFormData({ first_name: "", last_name: "", email: "" });
                getALlCategory();
            } else {
                toast.error(res?.response?.data?.message || "Something went wrong!");
            }
        } catch (error) {
            toast.error("An error occurred while adding the category.");
        }
    };
    const handleEditClick = (user) => {
        
      setSelectedCategory(user.id);
      setFormData({
          first_name: user?.first_name || '',
          last_name: user?.last_name || '',
          email: user?.email || ''
      });
      setEditMode(true);
        
    setTimeout(() => {
        window.scrollBy({ top: 700, behavior: "smooth" });
    }, 100);
  };
  const handleEditCategory = async () => {
    if (!selectedCategory) return toast.error("No User selected for editing.");
    const formdata2 = new FormData();
    formdata2.append("first_name", first_name);
    formdata2.append("last_name", last_name);
    formdata2.append("email", email);
    try {
        const res = await commonAllAuthApi(`user/${selectedCategory}`, formdata2,'put');
        if (isOk(res.status)) {
            scrollTo(0,0)
            toast.success("Category updated successfully.");
            setFormData({ first_name: "", last_name: "", email: "" });
            setEditMode(false);
            setSelectedCategory(null);
            getALlCategory();
        } else {
            toast.error(res?.response?.data?.message || "Something went wrong!");
        }
    } catch (error) {
        toast.error("An error occurred while updating the category.");
    }
};

    return (
        <div className="category-main-wrapper">
            <div className="table-header">
                <h2>Assignment Overview:</h2>
                <p>You are tasked with creating a React application that integrates with the Reqres API to perform basic</p>
            </div>
            {loading ? (<Loader classes="table-loader" />) : (
                <>
                <table className="table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" /></th>
                            <th>Profile Image</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {aLlCategory.map((item, index) => (
                            <tr key={index}>
                                <td><input type="checkbox" className="cheked-box" /></td>
                                <td>
                                    <div className="user-img-wraper">
                                        <img src={item?.avatar || ""} alt="user" />
                                    </div>
                                </td>
                                <td>
                                    <div className="user-name-wraper">
                                        <h6 className="fs-16-13">{item?.first_name || ""}</h6>
                                    </div>
                                </td>
                                <td>{item?.last_name || ""}</td>
                             
                                <td>{item?.email}</td>
                                <td>
                                    <Dropdown className="custom-dropdown category-drop">
                                        <Dropdown.Toggle id="dropdown-btn">...</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item className="edit" onClick={() => handleEditClick(item)}>Edit</Dropdown.Item>
                                             <Dropdown.Item onClick={() => { setSelectedCategory(item?.id); setShowModal(true); }} className="delete">Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                   {/* Pagination Controls */}
                   <div className="pagination gap-3 flex align-center justify-end" >
                   <Button 
                       className="primary-btn"
                       variant="secondary" 
                       onClick={() => handlePageChange(currentPage - 1)} 
                       disabled={currentPage === 1}
                   >
                       Previous
                   </Button>
                   <span> Page {currentPage} of {totalPages} </span>
                   <Button 
                       className="primary-btn"
                       variant="secondary" 
                       onClick={() => handlePageChange(currentPage + 1)} 
                       disabled={currentPage === totalPages}
                   >
                       Next
                   </Button>
               </div>
               </>
            )}
            <div className="btn-wrapper">
                <button className="primary-btn" onClick={()=>{}}>Add User</button>
                {/* <h2 className="">Add User</h2> */}
            </div>
            <div className="add-category-wrapper">
                <h1>Add New user</h1>
                <div className="form-group">
                    <label htmlFor="first_name">User Name</label>
                    <input type="text" name="first_name" id="first_name" required value={formData.first_name} onChange={(e) => handleChange("first_name", e.target.value)} placeholder="Enter the Name of the new user." />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">User LastName</label>
                    <input name="last_name" id="last_name" required value={formData.last_name} onChange={(e) => handleChange("last_name", e.target.value)} placeholder="Enter the Last Name of the new user" />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">User Email</label>
                    <input name="last_name" id="last_name" required value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="abcd@gmail.com" />
                </div>
             
                <div className="btn-wrapper">
                <button className="primary-btn" onClick={editMode ? handleEditCategory : handleAddCategory}>
                  {editMode ? "Update User" : "Add User"}
                </button>

            </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this User?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={deleteHandler}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
