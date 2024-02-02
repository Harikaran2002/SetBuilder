import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Button, List, ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import axios from "axios";
import LoaderComponent from "./LoadedComponent";
import "./RightMenu.css";

const RightMenu = () => {
  let UPCs = ["akash", "hari", "sanosh", "ashwath"];
  const [treeData, setTreeData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [RightTableData, setRightTableData] = useState();

  const [checked, setChecked] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const DraggableTreeItem = ({ id, label, index, moveItem, onClick }) => {
    const [, ref] = useDrag({
      type: "TREE_ITEM",
      item: { id, index },
    });

    const [, drop] = useDrop({
      accept: "TREE_ITEM",
      hover: (draggedItem) => {
        if (draggedItem.index !== index) {
          moveItem(draggedItem.index, index);
          draggedItem.index = index;
        }
      },
    });

    return (
      <div ref={(node) => ref(drop(node))} onClick={onClick}>
        {label}
      </div>
    );
  };

  const handleCheckboxChange = (value, nodes) => {
    const nodeIndex = checkedItems.indexOf(value);

    if (nodeIndex !== -1) {
      setCheckedItems(checkedItems.filter((item) => !nodes.includes(item)));
    } else {
      setCheckedItems([...checkedItems, ...nodes]);
    }
    console.log(checkedItems);
  };

  const RenderRightTable = () => (
    <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {RightTableData.map((set, setIndex) => (
          <TreeItem key={setIndex} nodeId={set.setName} label={set.setName}>
            {set.class.map((classname, classindex) => (
              <TreeItem
                key={classindex}
                nodeId={classname.className}
                label={classname.className}
              >
                {classname.productGroup.map(
                  (productGroup, productGroupIndex) => (
                    <TreeItem
                      key={productGroupIndex}
                      nodeId={productGroup.productGroupName}
                      label={productGroup.productGroupName}
                      onClick={() => {
                        handleSelectedGroup(
                          set.setName,
                          classname.className,
                          productGroup.productGroupName
                        );
                      }}
                    >
                      {productGroup.sku.map((upc, upcIndex) => (
                        <TreeItem
                          key={upcIndex}
                          nodeId={upc}
                          label={upc}
                        ></TreeItem>
                      ))}
                    </TreeItem>
                  )
                )}
              </TreeItem>
            ))}
          </TreeItem>
        ))}
      </TreeView>
    </Box>
  );

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.label}
      nodeId={nodes.label}
      label={
        <div>
          <Checkbox
            checked={checkedItems.includes(nodes.label)}
            onChange={() =>
              handleCheckboxChange(nodes.label, getAllNodeValues(nodes))
            }
            style={{ width: 0.5, marginRight: 2 }}
          />
          {nodes.label}
        </div>
      }
    >
      {Array.isArray(nodes.nodes)
        ? nodes.nodes.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  const getAllNodeValues = (node) => {
    let values = [node.label];

    if (Array.isArray(node.nodes)) {
      node.nodes.forEach((childNode) => {
        values = [...values, ...getAllNodeValues(childNode)];
      });
    }

    return values;
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const hanldeMoveData = () => {
    const filteredNumbers = checkedItems.filter((item) => !isNaN(item));
    console.log(filteredNumbers);
    console.log(RightTableData);

    const selectedSet = RightTableData.find(
      (set) => set.setName === selectedUPC.set
    );

    if (selectedSet) {
      const selectedClass = selectedSet.class.find(
        (_class) => _class.className === selectedUPC.classname
      );

      if (selectedClass) {
        const isDuplicateInAnyProductGroup = selectedClass.productGroup.some(
          (productGroup) => {
            return filteredNumbers.some((item) =>
              productGroup.sku.includes(item)
            );
          }
        );

        if (!isDuplicateInAnyProductGroup) {
          const productGroup = selectedClass.productGroup.find(
            (productGroup) =>
              productGroup.productGroupName === selectedUPC.productGroup
          );
          productGroup.sku.push(...filteredNumbers);
        } else {
          console.log(
            "Duplicates found in any product group, not allowed to push."
          );
        }
      }
    }

    setRefresh(!refresh);

    console.log(RightTableData);
  };

  const [selectedUPC, setSelectedUPC] = useState({});

  const handleSelectedGroup = (
    selectedset,
    selectedclassname,
    selectedproductGroup
  ) => {
    console.log("hi");
    setSelectedUPC({
      set: selectedset,
      classname: selectedclassname,
      productGroup: selectedproductGroup,
    });
  };

  useEffect(() => {
    console.log("refreshing");
  }, [refresh]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const RightTableResponse = await axios.get(
          "https://localhost:7119/api/Set"
        );
        console.log(RightTableResponse);
          
        setRightTableData((prevData) =>
        RightTableResponse.data
          .filter((set) => set.setName !== 'MatchedExclusionsSET')
          .map((set) =>
            set.setName === 'OrderReportSET'
              ? {
                  ...set,
                  class: set.class.map((classname) => ({
                    ...classname,
                    productGroup: classname.productGroup.filter(
                      (productGroup) =>
                        productGroup.productGroupName !== 'Shotgun' &&
                        productGroup.productGroupName !== 'Lever Action'
                    ),
                  })).filter((classname) => classname.productGroup.length > 0), // Remove classes with empty product groups
                }
              : set
          )
      );
      
      
        const response = await axios.get(
          "https://localhost:7119/api/Matrix/DistinctDepartments"
        );
        const departments = response.data;

        const tree = await Promise.all(
          departments.map(async (department) => {
            const categoriesResponse = await axios.get(
              `https://localhost:7119/api/Matrix/SelectedCategory?department=${department}`
            );
            const categories = categoriesResponse.data;

            const categoryNodes = await Promise.all(
              categories.map(async (category) => {
                const manufacturersResponse = await axios.get(
                  `https://localhost:7119/api/Matrix/SelectedManufacturer?department=${department}&category=${category}`
                );
                const manufacturers = manufacturersResponse.data;

                const manufacturerNodes = await Promise.all(
                  manufacturers.map(async (manufacturer) => {
                    const calibersResponse = await axios.get(
                      `https://localhost:7119/api/Matrix/SelectedCaliber?department=${department}&category=${category}&manufacturer=${manufacturer}`
                    );
                    const calibers = calibersResponse.data;

                    const caliberNodes = await Promise.all(
                      calibers.map(async (caliber) => {
                        const upcsResponse = await axios.get(
                          `https://localhost:7119/api/Matrix/SelectedUpc?department=${department}&category=${category}&manufacturer=${manufacturer}&caliber=${caliber}`
                        );
                        const upcs = upcsResponse.data;

                        return {
                          label: caliber,
                          nodes: upcs.map((upc) => ({ label: upc })),
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
        setDataLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="FullContainer">
      {dataLoaded ? (
        <>
          <div className="LeftHalf">
            <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300, overflowY : 'scroll' }}>
              <TreeView
                aria-label="file system navigator"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              >
                {treeData.map((departmentNode, departmentIndex) =>
                  renderTree(departmentNode)
                )}
              </TreeView>
            </Box>
            <Button
              variant="contained"
              color="success"
              onClick={() => hanldeMoveData()}
            >
              Go
            </Button>
            {RenderRightTable()}
          </div>
          <div className="RightHalf">
            <p> rightside table</p>
          </div>
        </>
      ) : (
        <LoaderComponent data="Loading Data" />
      )}
    </div>
  );
};

export default RightMenu;

// import React, { useEffect, useState } from "react";
// import Box from "@mui/material/Box";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { TreeView } from "@mui/x-tree-view/TreeView";
// import { TreeItem } from "@mui/x-tree-view/TreeItem";
// import { Button, List, ListItem } from "@mui/material";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Checkbox from "@mui/material/Checkbox";
// import { useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { DndProvider } from "react-dnd";

// const DraggableTreeItem = ({ id, label, index, moveItem, onClick }) => {
//   const [, drop] = useDrop({
//     accept: "TREE_ITEM",
//     hover: (item) => {
//       if (item.id !== id) {
//         moveItem(item.id, id, item.index, index);
//         item.index = index;
//         item.id = id;
//       }
//     },
//   });

//   return (
//     <div
//       ref={drop}
//       style={{
//         padding: '8px',
//         border: '1px solid #ccc',
//         marginBottom: '4px',
//         backgroundColor: 'white',
//         cursor: 'pointer',
//       }}
//       onClick={onClick}
//     >
//       {label}
//     </div>
//   );
// };

// const RightMenu = () => {
//   let UPCs = ["akash", "hari", "sanosh", "ashwath"];
//   const [checked, setChecked] = useState([]);
//   const [refresh, setRefresh] = useState(false);

//   const [RightTableData, setRightTableData] = useState([
//     {
//       setName: "DummySet",
//       class: [
//         {
//           className: "TotalPolymer",
//           classSort: 1,
//           productGroup: [
//             {
//               productGroupName: "M&P",
//               productGroupSort: 1,
//               sku: ["sfse", "gea", "oijjie"],
//             },
//             {
//               productGroupName: "M&P 5.7",
//               productGroupSort: 2,
//               sku: ["afksefesf", "coiasjesafe", "oiwjeroij2"],
//             },
//             {
//               productGroupName: "M&P 22WMR",
//               productGroupSort: 3,
//               sku: ["23kjlkj", "smnejes", "msnf323"],
//             },
//           ],
//         },
//         {
//           className: "Total Metal",
//           classSort: 2,
//           productGroup: [
//             {
//               productGroupName: "Shield Plus",
//               productGroupSort: 1,
//               sku: ["nmfwjlenf", "oiweurajm", "mlesknf"],
//             },
//           ],
//         },
//         {
//           className: "Total Revolvers",
//           classSort: 3,
//           productGroup: [
//             {
//               productGroupName: "Shield Minus",
//               productGroupSort: 1,
//               sku: ["l2kj3n4l", "13mnln23n4", "mseknrower"],
//             },
//             {
//               productGroupName: "Shield Bottle",
//               productGroupSort: 2,
//               sku: ["lskefjnasf", "lmwkeasdoif", "poquweroism"],
//             },
//             {
//               productGroupName: "Health Potion",
//               productGroupSort: 3,
//               sku: ["mslkenflnaf", "lksdjfsenlfn", "iopuasiduyfs"],
//             },
//           ],
//         },
//       ],
//     },
//   ]);

//   const handleToggle = (value) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(value);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }
//     setChecked(newChecked);
//   };

//   const handleMoveItem = (sourceId, targetId, sourceIndex, targetIndex) => {
//     const updatedSets = [...RightTableData];
//     const sourceSetIndex = updatedSets.findIndex(set => set.setName === sourceId);
//     const targetSetIndex = updatedSets.findIndex(set => set.setName === targetId);

//     if (sourceSetIndex !== -1 && targetSetIndex !== -1) {
//       const [movedItem] = updatedSets[sourceSetIndex].class.splice(sourceIndex, 1);
//       updatedSets[targetSetIndex].class.splice(targetIndex, 0, movedItem);
//       setRightTableData(updatedSets);
//     }
//   };

//   const hanldeMoveData = () => {
//     console.log(RightTableData);

//     const selectedSet = RightTableData.find(
//       (set) => set.setName === selectedUPC.set
//     );

//     if (selectedSet) {
//       const selectedClass = selectedSet.class.find(
//         (_class) => _class.className === selectedUPC.classname
//       );

//       if (selectedClass) {
//         const isDuplicateInAnyProductGroup = selectedClass.productGroup.some(
//           (productGroup) => {
//             return checked.some((item) => productGroup.sku.includes(item));
//           }
//         );

//         if (!isDuplicateInAnyProductGroup) {
//           const productGroup = selectedClass.productGroup.find(
//             (productGroup) =>
//               productGroup.productGroupName === selectedUPC.productGroup
//           );
//           productGroup.sku.push(...checked);
//         } else {
//           console.log(
//             "Duplicates found in any product group, not allowed to push."
//           );
//         }
//       }
//     }

//     setRefresh(!refresh);

//     console.log(RightTableData);
//   };

//   const [selectedUPC, setSelectedUPC] = useState({});

//   const handleSelectedGroup = (
//     selectedset,
//     selectedclassname,
//     selectedproductGroup
//   ) => {
//     console.log("hi");
//     setSelectedUPC({
//       set: selectedset,
//       classname: selectedclassname,
//       productGroup: selectedproductGroup,
//     });
//   };

//   useEffect(() => {
//     console.log("refreshing");
//   }, [refresh]);

//   return (
//     <div>
//       <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
//         {UPCs.map((value) => {
//           const labelId = `checkbox-list-label-${value}`;

//           return (
//             <ListItem key={value} disablePadding>
//               <ListItemButton
//                 role={undefined}
//                 onClick={handleToggle(value)}
//                 dense
//               >
//                 <ListItemIcon>
//                   <Checkbox
//                     edge="start"
//                     checked={checked.indexOf(value) !== -1}
//                     tabIndex={-1}
//                     disableRipple
//                     inputProps={{ "aria-labelledby": labelId }}
//                   />
//                 </ListItemIcon>
//                 <ListItemText id={labelId} primary={`${value}`} />
//               </ListItemButton>
//             </ListItem>
//           );
//         })}
//       </List>
//       <Button
//         variant="contained"
//         color="success"
//         onClick={() => hanldeMoveData()}
//       >
//         Go
//       </Button>
//       <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
//       <DndProvider backend={HTML5Backend}>
//         <TreeView
//           aria-label="file system navigator"
//           defaultCollapseIcon={<ExpandMoreIcon />}
//           defaultExpandIcon={<ChevronRightIcon />}
//         >
//           {RightTableData.map((set, setIndex) => (
//             <TreeItem key={setIndex} nodeId={set.setName} label={set.setName}>
//               {set.class.map((classname, classindex) => (
//                 <DraggableTreeItem
//                   key={classindex}
//                   id={classname.className}
//                   label={classname.className}
//                   index={classindex}
//                   moveItem={handleMoveItem}
//                 >
//                   {classname.productGroup.map((productGroup, productGroupIndex) => (
//                     <DraggableTreeItem
//                       key={productGroupIndex}
//                       id={productGroup.productGroupName}
//                       label={productGroup.productGroupName}
//                       index={productGroupIndex}
//                       onClick={() => {
//                         handleSelectedGroup(
//                           set.setName,
//                           classname.className,
//                           productGroup.productGroupName
//                         );
//                       }}
//                     />
//                   ))}
//                 </DraggableTreeItem>
//               ))}
//             </TreeItem>
//           ))}
//         </TreeView>
//       </DndProvider>
//       </Box>
//     </div>
//   );
// };

// export default RightMenu;
