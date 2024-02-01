import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Select from 'react-select';
import SendIcon from '@mui/icons-material/Send';
import { Tooltip} from '@mui/material';
import './Set.css';

const Set = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [setName, setSetName] = useState('');
  const [previewData, setPreviewData] = useState(null);
  const [selectedUPCs, setSelectedUPCs] = useState([]);
  const [departments, setDepartments] = useState([
    {
      id: 1,
      deptSelect: null,
      categories: [
        {
          id: 1,
          categorySelect: null,
          manufacturers: [
            {
              id: 1,
              manufacturerSelect: null,
              calibers: [
                { id: 1, caliberSelect: null, upcs: [{ upc: '', productDescription: '' }] },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const [deptOptions, setDeptOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [manufacturerOptions, setManufacturerOptions] = useState([]);
  const [caliberOptions, setCaliberOptions] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const [deptResponse, categoryResponse, manufacturerResponse, caliberResponse] = await Promise.all([
        axios.get('https://localhost:7144/api/Product/GetDistinctDepartments'),
        axios.get('https://localhost:7144/api/Product/GetDistinctCategories'),
        axios.get('https://localhost:7144/api/Product/GetDistinctManufacturers'),
        axios.get('https://localhost:7144/api/Product/GetDistinctCalibers'),
      ]);

      setDeptOptions(deptResponse.data.map((dep) => ({ label: dep, value: dep })));
      setCategoryOptions(categoryResponse.data.map((cat) => ({ label: cat, value: cat })));
      setManufacturerOptions(manufacturerResponse.data.map((man) => ({ label: man, value: man })));
      setCaliberOptions(caliberResponse.data.map((cal) => ({ label: cal, value: cal })));
      setLoadingData(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeptChange = (value, deptIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[deptIndex] = {
      ...updatedDepartments[deptIndex],
      deptSelect: value,
      categories: [
        {
          id: 1,
          categorySelect: null,
          manufacturers: [
            {
              id: 1,
              manufacturerSelect: null,
              calibers: [
                { id: 1, caliberSelect: null, upcs: [{ upc: '', productDescription: '' }] },
              ],
            },
          ],
        },
      ],
    };
    setDepartments(updatedDepartments);
  };

  const handleAddDepartment = () => {
    setDepartments((prevDepartments) => [
      ...prevDepartments,
      {
        id: prevDepartments.length + 1,
        deptSelect: null,
        categories: [
          {
            id: 1,
            categorySelect: null,
            manufacturers: [
              {
                id: 1,
                manufacturerSelect: null,
                calibers: [
                  { id: 1, caliberSelect: null, upcs: [{ upc: '', productDescription: '' }] },
                ],
              },
            ],
          },
        ],
      },
    ]);
  };

  const handleCategoryChange = (value, deptIndex, categoryIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[deptIndex].categories[categoryIndex] = {
      ...updatedDepartments[deptIndex].categories[categoryIndex],
      categorySelect: value,
      manufacturers: [
        {
          id: 1,
          manufacturerSelect: null,
          calibers: [
            { id: 1, caliberSelect: null, upcs: [{ upc: '', productDescription: '' }] },
          ],
        },
      ],
    };
    setDepartments(updatedDepartments);
  };

  const handleAddCategory = (deptIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[deptIndex].categories.push({
      id: updatedDepartments[deptIndex].categories.length + 1,
      categorySelect: null,
      manufacturers: [
        {
          id: 1,
          manufacturerSelect: null,
          calibers: [
            { id: 1, caliberSelect: null, upcs: [{ upc: '', productDescription: '' }] },
          ],
        },
      ],
    });
    setDepartments(updatedDepartments);
  };

  const handleManufacturerChange = (value, deptIndex, categoryIndex, manufacturerIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[deptIndex].categories[categoryIndex].manufacturers[manufacturerIndex] = {
      ...updatedDepartments[deptIndex].categories[categoryIndex].manufacturers[manufacturerIndex],
      manufacturerSelect: value,
      calibers: [
        { id: 1, caliberSelect: null, upcs: [{ upc: '', productDescription: '' }] },
      ],
    };
    setDepartments(updatedDepartments);
  };

  const handleAddManufacturer = (deptIndex, categoryIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[deptIndex].categories[categoryIndex].manufacturers.push({
      id: updatedDepartments[deptIndex].categories[categoryIndex].manufacturers.length + 1,
      manufacturerSelect: null,
      calibers: [
        { id: 1, caliberSelect: null, upcs: [{ upc: '', productDescription: '' }] },
      ],
    });
    setDepartments(updatedDepartments);
  };

  const handleCaliberChange = (value, deptIndex, categoryIndex, manufacturerIndex, caliberIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[deptIndex].categories[categoryIndex].manufacturers[manufacturerIndex].calibers[caliberIndex] = {
      ...updatedDepartments[deptIndex].categories[categoryIndex].manufacturers[manufacturerIndex].calibers[caliberIndex],
      caliberSelect: value,
      upcs: [
        { upc: '', productDescription: '' },
      ],
    };
    setDepartments(updatedDepartments);
  };

  const handleAddCaliber = (deptIndex, categoryIndex, manufacturerIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[deptIndex].categories[categoryIndex].manufacturers[manufacturerIndex].calibers.push({
      id: updatedDepartments[deptIndex].categories[categoryIndex].manufacturers[manufacturerIndex].calibers.length + 1,
      caliberSelect: null,
      upcs: [
        { upc: '', productDescription: '' },
      ],
    });
    setDepartments(updatedDepartments);
  };

  const handleUPCChange = (e, deptIndex, categoryIndex, manufacturerIndex, caliberIndex, upcIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[deptIndex].categories[categoryIndex].manufacturers[manufacturerIndex].calibers[caliberIndex].upcs[upcIndex] =
      {
        upc: e.target.value,
        productDescription: '',
      };
    setDepartments(updatedDepartments);
  };

  const handleProductDescriptionChange = (e, deptIndex, categoryIndex, manufacturerIndex, caliberIndex, upcIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[deptIndex].categories[categoryIndex].manufacturers[manufacturerIndex].calibers[caliberIndex].upcs[upcIndex].productDescription =
      e.target.value;
    setDepartments(updatedDepartments);
  };

  const handleAddUPC = (deptIndex, categoryIndex, manufacturerIndex, caliberIndex) => {
    const updatedDepartments = [...departments];
    updatedDepartments[deptIndex].categories[categoryIndex].manufacturers[manufacturerIndex].calibers[caliberIndex].upcs.push({
      upc: '',
      productDescription: '',
    });
    setDepartments(updatedDepartments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      //for the hierarchy set
      const stringResponse = JSON.stringify(
        departments.flatMap((dept) =>
          dept.categories.flatMap((category) =>
            category.manufacturers.flatMap((manufacturer) =>
              manufacturer.calibers.flatMap((caliber) =>
                caliber.upcs.map((upc) => ({
                  department: dept.deptSelect ? dept.deptSelect.value : '',
                  category: category.categorySelect ? category.categorySelect.value : '',
                  manufacturer: manufacturer.manufacturerSelect ? manufacturer.manufacturerSelect.value : '',
                  caliber: caliber.caliberSelect ? caliber.caliberSelect.value : '',
                  upc: upc.upc,
                  productDescription: upc.productDescription,
                }))
              )
            )
          )
        )
      );

      //for list of UPCs
      const selectedUPCs = departments.flatMap((dept) =>
            dept.categories.flatMap((category) =>
                category.manufacturers.flatMap((manufacturer) =>
                    manufacturer.calibers.flatMap((caliber) =>
                        caliber.upcs.map((upc) => ({  setName: setName, upc: upc.upc }))
                    )
                )
            )
        );
      
      // Create the hierarchyData object with setName and stringify the entire response
      const hierarchyData = {
        setName: setName,
        hierarchy: stringResponse,
      };
      
      // Send the second request and wait for the Hierarchy response
      const hierarchyResponse = await axios.post('https://localhost:7144/api/Hierarchy', hierarchyData);
      const upcResponse = await axios.post('https://localhost:7144/api/Upc', selectedUPCs);
  
      // Reset form and state
      setPreviewData(null);
      setSelectedUPCs([]);
      setSetName('');
      setDepartments([
        {
          id: 1,
          deptSelect: null,
          categories: [
            {
              id: 1,
              categorySelect: null,
              manufacturers: [
                {
                  id: 1,
                  manufacturerSelect: null,
                  calibers: [
                    { id: 1, caliberSelect: null, upcs: [{ upc: '', productDescription: '' }] },
                  ],
                },
              ],
            },
          ],
        },
      ]);
  
      setLoadingData(false);
    } catch (error) {
      console.error('Error creating set:', error);
    }
  };

  const handlePreview = () => {
    const previewData = {
      setName: setName,
      hierarchy: departments.flatMap((dept) =>
        dept.categories.flatMap((category) =>
          category.manufacturers.flatMap((manufacturer) =>
            manufacturer.calibers.flatMap((caliber) =>
              caliber.upcs.map((upc) => ({
                department: dept.deptSelect ? dept.deptSelect.value : '',
                category: category.categorySelect ? category.categorySelect.value : '',
                manufacturer: manufacturer.manufacturerSelect ? manufacturer.manufacturerSelect.value : '',
                caliber: caliber.caliberSelect ? caliber.caliberSelect.value : '',
                upc: upc.upc,
                productDescription: upc.productDescription,
              }))
            )
          )
        )
      ),
    };

    setPreviewData(previewData); 
  };

  const handleUpc = () => {
    const selectedUPCs = departments.flatMap((dept) =>
      dept.categories.flatMap((category) =>
        category.manufacturers.flatMap((manufacturer) =>
          manufacturer.calibers.flatMap((caliber) =>
            caliber.upcs.map((upc) => upc.upc)
          )
        )
      )
    );
  
    setSelectedUPCs({
      setName: setName,
      hierarchy: selectedUPCs.map((upc) => ({
        upc: upc,
      })),
    });
  
    setSelectedUPCs(selectedUPCs);
  };

  const handleUpcFilter = async (department, category, manufacturer, caliber) => {
    try {
      const baseUrl = 'https://localhost:7144/api/Product/Filter';
      const url = `${baseUrl}?department=${department || ''}&category=${category || ''}&manufacturer=${manufacturer || ''}&caliber=${caliber || ''}`;
  
      const response = await axios.get(url);
  
      const upcs = response.data;
      setSelectedUPCs((prevSelectedUPCs) => [...prevSelectedUPCs, ...upcs]);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className='mainContainer' style={{ display: 'flex' }}>
    <div className='setContainer'>
      <h2>Create a New Set</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Set Name:
          <input type='text' value={setName} onChange={(e) => setSetName(e.target.value)} />
        </label>

        <div className='deptContainer'>
          {departments.map((dept, deptIndex) => (
            <div key={dept.id} style={{ marginLeft: `${10}px` }}>
              <div style={{ display: 'flex', alignItems: 'center'}}>
               <button style={{ fontSize: '12px', padding: '2px 4px' }} type='button' onClick={handleAddDepartment}>
                    +
                </button>
              <label>
                Department:
                {loadingData ? (
                  <p>Loading departments...</p>
                ) : (
                  <Select
                    value={dept.deptSelect}
                    onChange={(value) => handleDeptChange(value, deptIndex)}
                    options={deptOptions}
                  />
                )}
              </label>
              </div>

              {dept.deptSelect &&
                dept.categories.map((category, categoryIndex) => (
                  <div key={category.id} style={{ marginLeft: `${20}px` }}>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                    <button style={{ fontSize: '12px', padding: '2px 4px' }} type='button' onClick={() => handleAddCategory(deptIndex)}>
                        +
                    </button>
                    <label>
                      Category:
                      {loadingData ? (
                        <p>Loading categories...</p>
                      ) : (
                        <Select
                          value={category.categorySelect}
                          onChange={(value) => handleCategoryChange(value, deptIndex, categoryIndex)}
                          options={categoryOptions}
                        />
                      )}
                    </label>
                    </div>

                    {category.categorySelect &&
                      category.manufacturers.map((manufacturer, manufacturerIndex) => (
                        <div key={manufacturer.id} style={{ marginLeft: '30px' }}>
                          <div style={{ display: 'flex', alignItems: 'center'}}>
                          <button style={{ fontSize: '12px', padding: '2px 4px' }} type='button' onClick={() => handleAddManufacturer(deptIndex, categoryIndex)}>
                              +
                          </button>
                          <label>
                            Manufacturer:
                            {loadingData ? (
                              <p>Loading manufacturers...</p>
                            ) : (
                              <Select
                                value={manufacturer.manufacturerSelect}
                                onChange={(value) => handleManufacturerChange(value, deptIndex, categoryIndex, manufacturerIndex)}
                                options={manufacturerOptions}
                              />
                            )}
                          </label>
                          </div>

                          {manufacturer.manufacturerSelect &&
                            manufacturer.calibers.map((caliber, caliberIndex) => (
                              <div key={caliber.id} style={{ marginLeft: '40px' }}>
                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                <button style={{ fontSize: '12px', padding: '2px 4px' }} type='button' onClick={() => handleAddCaliber(deptIndex, categoryIndex, manufacturerIndex)}>
                                    +
                                </button>
                                <label>
                                  Caliber:
                                  {loadingData ? (
                                    <p>Loading calibers...</p>
                                  ) : (
                                    <Select
                                      value={caliber.caliberSelect}
                                      onChange={(value) => handleCaliberChange(value, deptIndex, categoryIndex, manufacturerIndex, caliberIndex)}
                                      options={caliberOptions}
                                    />
                                  )}
                                </label>
                                </div>

                                {caliber.caliberSelect &&
                                  caliber.upcs.map((upc, upcIndex) => (
                                    <div key={upcIndex} style={{ marginLeft: '50px' }}>
                                      <div style={{ display: 'flex', alignItems: 'center'}}>
                                      <button style={{ fontSize: '12px', padding: '2px 4px' }} type='button' onClick={() => handleAddUPC(deptIndex, categoryIndex, manufacturerIndex, caliberIndex)}>
                                          +
                                      </button>
                                      <label>
                                        UPC:
                                        <input
                                          type='text'
                                          value={upc.upc}
                                          onChange={(e) => handleUPCChange(e, deptIndex, categoryIndex, manufacturerIndex, caliberIndex, upcIndex)}
                                        />
                                      </label>
                                      </div>
                                       <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px'}}>
                                      <label>
                                        Product Description:
                                        <input
                                          type='text'
                                          value={upc.productDescription}
                                          onChange={(e) => handleProductDescriptionChange(e, deptIndex, categoryIndex, manufacturerIndex, caliberIndex, upcIndex)}
                                        />
                                      </label>
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ))}
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          ))}
        </div>
        <button type='button' onClick={() => { handlePreview(); }}>
          Preview
        </button>
       {/* <button style={{ fontSize: '12px' }} type='submit'>Create Set</button> */}
      </form>
    </div>
    <div className='previewContainer'>
      {previewData ? (
        <div>
          <h3>Preview Data:</h3>
          <table>
            <thead>
              <tr>
                <th colSpan="7">Set Name: {previewData.setName}</th>
              </tr>
              <tr>
                <th>Department</th>
                <th>Category</th>
                <th>Manufacturer</th>
                <th>Caliber</th>
                <th>UPC</th>
                <th>Product Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {previewData.hierarchy.map((item, index) => (
               <tr key={index}>
                  <td>{item.department}</td>
                  <td>{item.category}</td>
                  <td>{item.manufacturer}</td>
                  <td>{item.caliber}</td>
                  <td>{item.upc}</td>
                  <td>{item.productDescription}</td>
                  <td><Tooltip title="Push all UPCs"><SendIcon fontSize="small" onClick={() => handleUpcFilter(item.department, item.category, item.manufacturer, item.caliber)}/></Tooltip></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type='button' style={{ fontSize: '12px'}} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : (
        <>
          <h3>Preview Set</h3>
          <p>Click preview to view</p>
        </>
      )}
    </div>
    <div className='upcContainer'>
      <h3>Selected UPCs</h3>
      {selectedUPCs.length > 0 ? (
        <ul>
          {selectedUPCs.map((upc, index) => (
            <li key={index}>{upc}</li>
          ))}
        </ul>
      ) : (
        <p>Click preview to view</p>
      )}
    </div>

  </div>
  );
};

export default Set;
