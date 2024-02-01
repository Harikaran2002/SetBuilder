import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import axios from 'axios';

export default function FileSystemNavigator() {
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7144/api/Matrix/DistinctDepartments');
        const departments = response.data;

        const tree = await Promise.all(
          departments.map(async (department) => {
            const categoriesResponse = await axios.get(`https://localhost:7144/api/Matrix/SelectedCategory?department=${department}`);
            const categories = categoriesResponse.data;

            const categoryNodes = await Promise.all(
              categories.map(async (category) => {
                const manufacturersResponse = await axios.get(`https://localhost:7144/api/Matrix/SelectedManufacturer?department=${department}&category=${category}`);
                const manufacturers = manufacturersResponse.data;

                const manufacturerNodes = await Promise.all(
                  manufacturers.map(async (manufacturer) => {
                    const calibersResponse = await axios.get(`https://localhost:7144/api/Matrix/SelectedCaliber?department=${department}&category=${category}&manufacturer=${manufacturer}`);
                    const calibers = calibersResponse.data;

                    const caliberNodes = await Promise.all(
                      calibers.map(async (caliber) => {
                        const upcsResponse = await axios.get(`https://localhost:7144/api/Matrix/SelectedUpc?department=${department}&category=${category}&manufacturer=${manufacturer}&caliber=${caliber}`);
                        const upcs = upcsResponse.data;

                        return {
                          label: caliber,
                          nodes: upcs.map(upc => ({ label: upc })),
                        };
                      })
                    );

                    return {
                      label: manufacturer,
                      nodes: caliberNodes,
                    };
                  })
                );

                return {
                  label: category,
                  nodes: manufacturerNodes,
                };
              })
            );

            return {
              label: department,
              nodes: categoryNodes,
            };
          })
        );

        setTreeData(tree);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {treeData.map((departmentNode, departmentIndex) => (
          <TreeItem
            key={departmentIndex}
            nodeId={departmentNode.label}
            label={departmentNode.label}
          >
            {departmentNode.nodes.map((categoryNode, categoryIndex) => (
              <TreeItem
                key={categoryIndex}
                nodeId={categoryNode.label}
                label={categoryNode.label}
              >
                {categoryNode.nodes.map((manufacturerNode, manufacturerIndex) => (
                  <TreeItem
                    key={manufacturerIndex}
                    nodeId={manufacturerNode.label}
                    label={manufacturerNode.label}
                  >
                    {manufacturerNode.nodes.map((caliberNode, caliberIndex) => (
                      <TreeItem
                        key={caliberIndex}
                        nodeId={caliberNode.label}
                        label={caliberNode.label}
                      >
                        {caliberNode.nodes.map((upcNode, upcIndex) => (
                          <TreeItem
                            key={upcIndex}
                            nodeId={upcNode.label}
                            label={upcNode.label}
                          />
                        ))}
                      </TreeItem>
                    ))}
                  </TreeItem>
                ))}
              </TreeItem>
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </Box>
  );
}
