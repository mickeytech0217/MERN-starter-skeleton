import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FuseDialog from "@fuse/core/FuseDialog";
import {
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import {
  openDialog,
  closeDialog,
  selectFuseDialogState,
} from "app/store/fuse/dialogSlice";
import Search from "@fuse/core/Svg/Search.svg";
import Edit from "../Svg/Edit.svg";
import Delete from "../Svg/Delete.svg";
import FusePagination from "../FusePagination/Pagination";

const ROWS_PER_PAGE = 5; // Number of rows per page

const MyTable = ({ newRow, newCol, Key }) => {
  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const changeTable = useSelector(selectFuseDialogState);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageData = Object.entries(localStorage).filter(([key]) =>
      key.startsWith(Key)
    );

    const parsedRows = localStorageData.map(([key, value]) => {
      const data = JSON.parse(value);
      return {
        id: key, // Use the key as the id
        ...data, // Spread the parsed data
      };
    });

    setRows(parsedRows);
  }, [newRow, changeTable, Key, newCol]);

  const handleDelete = (id) => {
    setSelectedItemId(id);
    dispatch(openDialog());
  };

  const handleDeleteItem = (id) => {
    localStorage.removeItem(id);
    dispatch(closeDialog());
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageCount = Math.ceil(rows.length / ROWS_PER_PAGE);
  const displayedRows = rows.slice(
    currentPage * ROWS_PER_PAGE,
    (currentPage + 1) * ROWS_PER_PAGE
  );

  return (
    <div className="max-w-7xl bg-white shadow-4 h-auto mx-8 my-10 rounded-xl p-10">
      <FuseDialog >
        <div className="px-8 py-9">
          <div>آیا از حذف این آیتم مطمعن هستید؟</div>
          <DialogActions className="flex flex-row items-center justify-start">
            <button onClick={() => dispatch(closeDialog())}>لغو</button>
            <button
              onClick={() => handleDeleteItem(selectedItemId)}
              className="bg-red-500 text-white px-14 py-4 rounded-xl"
            >
              حذف
            </button>
          </DialogActions>
        </div>
      </FuseDialog>
      <TableContainer>
        <Table>
          {/* Table header */}
          <TableHead>
            <TableRow sx={{ borderBottom: '2px solid #ccc' }}>
              {newCol.map((item, index) => (
                <TableCell key={index}>
                  <div className="flex flex-col justify-center items-center">
                    <Typography variant="h6"  sx={{ textAlign: "center" }}>
                      {item.title}
                    </Typography>
                    <label className="border-2 flex flex-row-reverse rounded-xl py-8 justify-start">
                      <input
                        type="text"
                        className="w-3/4 border-none mx-8 text-lg"
                        placeholder="جستجو"
                      />
                      <img src={Search} alt="search" />
                    </label>
                  </div>
                </TableCell>
              ))}
              <TableCell>
                <Typography  sx={{ textAlign: "center" }}>
                  ویرایش/حذف
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {/* Table body */}
          <TableBody>
            {displayedRows.length >= 1 ? (
              displayedRows.map((row, rowIndex) => (
                <TableRow key={row.id} sx={{ borderBottom: '2px solid #ccc' }}>
                  {/* Render table cells */}
                  {Object.entries(row).map(
                    ([key, value], cellIndex) =>
                      // Skip displaying id column
                      key !== "id" && (
                        <TableCell key={cellIndex}>
                          <Typography sx={{ textAlign: "center" }}>
                            {value}
                          </Typography>
                        </TableCell>
                      )
                  )}
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <button className="ml-6">
                        <img src={Edit} alt="Edit" />
                      </button>
                      <button onClick={() => handleDelete(row.id)}>
                        <img src={Delete} alt="Delete" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow sx={{ borderBottom: '1px solid #ccc' }}>
                <TableCell colSpan={newCol.length + 1}>جدول خالی است</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */} 
      {/* در شرایطی که فقط یک صفحه داریم نخواهیم پگینیشن نمایش داده شود این قسمت را از کامن در بیاورید */}
      {/* {pageCount > 1 && ( */}
       {displayedRows.length >= 1 && <FusePagination
          pageCount={pageCount}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />}
      {/* )} */}
    </div>
  );
};

export default MyTable;
