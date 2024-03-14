import "./company.scss";
import { useState, useEffect } from "react";
import axios from "axios";
const Company = () => {
  const [companies, setCompanies] = useState([]);
  // const [logo, setLogo] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [editedCompanyName, setEditedCompanyName] = useState("");
  const [editedCompanyUrl, setEditedCompanyUrl] = useState("");
  // const [editedLogo, setEditedLogo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(false);
  const [selectedFileE, setSelectedFileE] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setTableLoading(true);
      const response = await axios.get(
        "https://appointmate-njp3.onrender.com/api/companies"
      );
      setCompanies(response.data);
      setTableLoading(false);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      setImageUrl(base64String);
    };
    setSelectedFile(true);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleCompanyUrlChange = (event) => {
    setCompanyUrl(event.target.value);
  };

  const handleEditCompanyNameChange = (event) => {
    setEditedCompanyName(event.target.value);
  };

  const handleEditCompanyUrlChange = (event) => {
    setEditedCompanyUrl(event.target.value);
  };

  const handleEditLogoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result;
      setImageUrl(base64String);
    };
    setSelectedFileE(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSelectedFile(false);

    try {
      setUploadLoading(true);
      const companyData = {
        companyName: companyName,
        companyUrl: companyUrl,
        imageUrl: imageUrl,
      };

      await axios.post(
        "https://appointmate-njp3.onrender.com/api/companies",
        companyData
      );
      setSizeError(false);
      setUploadLoading(false);
      setCompanyName("");
      setCompanyUrl("");
      setImageUrl("");
      fetchCompanies();
    } catch (error) {
      setSizeError(true);
      console.error("Error creating company:", error);
    }
  };

  const deleteCompany = async (id) => {
    try {
      setDeleteLoading(true);
      await axios.delete(`https://appointmate-njp3.onrender.com/api/companies/${id}`);
      fetchCompanies();
      setDeleteLoading(false);
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const editCompany = async (id) => {
    try {
      setEditLoading(true);
      const editedCompanyData = {
        companyName: editedCompanyName,
        companyUrl: editedCompanyUrl,
        imageUrl: imageUrl,
      };

      await axios.put(
        `https://appointmate-njp3.onrender.com/api/companies/${id}`,
        editedCompanyData
      );
      setSizeError(false);
      setEditLoading(false);
      setEditingCompanyId(null);
      fetchCompanies();
      setImageUrl("");
    } catch (error) {
      setSizeError(true);
      console.error("Error editing company:", error);
    }
    setSelectedFileE(false);
  };

  const startEditingCompany = (id, companyName, companyUrl) => {
    setEditingCompanyId(id);
    setEditedCompanyName(companyName);
    setEditedCompanyUrl(companyUrl);
  };

  const cancelEditingCompany = () => {
    setEditingCompanyId(null);
    setEditedCompanyName("");
    setEditedCompanyUrl("");
    setImageUrl("");
    setSelectedFileE(false);
  };

  return (
    <div className="main--container">
      <div className="hero--container">
        <div className="title--wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={51}
            height={52}
            fill="none"
          >
            <path fill="url(#a)" d="M0 .5h61v61H0z" />
            <defs>
              <pattern
                id="a"
                width={1}
                height={1}
                patternContentUnits="objectBoundingBox"
              >
                <use xlinkHref="#b" transform="scale(.00781)" />
              </pattern>
              <image
                xlinkHref="data:image/png;base64,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"
                id="b"
                width={108}
                height={108}
              />
            </defs>
          </svg>
          <span>Companies</span>
        </div>
      </div>

      <form className="form--container" onSubmit={handleFormSubmit}>
        <input
          id="uploadFile"
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
        />
        <div className="upload--preview">
          {imageUrl && selectedFileE == false && <img src={imageUrl} alt="" />}

          <label
            className={selectedFile == false ? "btn" : "btn active"}
            htmlFor="uploadFile"
            id="uploadLabel"
          >
            <svg
              width="15"
              height="23"
              viewBox="0 0 19 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.78571 17.0897H12.2143C12.9607 17.0897 13.5714 16.479 13.5714 15.7326V8.94689H15.7293C16.9371 8.94689 17.5479 7.48117 16.6929 6.62617L10.4636 0.396888C10.338 0.271076 10.1889 0.171262 10.0247 0.103158C9.86053 0.0350549 9.68453 0 9.50679 0C9.32904 0 9.15305 0.0350549 8.98887 0.103158C8.82469 0.171262 8.67555 0.271076 8.55 0.396888L2.32071 6.62617C1.46571 7.48117 2.06286 8.94689 3.27071 8.94689H5.42857V15.7326C5.42857 16.479 6.03929 17.0897 6.78571 17.0897ZM1.35714 19.804H17.6429C18.3893 19.804 19 20.4147 19 21.1612C19 21.9076 18.3893 22.5183 17.6429 22.5183H1.35714C0.610714 22.5183 0 21.9076 0 21.1612C0 20.4147 0.610714 19.804 1.35714 19.804Z"
                fill="white"
              />
            </svg>
            {selectedFile == false ? "Upload Logo" : "Logo Selected"}
          </label>
        </div>
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={handleCompanyNameChange}
        />
        <input
          type="text"
          placeholder="Company URL"
          value={companyUrl}
          onChange={handleCompanyUrlChange}
        />
        {uploadLoading == false ? (
          <button className="btn" type="submit">
            Add Company
          </button>
        ) : sizeError == false ? (
          <button className="btn active" type="submit" disabled>
            Uploading...
          </button>
        ) : (
          <button className="btn error" type="submit">
            Image too large!!
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.859 16.509C14.3548 18.0148 12.3751 18.9526 10.2571 19.1624C8.1391 19.3723 6.01385 18.8413 4.24344 17.6599C2.47304 16.4785 1.16701 14.7198 0.547862 12.6835C-0.0712813 10.6472 0.0347687 8.45916 0.847944 6.49225C1.66112 4.52534 3.13111 2.90122 5.00747 1.8966C6.88383 0.891973 9.05047 0.569 11.1383 0.982705C13.226 1.39641 15.1058 2.5212 16.4573 4.16543C17.8087 5.80967 18.5483 7.87162 18.55 10H16.25C16.2514 8.40357 15.6992 6.85605 14.6875 5.62114C13.6758 4.38622 12.2671 3.54033 10.7016 3.22761C9.13614 2.91488 7.51064 3.15468 6.10213 3.90612C4.69362 4.65757 3.58925 5.87417 2.97721 7.34862C2.36518 8.82307 2.28335 10.4641 2.74567 11.9921C3.20799 13.5202 4.18585 14.8406 5.51262 15.7284C6.83939 16.6163 8.43297 17.0166 10.0218 16.8611C11.6107 16.7057 13.0964 16.0041 14.226 14.876L15.859 16.509ZM12.8 10H22L17.4 14.6L12.8 10Z"
                fill="white"
              />
            </svg>
          </button>
        )}
      </form>

      {tableLoading == false ? (
        <div className="table--container">
          <table id="companies">
            <thead>
              <tr>
                <th>Id</th>
                <th>Company Logo</th>
                <th>Company Name</th>
                <th>
                  Company URL{" "}
                  <span className="url--rule">(Include https://)</span>
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={company._id}>
                  <td>{index + 1}</td>
                  <td id="image--container">
                    {editingCompanyId === company._id ? (
                      <>
                        <input
                          id="uploadFileE"
                          type="file"
                          accept="image/*"
                          onChange={handleEditLogoUpload}
                        />
                        <div className="upload--preview">
                          {imageUrl && <img src={imageUrl} alt="" />}

                          <label
                            className={
                              selectedFileE == false ? "btn" : "btn active"
                            }
                            htmlFor="uploadFileE"
                            id="uploadLabel"
                          >
                            <svg
                              width="15"
                              height="23"
                              viewBox="0 0 19 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.78571 17.0897H12.2143C12.9607 17.0897 13.5714 16.479 13.5714 15.7326V8.94689H15.7293C16.9371 8.94689 17.5479 7.48117 16.6929 6.62617L10.4636 0.396888C10.338 0.271076 10.1889 0.171262 10.0247 0.103158C9.86053 0.0350549 9.68453 0 9.50679 0C9.32904 0 9.15305 0.0350549 8.98887 0.103158C8.82469 0.171262 8.67555 0.271076 8.55 0.396888L2.32071 6.62617C1.46571 7.48117 2.06286 8.94689 3.27071 8.94689H5.42857V15.7326C5.42857 16.479 6.03929 17.0897 6.78571 17.0897ZM1.35714 19.804H17.6429C18.3893 19.804 19 20.4147 19 21.1612C19 21.9076 18.3893 22.5183 17.6429 22.5183H1.35714C0.610714 22.5183 0 21.9076 0 21.1612C0 20.4147 0.610714 19.804 1.35714 19.804Z"
                                fill="white"
                              />
                            </svg>
                            {selectedFileE == false
                              ? "Upload Logo"
                              : "Logo Selected"}
                            <span>{selectedFileE}</span>
                          </label>
                        </div>
                      </>
                    ) : (
                      <img
                        src={company.imageUrl}
                        alt="Company Logo"
                        width="50"
                        height="50"
                      />
                    )}
                  </td>
                  <td>
                    {editingCompanyId === company._id ? (
                      <input
                        type="text"
                        value={editedCompanyName}
                        onChange={handleEditCompanyNameChange}
                      />
                    ) : (
                      company.companyName
                    )}
                  </td>
                  <td>
                    {editingCompanyId === company._id ? (
                      <input
                        type="text"
                        value={editedCompanyUrl}
                        onChange={handleEditCompanyUrlChange}
                      />
                    ) : (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="company--link"
                        href={company.companyUrl}
                      >
                        {company.companyUrl}
                      </a>
                    )}
                  </td>
                  <td id="edit--container">
                    {editingCompanyId === company._id ? (
                      <>
                        {editLoading == false ? (
                          <button
                            className="btn2 s"
                            id="save"
                            onClick={() => editCompany(company._id)}
                          >
                            Save
                          </button>
                        ) : sizeError == false ? (
                          <button disabled className="btn2 s">
                            saving...
                          </button>
                        ) : (
                          <button
                            className="btn2 d"
                            onClick={() => editCompany(company._id)}
                          >
                            size too large!!
                            <svg
                              width="18"
                              height="15"
                              viewBox="0 0 22 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.859 16.509C14.3548 18.0148 12.3751 18.9526 10.2571 19.1624C8.1391 19.3723 6.01385 18.8413 4.24344 17.6599C2.47304 16.4785 1.16701 14.7198 0.547862 12.6835C-0.0712813 10.6472 0.0347687 8.45916 0.847944 6.49225C1.66112 4.52534 3.13111 2.90122 5.00747 1.8966C6.88383 0.891973 9.05047 0.569 11.1383 0.982705C13.226 1.39641 15.1058 2.5212 16.4573 4.16543C17.8087 5.80967 18.5483 7.87162 18.55 10H16.25C16.2514 8.40357 15.6992 6.85605 14.6875 5.62114C13.6758 4.38622 12.2671 3.54033 10.7016 3.22761C9.13614 2.91488 7.51064 3.15468 6.10213 3.90612C4.69362 4.65757 3.58925 5.87417 2.97721 7.34862C2.36518 8.82307 2.28335 10.4641 2.74567 11.9921C3.20799 13.5202 4.18585 14.8406 5.51262 15.7284C6.83939 16.6163 8.43297 17.0166 10.0218 16.8611C11.6107 16.7057 13.0964 16.0041 14.226 14.876L15.859 16.509ZM12.8 10H22L17.4 14.6L12.8 10Z"
                                fill="white"
                              />
                            </svg>
                          </button>
                        )}
                        <button
                          className="btn2 c"
                          onClick={cancelEditingCompany}
                        >
                          Cancel
                        </button>
                        {deleteLoading == false ? (
                          <button
                            className="btn2 d"
                            onClick={() => deleteCompany(company._id)}
                          >
                            Delete
                          </button>
                        ) : (
                          <button disabled className="btn2 d">
                            deleting...
                          </button>
                        )}
                      </>
                    ) : (
                      <button
                        className="btn2 e"
                        onClick={() =>
                          startEditingCompany(
                            company._id,
                            company.companyName,
                            company.companyUrl
                          )
                        }
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="table--loader">loading...</div>
      )}
    </div>
  );
};

export default Company;
