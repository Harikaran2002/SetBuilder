import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, Tooltip, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FileCopy, Edit, Delete } from '@mui/icons-material';
import './Screen1.css';

const ViewSet = () => {
  const [setData, setSetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7144/api/Hierarchy');
        const parsedData = response.data.map((set) => ({
          ...set,
          hierarchy: JSON.parse(set.hierarchy),
        }));
        setSetData(parsedData);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Error fetching set data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClone = (setName) => {
    // Implement clone logic using a PUT request
    console.log(`Clone ${setName}`);
  };

  const handleEdit = (setName) => {
    // Implement edit logic using a PUT request
    console.log(`Edit ${setName}`);
  };

  const handleDelete = (setName) => {
    // Implement delete logic using a DELETE request
    console.log(`Delete ${setName}`);
  };

  const filteredData = setData.filter((set) => set.setName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='viewData'>
      <TextField
        label="Search by Set Name"
        variant="outlined"
        onChange={(e) => setSearchTerm(e.target.value)}
        size="small"
        style={{ width: '300px'}}
      />
      <SearchIcon 
        style={{ marginTop: '10px'}}
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Set Name</th>
              <th>Hierarchy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((set) => (
              <tr key={set.setId}>
                <td>{set.setName}</td>
                <td>
                  {set.hierarchy?.map((item, index) => (
                    <div key={index}>
                      <strong>Department: {item.department || ''}</strong>
                      <div>Category: {item.category || ''}</div>
                      <div>Manufacturer: {item.manufacturer || ''}</div>
                      <div>Caliber: {item.caliber || ''}</div>
                      <div>UPC: {item.upc || ''}</div>
                      <div>Product Description: {item.productDescription || ''}</div>
                    </div>
                  ))}
                </td>
                <td>
                  <Tooltip title="Clone">
                    <IconButton color="primary" aria-label="clone" onClick={() => handleClone(set.setName)}>
                      <FileCopy />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton color="primary" aria-label="edit" onClick={() => handleEdit(set.setName)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton color="error" aria-label="delete" onClick={() => handleDelete(set.setName)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewSet;
